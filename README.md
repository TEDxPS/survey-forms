# SurveyJS + Next.js Quickstart Template 

SurveyJS is a set of JavaScript components that allow you and your users to build surveys / forms, store them in your database, and visualize survey results for data analysis. This quick start template uses [Next.js](https://nextjs.org/) and the following SurveyJS components:

- [SurveyJS Form Library](https://surveyjs.io/form-library/documentation/overview)
- [Survey Creator / Form Builder](https://surveyjs.io/survey-creator/documentation/overview)
- [SurveyJS PDF Generator](https://surveyjs.io/pdf-generator/documentation/overview)
- [SurveyJS Dashboard](https://surveyjs.io/dashboard/documentation/overview)

## Run the application

```bash
git clone https://github.com/surveyjs/surveyjs-nextjs.git
cd surveyjs-nextjs
npm i
npm run dev
```

Open http://localhost:3000/ in your web browser.

## Template structure

This template covers most basic use cases. You can find code examples for them in the following files:

- Create a standalone survey
  - [data/survey_json.js](data/survey_json.js)
  - [src/components/Survey.tsx](src/components/Survey.tsx)
- Add Survey Creator to a page
  - [src/components/SurveyCreator.tsx](src/components/SurveyCreator.tsx)
- Export a survey to a PDF document
  - [src/app/pdf-export/page.tsx](src/app/pdf-export/page.tsx)
- Visualize survey results
  - As charts
    - [data/dashboard_data.js](data/dashboard_data.js)
    - [src/components/Dashboard.tsx](src/components/Dashboard.tsx)
  - As a table
    - [data/dashboard_data.js](data/dashboard_data.js)
    - [src/components/DashboardTabulator.tsx](src/components/DashboardTabulator.tsx)

# Building Docker image
Next.js naturally handles environment variables during runtime so you only need to run the foundational build natively:

```bash
docker build --platform linux/amd64 -t recruitment-form:latest .
```

To natively instantiate the container while securely bootstrapping all configurations globally:
```bash
docker run -p 3000:3000 \
  -e MONGO_URI="mongodb://your-mongo-uri" \
  recruitment-form:latest
```

# Save Docker image
Save the image
```bash
docker save recruitment-form:latest -o recruitment-form.tar
```
Or save with compression
```bash
docker save recruitment-form:latest | gzip > recruitment-form.tar.gz
```

---

# Dynamic Form Loading & Google Cloud Configuration

This application supports dynamically fetching form definitions and Google Cloud configurations from a MongoDB database, allowing multiple different surveys with different destination sheets and storage buckets to run concurrently on the same codebase.

## 1. Loading Forms via URL Slug
When a user visits a sub-path URL (e.g., `https://domain.com/survey-name`), the frontend sends a request to `/api/load?slug=survey-name`.
The backend matches the `slug` against the `Form` collection in MongoDB. The JSON structure returned builds the Survey UI dynamically on the frontend. Safety is a priority: the `google` sensitive backend configuration is stripped out on the backend and is never exposed to the client.

## 2. MongoDB Document Format
The MongoDB document structure is **exactly identical to a standard SurveyJS JSON configuration**, with the addition of custom root properties (`slug`, `expiry`, and `google`) that orchestrate our backend connectivity:

```json
{
  "slug": "survey-name",
  "title": "Recruitment Form 2026",
  "pages": [
    {
      "name": "introduction",
      "elements": [ ... ],
      "readTimeEnforcement": 15 // Optional: Number of seconds to force users to read this specific page before 'Next' is enabled.
    },
    {
      "name": "editorial_questions",
      "elements": [ ... ],
      "customData": {
        "sheetName": "Editorial" // Optional: Routes questions on this page to an isolated "Editorial" worksheet tab
      }
    }
  ],
  "expiry": {
    "date": "2026-12-31T23:59:59Z", // Optional: ISO expiration date
    "message": "<p>Registration is closed!</p>" // Optional: HTML message shown upon expiry
  },
  "allowDuplicateEmails": false, // Optional: Strict validation checking `/api/validate` (defaults to true if omitted)
  "google": {
    "sheetId": "1aBcDeFgHiJkLmNoPqRsTuVwXyZ...", // Optional: Target Google Sheet ID
    "bucketId": "your-gcs-bucket-name", // Optional: Target Google Cloud Storage Bucket Name
    
    // Paste the exact properties from your GCP `google-services.json` file below:
    "type": "service_account",
    "project_id": "your-project...",
    "private_key_id": "...",
    "private_key": "-----BEGIN PRIVATE KEY-----\\n...", 
    "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
    "client_id": "...",
    "auth_uri": "...",
    "token_uri": "...",
    "auth_provider_x509_cert_url": "...",
    "client_x509_cert_url": "...",
    "universe_domain": "googleapis.com"
  }
}
```

## 3. Setting Up Google Sheet Submissions & Bucket Uploads
Instead of passing sensitive keys from the backend to the frontend, the data ingestion mechanism works securely:
1. **Frontend Submission**: The frontend submits the user's survey data or uploaded files alongside the `slug`.
2. **Backend Interception**: The backend `POST` routes (`/api/submit`, `/api/upload`) extract the `slug` and securely query MongoDB to fetch the credentials mapping associated with that specific form.
3. **Dynamic Credentials**: 
   - If `google.private_key` and `google.client_email` exist (by directly pasting the `google-services.json` properties), the backend uses them and instantiates a customized network connection context for that specific submission or upload instance. 
   - If `google.sheetId` or `google.bucketId` exist, data is routed specifically to those endpoints.
4. **Multi-Tenant MongoDB Storage**: Before submission to Google Sheets, the backend natively routes the user's payload into a dynamically generated **MongoDB Database named identically to the form's `slug`**. The raw form metrics are strictly isolated within a `formsubmissions` collection specific to that database, ensuring perfectly siloed validations (e.g. duplicate email checking) and unpolluted data pipelines.

This structure permits every individual survey to securely leverage isolated Google Projects or Sheets without necessitating code alterations or app redeployment!

### Important: Initializing Google Sheet Headers
Before your Google Sheet can correctly receive data, it **must be initialized with the appropriate column headers** (matching your survey's question IDs and titles). You can automate this configuration using the provided initialization script.

**During Local Development:**
```bash
npx ts-node scripts/populateGoogleSheet.ts <your-form-slug>
```

**In Production (Docker Container):**
```bash
docker exec -it <your-container-name> node scripts/populateGoogleSheet/index.js <your-form-slug>
```

The script will authenticate using the credentials stored in MongoDB for that `slug`, and dynamically generate the worksheets for you:
1. **Master Sheet**: The very first worksheet will be formatted to include all questions globally from your survey.
2. **Dynamic Team Worksheets**: If any `pages` within your MongoDB JSON define a `customData.sheetName` property (as seen in the JSON example above), the script will automatically instantiate separate tabs named identically to those sheet names. It will then precisely combine your survey's general questions alongside that specific page's questions to create perfectly isolated tabs (e.g., for routing specific 'Teams').

## 5. Adding Clickable Links (Markdown & HTML)
The built-in Survey component is configured with a global text interceptor (`onTextMarkdown`). This means you do not need to manually configure DOM elements to display beautiful, natively branded links. You can safely place standard Markdown links or standard HTML `<a>` tags inside any text property (such as `title` or `description`) in your MongoDB form JSON.

The system will automatically intercept these on render and inject the project's Tailwind utility classes (e.g., `text-[#eb0028] underline...`) and safety attributes (`target="_blank" rel="noopener noreferrer"`).

**Example using Markdown:**
```json
{
  "type": "file",
  "name": "dope_test",
  "title": "Please upload your DOPE test results",
  "description": "Please take the test before uploading. [Click here to take the DOPE Personality Test](https://example.com/file)"
}
```

**Example using direct HTML:**
```json
{
  "type": "radiogroup",
  "name": "first_choice",
  "title": "What is your first choice?",
  "description": "<a href='https://example.com/job-scope'>Click here to read the job scope of all teams</a>"
}
```

Both approaches will render identically out of the box with the correct project styling applied globally inside the survey!