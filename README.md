# TEDx Survey Forms

一个基于 Next.js 的动态问卷与招募表单应用，专为 TEDx 章节设计。此项目允许你从单一代码库提供多份不同的表单，完全由储存在 MongoDB 中的配置数据驱动。\
A dynamic, Next.js-based survey and recruitment form application for TEDx chapters. This project allows you to serve multiple different forms from a single codebase, entirely driven by configuration data stored in MongoDB.

表单使用 [SurveyJS Form Library](https://surveyjs.io/form-library/documentation/overview) 渲染，并整合自定义后端，负责处理验证、提交、档案上传，以及将数据安全路由至专属 Google Sheets 和 Google Drive。\
The forms are rendered using the [SurveyJS Form Library](https://surveyjs.io/form-library/documentation/overview), integrated with a custom backend that handles validations, submissions, file uploads, and routing data securely to dedicated Google Sheets and Google Drive.

---

## 🚀 快速开始 / Getting Started

### 本地开发 / Local Development

在本地执行应用程式：\
To run the application locally:

```bash
cp .env.example .env
npm install
npm run dev
```

在浏览器中开启 http://localhost:3000/ \
Open http://localhost:3000/ in your web browser.

### 透过 Docker 执行（推荐）/ Running via Docker (Recommended)

此项目会自动建置 Docker 映像档并发布至 GitHub Container Registry (GHCR)。Next.js 在运行时原生处理环境变数，因此只需拉取映像档并注入变数即可：\
This project automatically builds and publishes a Docker image to GitHub Container Registry (GHCR). Next.js naturally handles environment variables during runtime, so you only need to pull the image and inject the variables:

```bash
docker pull ghcr.io/tedxps/survey-form:latest
```

启动容器并安全注入所有配置：\
To natively instantiate the container while securely bootstrapping all configurations globally:

```bash
docker run -p 3000:3000 \
  -e MONGO_URI="mongodb://your-mongo-uri" \
  -e GOOGLE_PROJECT_ID="your-gcp-project-id" \
  -e GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account-email" \
  -e GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..." \
  -e GOOGLE_SHEET_ID="your-global-sheet-fallback" \
  -e GOOGLE_BUCKET_NAME="your-global-bucket-fallback" \
  ghcr.io/tedxps/survey-form:latest
```

**手动建置 / Building Manually**

若需从原始码手动建置映像档：\
If you need to build the image manually from source:

```bash
docker build --platform linux/amd64 -t survey-forms:latest .
```

---

## ⚙️ 动态表单配置（MongoDB）/ Dynamic Form Configuration (MongoDB)

此应用支援从 MongoDB 动态获取表单定义与 Google Cloud 配置。此架构允许多份不同的问卷——各自拥有独立的目标 Sheet 和储存空间——在完全相同的代码库上并行运作。\
This application supports dynamically fetching form definitions and Google Cloud configurations from a MongoDB database. This architecture allows multiple different surveys—each with distinct destination sheets and storage buckets—to run concurrently on the exact same codebase.

### 1. 透过 URL Slug 载入表单 / Loading Forms via URL Slug

当用户访问子路径 URL（如 `https://domain.com/survey-name`）时，前端会向 `/api/load?slug=survey-name` 发送请求。\
When a user visits a sub-path URL (e.g., `https://domain.com/survey-name`), the frontend sends a request to `/api/load?slug=survey-name`.

后端将 `slug` 与 MongoDB 中的 `Form` collection 进行匹配，返回的 JSON 结构会在前端动态建构问卷 UI。**安全性是首要考量：** 敏感的 `google` 后端配置对象会在服务器端剥除，永远不会暴露给客户端。\
The backend matches the `slug` against the `Form` collection in MongoDB. The JSON structure returned dynamically builds the Survey UI on the frontend. **Safety is a priority:** the sensitive `google` backend configuration object is stripped out on the server and is never exposed to the client.

### 2. MongoDB 文档格式 / MongoDB Document Format

MongoDB 文档结构与标准 SurveyJS JSON 配置完全一致，但额外引入自定义根属性（`slug`、`heroImage`、`expiry`、`google`）来编排后端连接：\
The MongoDB document structure is exactly identical to a standard SurveyJS JSON configuration, but introduces custom root properties (`slug`, `heroImage`, `expiry`, and `google`) that orchestrate backend connectivity:

```json
{
  "slug": "survey-name",
  "title": "Recruitment Form 2026",
  "heroImage": "https://example.com/cover.jpg",
  "pages": [
    {
      "name": "introduction",
      "elements": [ "..." ],
      "readTimeEnforcement": 15
    },
    {
      "name": "editorial_questions",
      "elements": [ "..." ],
      "customData": {
        "sheetName": "Editorial"
      }
    }
  ],
  "expiry": {
    "date": "2026-12-31T23:59:59Z",
    "message": "<p>Registration is closed!</p>"
  },
  "allowDuplicateEmails": false,
  "google": {
    "sheetId": "1aBcDeFgHiJkLmNoPqRsTuVwXyZ...",
    "driveFolderId": "your-drive-folder-id",

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

各根属性说明：\
Root property reference:

| 字段<br>Field            | 必填<br>Required | 说明<br>Description                                                                                               |
|------------------------|----------------|-----------------------------------------------------------------------------------------------------------------|
| `slug`                 | ✅              | URL 路径识别码，需与访问路径一致<br>URL path identifier, must match the visited path                                          |
| `title`                | ✅              | 表单标题，显示于页面与社交预览<br>Form title shown on the page and social preview                                              |
| `heroImage`            | ❌              | 页面顶部响应式图片的 URL，同时作为社交媒体缩略图<br>URL for the top responsive hero image, also used as the social media thumbnail    |
| `pages`                | ✅              | SurveyJS 页面与问题定义（见 `pages` 参数详解）<br>SurveyJS page and question definitions (see `pages` field reference)        |
| `expiry.date`          | ❌              | ISO 格式过期时间，过期后显示 `expiry.message`<br>ISO expiration datetime; shows `expiry.message` after this time            |
| `expiry.message`       | ❌              | 过期后显示的 HTML 讯息<br>HTML message shown upon expiry                                                                |
| `allowDuplicateEmails` | ❌              | 设为 `false` 时启用重复 Email 检查，默认为 `true`<br>Set to `false` to enable duplicate email validation, defaults to `true` |
| `google.sheetId`       | ❌              | 目标 Google Sheet ID<br>Target Google Sheet ID                                                                    |
| `google.driveFolderId` | ❌              | 档案上传的目标 Google Drive 资料夹 ID<br>Target Google Drive folder ID for file uploads                                   |
| `google.client_email`  | ✅*             | Service Account 的 Email（需有 Sheet 编辑权限）<br>Service Account email (must have Editor access to the Sheet)          |
| `google.private_key`   | ✅*             | Service Account 的私钥<br>Service Account private key                                                              |

> ✅* 若需使用 Google Sheets 或 Google Drive 功能，`client_email` 与 `private_key` 为必填。\
> ✅* Required if Google Sheets or Google Drive features are needed.

---

## 📊 整合与数据路由 / Integrations & Data Routing

### Google Sheets 提交与 Drive 上传 / Google Sheets Submissions & Drive Uploads

系统不会将敏感密钥从后端传至前端，数据摄入机制以原生且安全的方式运作：\
Instead of passing sensitive keys from the backend to the frontend, the data ingestion mechanism works natively and securely:

1. **前端提交 / Frontend Submission:** 前端将用户的问卷数据或上传档案连同 `slug` 一并提交。\
   The frontend submits the user's survey data or uploaded files alongside the `slug`.
2. **后端拦截 / Backend Interception:** 后端 `POST` 路由（`/api/submit`、`/api/upload`）提取 slug，并查询 MongoDB 获取该表单对应的凭证配置。\
   The backend `POST` routes (`/api/submit`, `/api/upload`) extract the slug and query MongoDB to fetch the credentials mapping associated with that specific form.
3. **动态凭证 / Dynamic Credentials:**\
   Dynamic credential resolution:
   - 若 `google.private_key` 和 `google.client_email` 存在，后端会为该次提交／上传实例化专属的网络连接上下文。\
     If `google.private_key` and `google.client_email` exist, the backend instantiates a customized network connection context for that specific submission/upload.
   - 若 `google.sheetId` 或 `google.driveFolderId` 存在，数据会被明确路由至这些端点。\
     If `google.sheetId` or `google.driveFolderId` exist, data is explicitly routed to those endpoints.
4. **多租户 MongoDB 储存 / Multi-Tenant MongoDB Storage:** 提交至 Google Sheets 之前，后端会将用户的载荷路由至一个**以表单 `slug` 命名的独立 MongoDB 数据库**。原始表单指标被严格隔离在该数据库专属的 `formsubmissions` collection 中，确保验证（如重复 Email 检查）和数据管线完全隔离。\
   Before submission to Google Sheets, the backend routes the user's payload into a dynamically generated **MongoDB database named identically to the form's `slug`**. The raw form metrics are strictly isolated within a `formsubmissions` collection specific to that database, ensuring perfectly siloed validations and unpolluted data pipelines.

此架构允许每份问卷使用独立的 Google 项目或 Sheet，无需修改代码或重新部署应用！\
This structure permits every survey to leverage isolated Google Projects or Sheets without necessitating code alterations or app redeployment!

### 智能 Sheet 路由（主表 + 副本）/ Intelligent Sheet Routing (Master Insert + Carbon Copies)

`/api/submit` 端点根据数据库中的配置智能映射并动态路由数据：\
The `/api/submit` endpoint intelligently maps and routes data dynamically based on the explicit configuration inside the database:

1. **主表插入 / Master Insert:** 第一个工作表分页永远作为主数据日志，自动摄入整份表单的所有答案。\
   The absolutely first worksheet tab always serves as your master data log. It automatically ingests all answers from the entire form.
2. **动态副本 / Dynamic Carbon Copies:** 脚本在处理过程中交叉参照用户产生的答案。当验证到包含 `customData.sheetName` 声明的 `pages` 时，若确认用户与该「团队页面」上的问题有互动，则会将整行提交数据镜像复制至对应的 Google Sheet 分页，互不干扰。\
   The script cross-references the user's answers during processing. When it detects a `pages` entry with a `customData.sheetName` declaration and confirms the user answered questions on that page, it mirrors the entire submission row into that specific tab without disruption.

*这种灵活性意味着在后端新增一个全新部门，永远不需要修改后端代码！*\
*This inherent flexibility means adding an entirely new team department to your backend explicitly never requires backend system modification!*

---

## 🛠️ 工具与自定义 / Utilities & Customization

### 初始化 Google Sheet 表头 / Initializing Google Sheet Headers

在 Google Sheet 能正确接收数据之前，**必须先用对应的栏位表头（匹配问卷的问题 ID 和标题）进行初始化**。你可以使用提供的初始化脚本来自动化此配置。\
Before your Google Sheet can correctly receive data, it **must be initialized with the appropriate column headers** (matching your survey's question IDs and titles). You can automate this configuration using the provided initialization script.

详细用法请参阅 [docs/populate-google-sheet.md](docs/populate-google-sheet.md)。\
For detailed usage, see [docs/populate-google-sheet.md](docs/populate-google-sheet.md).

**本地开发 / During Local Development:**
```bash
npm run populate-sheet -- <your-form-slug>
```

**生产环境（Docker 容器）/ In Production (Docker Container):**
```bash
docker exec -it <your-container-name> node scripts/populateGoogleSheet/index.js <your-form-slug>
```

脚本使用 MongoDB 中该 slug 对应的凭证进行验证，并动态生成工作表：\
The script authenticates using the credentials stored in MongoDB for that slug and dynamically generates the worksheets:

1. **主工作表 / Master Sheet:** 第一个工作表将被格式化以包含所有全局问卷问题。\
   The first worksheet will be formatted to include all global survey questions.
2. **动态团队工作表 / Dynamic Team Worksheets:** 若任何 `pages` 定义了 `customData.sheetName`，脚本会自动建立同名的独立分页，并填入通用问题和该页面专属问题。\
   If any `pages` define `customData.sheetName`, the script automatically instantiates separate tabs named identically and populates them with both general questions and page-specific questions.

### 可点击链接（Markdown 与 HTML）/ Adding Clickable Links (Markdown & HTML)

内建的 Survey 组件配置了全局文字拦截器（`onTextMarkdown`）。这意味着你无需手动配置 DOM 元素来显示带品牌样式的链接。你可以在 MongoDB 表单 JSON 的任何文字属性（如 `title` 或 `description`）中使用标准 Markdown 链接或标准 HTML `<a>` 标签。\
The built-in Survey component is configured with a global text interceptor (`onTextMarkdown`). This means you do not need to manually configure DOM elements to display beautiful, natively branded links. You can safely place standard Markdown links or standard HTML `<a>` tags inside any text property (such as `title` or `description`) in your MongoDB form JSON.

系统会在渲染时自动拦截这些内容，并注入项目的 Tailwind 样式类和安全属性（`target="_blank" rel="noopener noreferrer"`）。\
The system will automatically intercept these on render and inject the project's Tailwind utility classes (e.g., `text-[#eb0028] underline...`) and safety attributes (`target="_blank" rel="noopener noreferrer"`).

**Markdown 写法 / Example using Markdown:**
```json
{
  "type": "file",
  "name": "dope_test",
  "title": "Please upload your DOPE test results",
  "description": "Please take the test before uploading. [Click here to take the DOPE Personality Test](https://example.com/file)"
}
```

**HTML 写法 / Example using direct HTML:**
```json
{
  "type": "radiogroup",
  "name": "first_choice",
  "title": "What is your first choice?",
  "description": "<a href='https://example.com/job-scope'>Click here to read the job scope of all teams</a>"
}
```

两种写法在开箱即用时渲染效果完全一致，并在整个问卷内全局套用正确的项目样式！\
Both approaches will render identically out of the box with the correct project styling applied globally inside the survey!

### Supporting Matrix Type Questions

Matrix questions require special handling during Google Sheet header generation. Headers are derived from the question's `title` combined with each defined `rows` value, producing one column per row.

Given the following question definition:

```json
{
  "type": "matrix",
  "name": "meal_preference",
  "title": "What's your meal preference?",
  "columns": [
    "Western",
    "Asian",
    "Middle Eastern"
  ],
  "rows": [
    "Breakfast",
    "Lunch",
    "Dinner"
  ],
  "cellType": "checkbox"
}
```

The script automatically generates a column per row, prefixed by the question title:

| What's your meal preference? - Breakfast | What's your meal preference? - Lunch | What's your meal preference? - Dinner |
|------------------------------------------|--------------------------------------|---------------------------------------|
| Asian                                    | Western                              | Western, Middle Eastern               |
