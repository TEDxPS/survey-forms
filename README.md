# TEDx Survey Forms

A dynamic, Next.js-based survey and recruitment form application for TEDx chapters. This project allows you to serve multiple different forms from a single codebase, entirely driven by configuration data stored in MongoDB.

The forms are rendered using the [SurveyJS Form Library](https://surveyjs.io/form-library/documentation/overview), integrated with a custom backend that handles validations, submissions, file uploads, and routing data securely to dedicated Google Sheets and Google Cloud Storage buckets.

---

## 🚀 Getting Started

### Local Development

To run the application locally:

```bash
npm install
npm run dev
```

Open http://localhost:3000/ in your web browser.

### Running via Docker (Recommended)

This project automatically builds and publishes a Docker image to GitHub Container Registry (GHCR). Next.js naturally handles environment variables during runtime so you only need to pull the image and inject the variables:

```bash
docker pull ghcr.io/tedxps/survey-forms:latest
```

To natively instantiate the container while securely bootstrapping all configurations globally:

```bash
docker run -p 3000:3000 \
  -e MONGO_URI="mongodb://your-mongo-uri" \
  -e GOOGLE_PROJECT_ID="your-gcp-project-id" \
  -e GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account-email" \
  -e GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..." \
  -e GOOGLE_SHEET_ID="your-global-sheet-fallback" \
  -e GOOGLE_BUCKET_NAME="your-global-bucket-fallback" \
  ghcr.io/tedxps/survey-forms:latest
```

**Building Manually**
If you need to build the image manually from source:
```bash
docker build --platform linux/amd64 -t survey-forms:latest .
```

---

## ⚙️ Dynamic Form Configuration (MongoDB)

This application supports dynamically fetching form definitions and Google Cloud configurations from a MongoDB database. This architecture allows multiple different surveys—each with distinct destination sheets and storage buckets—to run concurrently on the exact same codebase.

### 1. Loading Forms via URL Slug

When a user visits a sub-path URL (e.g., `https://domain.com/survey-name`), the frontend sends a request to `/api/load?slug=survey-name`.

The backend matches the `slug` against the `Form` collection in MongoDB. The JSON structure returned dynamically builds the Survey UI on the frontend. **Safety is a priority:** the sensitive `google` backend configuration object is stripped out on the server and is never exposed to the client.

### 2. MongoDB Document Format

The MongoDB document structure is exactly identical to a standard SurveyJS JSON configuration, but introduces custom root properties (`slug`, `heroImage`, `expiry`, and `google`) that orchestrate backend connectivity:

```json
{
  "slug": "survey-name",
  "title": "Recruitment Form 2026",
  "heroImage": "https://example.com/cover.jpg", // Optional: Sets the page's top responsive image and social media preview thumbnail
  "pages": [
    {
      "name": "introduction",
      "elements": [ ... ],
      "readTimeEnforcement": 15 // Optional: Number of seconds to force users to read this specific page before 'Next' is enabled
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

---

## 📊 Integrations & Data Routing

### Google Sheets Submissions & Cloud Storage Uploads

Instead of passing sensitive keys from the backend to the frontend, the data ingestion mechanism works natively and securely:

1. **Frontend Submission:** The frontend submits the user's survey data or uploaded files alongside the `slug`.
2. **Backend Interception:** The backend `POST` routes (`/api/submit`, `/api/upload`) extract the slug and query MongoDB to fetch the credentials mapping associated with that specific form.
3. **Dynamic Credentials:**
   - If `google.private_key` and `google.client_email` exist, the backend instantiates a customized network connection context for that specific submission/upload.
   - If `google.sheetId` or `google.bucketId` exist, data is explicitly routed to those endpoints.
4. **Multi-Tenant MongoDB Storage:** Before submission to Google Sheets, the backend routes the user's payload into a dynamically generated **MongoDB Database named identically to the form's `slug`**. The raw form metrics are strictly isolated within a `formsubmissions` collection specific to that database, ensuring perfectly siloed validations (e.g., duplicate email checking) and unpolluted data pipelines.

This structure permits every survey to leverage isolated Google Projects or Sheets without necessitating code alterations or app redeployment!

### Intelligent Sheet Routing (Master Insert + Carbon Copies)

The `/api/submit` endpoint intelligently maps and routes data dynamically based on the explicit configuration inside the database:

1. **Master Insert**: The absolutely first worksheet tab always serves as your master data log. It automatically ingests all answers from the entire form.
2. **Dynamic Carbon Copies**: The script cross-references the user's generated answers during processing. When it validates against `pages` that contain a `customData.sheetName` declaration, it checks if the user interacted with any explicit questions on that "team page". If confirmed, it identically mirrors the entire submission row into that specific `customData.sheetName` Google Sheet tab without disruption! 

*This inherent flexibility means adding an entirely new team department to your backend explicitly never requires backend system modification!*

---

## 🛠️ Utilities & Customization

### Initializing Google Sheet Headers

Before your Google Sheet can correctly receive data, it **must be initialized with the appropriate column headers** (matching your survey's question IDs and titles). You can automate this configuration using the provided initialization script.

**During Local Development:**
```bash
npx ts-node scripts/populateGoogleSheet.ts <your-form-slug>
```

**In Production (Docker Container):**
```bash
docker exec -it <your-container-name> node scripts/populateGoogleSheet/index.js <your-form-slug>
```

The script authenticates using the credentials stored in MongoDB for that slug and dynamically generates the worksheets:
1. **Master Sheet**: The first worksheet will be formatted to include all global survey questions.
2. **Dynamic Team Worksheets**: If any `pages` define `customData.sheetName`, the script automatically instantiates separate tabs named identically and populates them with both general questions and page-specific questions.

### Adding Clickable Links (Markdown & HTML)

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