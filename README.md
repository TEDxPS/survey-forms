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
```bash
docker build \
  --platform linux/amd64 \
  --secret id=google_creds,src="your Google Cloud Service Account JSON file full path" \
  --build-arg MONGO_URI="your_mongo_uri" \
  --build-arg GOOGLE_BUCKET_NAME="your_bucket_name" \
  -t recruitment-form:latest .
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
    // ... Any standard SurveyJS JSON definition ...
  ],
  "expiry": {
    "date": "2026-12-31T23:59:59Z", // Optional: ISO expiration date
    "message": "<p>Registration is closed!</p>" // Optional: HTML message shown upon expiry
  },
  "allowDuplicateEmails": false, // Optional: Strict validation checking `/api/validate` (defaults to true if omitted)
  "google": {
    "sheetId": "1aBcDeFgHiJkLmNoPqRsTuVwXyZ...", // Optional: Target Google Sheet ID
    "bucketId": "your-gcs-bucket-name", // Optional: Target Google Cloud Storage Bucket Name
    "apiKey": "{\"type\": \"service_account\", \"project_id\": \"...\", \"private_key\": \"-----BEGIN PRIVATE KEY-----\\n...\", \"client_email\": \"...\"}" // Optional: Stringified Google Service Account JSON
  }
}
```

## 3. Setting Up Google Sheet Submissions & Bucket Uploads
Instead of passing sensitive keys from the backend to the frontend, the data ingestion mechanism works securely:
1. **Frontend Submission**: The frontend submits the user's survey data or uploaded files alongside the `slug`.
2. **Backend Interception**: The backend `POST` routes (`/api/submit`, `/api/upload`) extract the `slug` and securely query MongoDB to fetch the credentials mapping associated with that specific form.
3. **Dynamic Credentials**: 
   - If `google.apiKey` exists, the backend parses it and instantiates a customized network connection context for that specific submission or upload instance. 
   - If `google.sheetId` or `google.bucketId` exist, data is routed specifically to those endpoints.
4. **Environment Fallback**: If the `google` object is omitted in MongoDB or keys are empty, the backend gracefully falls back to the system's global `.env` configuration (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `GOOGLE_BUCKET_NAME`).
5. **Multi-Tenant MongoDB Storage**: Before submission to Google Sheets, the backend natively routes the user's payload into a dynamically generated **MongoDB Database named identically to the form's `slug`**. The raw form metrics are strictly isolated within a `formsubmissions` collection specific to that database, ensuring perfectly siloed validations (e.g. duplicate email checking) and unpolluted data pipelines.

This structure permits every individual survey to securely leverage isolated Google Projects or Sheets without necessitating code alterations or app redeployment!