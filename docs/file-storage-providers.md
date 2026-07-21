# 档案储存供应商 / File Storage Providers

## 概述 / Overview

问卷中的 `file` 类型问题（档案上传）透过一个可插拔的**档案储存供应商（File Storage Provider）**系统处理，而非写死单一云端服务。这让此项目可以在不修改上传路由或前端代码的情况下，支援多种不同的储存后端（Google Cloud Storage、Amazon S3、Azure Blob Storage 等）。\
File upload questions (`type: "file"`) in a survey are handled by a pluggable **File Storage Provider** system rather than a single hard-coded cloud service. This lets the project support multiple different storage backends (Google Cloud Storage, Amazon S3, Azure Blob Storage, etc.) without changing the upload route or frontend code.

目前内建的供应商是 **Google Cloud Storage (GCS)**。\
The only built-in provider today is **Google Cloud Storage (GCS)**.

> **为什么不是 Google Drive？/ Why not Google Drive?**\
> Service Account（服务账号）在 Google Drive 上**没有任何储存配额**，即使文件夹属于 Google Workspace 的共享云端硬盘（Shared Drive）也需要额外设置；在个人 Gmail 账号下 Shared Drive 功能完全不可用。Google Cloud Storage 则不受此限制——储存空间计入 GCP 项目账单，而非任何单一用户的配额，因此本项目改用 GCS 作为默认档案储存方案。\
> Service accounts have **zero storage quota** on Google Drive. Even with a Shared Drive (Workspace-only, unavailable on personal Gmail), extra setup is required. Google Cloud Storage has no such limitation — storage is billed to the GCP project, not any individual user's quota — so this project uses GCS as its default file storage backend.

---

## 给表单管理员：如何配置 / For Form Admins: How to Configure

在表单编辑器（Admin → Forms → 编辑表单）的**「Google Auth & File Storage」**步骤中：\
In the form editor (Admin → Forms → Edit Form), under the **"Google Auth & File Storage"** step:

1. 于 **File Storage** 区块的 **Provider** 下拉选单中选择 `Google Cloud Storage`\
   In the **File Storage** section, select `Google Cloud Storage` from the **Provider** dropdown
2. 填入 **Bucket Name**（GCS 储存桶名称）\
   Fill in the **Bucket Name** (your GCS bucket's name)
3. 于同一步骤的 **Service Account** 区块填入 `client_email` 与 `private_key`（与 Google Sheets 使用的是**同一组** Service Account 凭证）\
   Fill in `client_email` and `private_key` in the **Service Account** section on the same step (this is the **same** service account credential set used for Google Sheets)

保存表单后，档案上传问题会自动透过 `/api/upload` 路由到所选的储存供应商。\
After saving the form, file upload questions automatically route through `/api/upload` to the selected storage provider.

---

## GCS 设置步骤 / Setting Up Google Cloud Storage

由于 Google Sheets 整合本来就需要一个 GCP 项目与 Service Account，以下步骤是在**同一个 GCP 项目**中新增 Cloud Storage 权限，不需要建立新项目。\
Since the Google Sheets integration already requires a GCP project and service account, the steps below just add Cloud Storage permissions to that **same GCP project** — no new project needed.

1. **启用 Cloud Storage API / Enable the Cloud Storage API**\
   在 [Google Cloud Console](https://console.cloud.google.com/apis/library/storage.googleapis.com) 中为你的项目启用 `Cloud Storage API`。\
   In the [Google Cloud Console](https://console.cloud.google.com/apis/library/storage.googleapis.com), enable the `Cloud Storage API` for your project.

2. **建立储存桶 / Create a bucket**\
   在 [Cloud Storage → Buckets](https://console.cloud.google.com/storage/browser) 中建立一个新储存桶，记下其名称（即表单中的 Bucket Name）。\
   In [Cloud Storage → Buckets](https://console.cloud.google.com/storage/browser), create a new bucket and note its name (this is the Bucket Name field in the form).

3. **授予 Service Account 写入权限 / Grant the service account write access**\
   于该储存桶的 **Permissions** 分页，新增你的 Service Account（`client_email`），角色选择 **Storage Object Admin**（或至少 **Storage Object Creator**）。\
   On the bucket's **Permissions** tab, add your service account (`client_email`) with the **Storage Object Admin** role (or at minimum **Storage Object Creator**).

4. **开放公开读取（让上传后的连结可被浏览器打开）/ Allow public read (so the uploaded link is browser-viewable)**\
   在同一个 **Permissions** 分页，新增主体 `allUsers`，角色选择 **Storage Object Viewer**。\
   On the same **Permissions** tab, add the principal `allUsers` with the **Storage Object Viewer** role.

   > **注意 / Note:** 新建的储存桶默认启用「统一储存桶级别存取权限（Uniform bucket-level access）」，此设置下**无法**对单一档案设置公开读取（object-level ACL），因此必须在**储存桶层级**设置 `allUsers` 的读取权限，而不是等上传后再逐一设置。\
   > New buckets default to **Uniform bucket-level access**, which does **not** allow per-object public-read ACLs. Public read access must therefore be granted at the **bucket level** as shown above, rather than per-uploaded-file.

完成以上设置后，`provider.upload()` 回传的 `file.publicUrl()` 连结（格式为 `https://storage.googleapis.com/<bucket>/<form-slug>/<filename>`）即可被任何人公开访问。\
Once set up, the `file.publicUrl()` link returned by `provider.upload()` (in the form `https://storage.googleapis.com/<bucket>/<form-slug>/<filename>`) will be publicly accessible to anyone.

5. **设置 CORS（预览缩略图所需）/ Configure CORS (required for preview thumbnails)**\
   问卷前端在渲染档案上传问题的预览缩略图时，会透过浏览器 `fetch()` 直接读取该档案的 URL（而非单纯用 `<img>` 标签），这会受浏览器 CORS 限制。GCS 储存桶**默认没有设置任何 CORS 规则**，因此若跳过此步骤，档案会上传成功，但预览图不会显示。\
   The survey frontend fetches the uploaded file's URL directly via the browser's `fetch()` (not just an `<img>` tag) when rendering the file question's preview thumbnail, which is subject to browser CORS restrictions. GCS buckets have **no CORS rules configured by default**, so skipping this step means uploads succeed but the preview thumbnail never renders.

   建立一个 `cors.json` 文件：\
   Create a `cors.json` file:
   ```json
   [
     {
       "origin": ["https://your-domain.com"],
       "method": ["GET"],
       "responseHeader": ["Content-Type"],
       "maxAgeSeconds": 3600
     }
   ]
   ```
   再透过 [gsutil](https://cloud.google.com/storage/docs/gsutil_install) 套用至储存桶：\
   Then apply it to the bucket via [gsutil](https://cloud.google.com/storage/docs/gsutil_install):
   ```bash
   gsutil cors set cors.json gs://your-bucket-name
   ```
   `origin` 需包含所有会渲染表单的网域（本地开发时可加入 `http://localhost:3000`）。可透过以下指令确认目前设置：\
   `origin` must include every domain that renders the form (add `http://localhost:3000` for local development). Verify the current setting with:
   ```bash
   gsutil cors get gs://your-bucket-name
   ```

---

## 给开发者：如何新增供应商 / For Developers: Adding a New Provider

这是本项目开源设计的核心之一——欢迎 fork 后新增你自己的储存供应商（Amazon S3、Azure Blob Storage、Cloudinary 等），不需要修改上传路由、后台 UI 或前端代码。\
This is a core part of the project's open-source design — fork the repo and add your own storage provider (Amazon S3, Azure Blob Storage, Cloudinary, etc.) without touching the upload route, admin UI, or frontend code.

### 1. 接口定义 / The Interface

所有供应商定义于 `src/libs/fileStorage/types.ts`：\
All providers conform to the interface defined in `src/libs/fileStorage/types.ts`:

```ts
export interface FileStorageConfigField {
  key: string;          // 存放于 fileStorage.config 的字段名 / key stored under fileStorage.config
  label: string;        // 后台 UI 显示的标签 / label shown in the admin UI
  placeholder?: string;
}

export interface FileStorageProviderMeta {
  key: string;                       // 供应商唯一识别码，如 "gcs" / unique provider key, e.g. "gcs"
  label: string;                     // 后台下拉选单显示名称 / label shown in the admin dropdown
  configFields: FileStorageConfigField[];
}

export interface UploadInput {
  buffer: Buffer;
  filename: string;
  mimeType: string;
}

export interface FileStorageProvider extends FileStorageProviderMeta {
  upload(
    input: UploadInput,
    ctx: { google?: IForm["google"]; slug: string; config: Record<string, unknown> }
  ): Promise<{ url: string }>;
}
```

`ctx.google` 是表单的 Google Service Account 凭证（若该表单有配置的话；不是每个供应商都需要用到），`ctx.slug` 是该表单的 slug（建议用于命名储存路径前缀，让不同表单的上传档案彼此隔离，如 GCS 供应商即以 `<slug>/<filename>` 的路径储存），`ctx.config` 则是该表单 `fileStorage.config` 内的供应商专属设置（如 GCS 的 `bucketId`）。\
`ctx.google` is the form's Google service account credentials (present if the form has one configured — not every provider needs it), `ctx.slug` is the form's slug (recommended for namespacing the storage path so uploads from different forms stay isolated, e.g. the GCS provider stores under `<slug>/<filename>`), and `ctx.config` is the provider-specific settings stored under that form's `fileStorage.config` (e.g. `bucketId` for GCS).

### 2. 实现步骤 / Implementation Steps

1. 于 `src/libs/fileStorage/providers/` 新增一个档案（如 `s3.ts`），实现 `FileStorageProvider` 接口的 `upload()` 方法。\
   Add a new file under `src/libs/fileStorage/providers/` (e.g. `s3.ts`) implementing the `FileStorageProvider` interface's `upload()` method.

2. 于 `src/libs/fileStorage/types.ts` 的 `FILE_STORAGE_PROVIDERS_META` 数组中新增一笔元数据（`key`、`label`、`configFields`）——这会自动让后台 UI 显示新的供应商选项与对应的设置字段，不需要修改任何 UI 代码。\
   Add a metadata entry (`key`, `label`, `configFields`) to the `FILE_STORAGE_PROVIDERS_META` array in `src/libs/fileStorage/types.ts` — this automatically makes the new provider appear in the admin UI dropdown with its config fields rendered, no UI code changes required.

3. 于 `src/libs/fileStorage/registry.ts` 中将新供应商加入 `providers` map。\
   Register the new provider in the `providers` map inside `src/libs/fileStorage/registry.ts`.

```ts
// src/libs/fileStorage/registry.ts
import gcsProvider from "./providers/gcs";
import s3Provider from "./providers/s3";       // 新增 / new
import { FileStorageProvider } from "./types";

const providers: Record<string, FileStorageProvider> = {
  [gcsProvider.key]: gcsProvider,
  [s3Provider.key]: s3Provider,                // 新增 / new
};
```

完成以上三步后，`/api/upload` 路由会自动支持新的供应商——它只依据表单文档中 `fileStorage.provider` 的值查找对应的实现，不需要任何 `if/else` 分支。\
Once these three steps are done, `/api/upload` automatically supports the new provider — it looks up the implementation purely by the `fileStorage.provider` value stored on the form document, with no `if/else` branching required.

### 3. 注意事项 / Notes

- **`types.ts` 不应引入任何 Node-only 依赖**（如云端 SDK），因为它同时被后台 UI（浏览器端）与上传路由（服务器端）引用；实际的供应商实现文件（如 `providers/gcs.ts`）才是唯一允许引入云端 SDK 的地方，且只会被服务器端的 `/api/upload` 路由引用，不会被打包进浏览器。\
  **`types.ts` must not import any Node-only dependencies** (like cloud SDKs) since it's shared by both the admin UI (browser) and the upload route (server). The actual provider implementation file (e.g. `providers/gcs.ts`) is the only place cloud SDKs should be imported, and it's only ever imported by the server-side `/api/upload` route — never bundled into the browser.
- 上传路由要求的响应格式为 `{ url: string }`；`fileUrl` 会原样存入 Google Sheet 与 MongoDB 提交记录中，因此应回传**公开可访问**的连结。\
  The upload route expects a `{ url: string }` response; the URL is stored as-is in the Google Sheet and MongoDB submission record, so it should be a **publicly accessible** link.
