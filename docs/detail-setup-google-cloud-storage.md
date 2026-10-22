# Google Cloud Setup for Google Sheets & Cloud Storage

This guide explains how to configure Google Cloud so Survey Forms can export responses to Google Sheets and upload files to Google Cloud Storage.

本指南说明如何配置 Google Cloud，让 Survey Forms 能够将提交资料写入 Google Sheets，并将附件上传至 Google Cloud Storage。

---

## Step 1. Create a Google Cloud Project / 建立 Google Cloud Project

Go to **https://console.cloud.google.com/** and create a new Google Cloud Project.

进入 **https://console.cloud.google.com/**，建立一个新的 Google Cloud Project。

Example / 例如：

```
TEDx Survey Test
```

---

## Step 2. Enable Required APIs / 启用所需 API

Navigate to:

进入：

```
Google Cloud Console
└── APIs & Services
    └── Library
```

Enable the following APIs:

启用以下 API：

- Google Sheets API
- Cloud Storage API

---

## Step 3. Create a Service Account / 建立 Service Account

Navigate to:

进入：

```
Google Cloud Console
└── IAM & Admin
    └── Service Accounts
```

Click **Create Service Account**.

点击 **Create Service Account**。

Example / 例如：

```
survey-form-bot
```

After creation, you'll receive a Service Account email similar to:

建立完成后，会得到类似以下的 Service Account Email：

```
survey-form-bot@your-project-id.iam.gserviceaccount.com
```

---

## Step 4. Generate a JSON Key / 建立 JSON Key

Open the Service Account and navigate to:

进入刚建立的 Service Account，依序点击：

```
Keys
→ Add Key
→ Create new key
→ JSON
```

Download the generated JSON file.

下载产生的 JSON 文件。

Example / 范例：

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----...",
  "client_email": "...",
  "client_id": "..."
}
```

> Keep this file secure. It contains your private credentials.
>
> 请妥善保管此 JSON 文件，里面包含私钥，不建议公开上传。

---

## Step 5. Create a Google Sheet / 建立 Google Sheet

Create a new Google Sheet using Google account.

使用 Google 帐号建立一个新的 Google Sheet。

Example / 例如：

```
Inventory Borrow Response
```

Click **Share** and add your Service Account email.

点击 **Share（共享）**，加入刚刚建立的 Service Account Email。

Grant the following permission:

给予以下权限：

```
Editor
```

Otherwise, the backend won't be able to write data into the spreadsheet.

否则 backend 将无法写入资料到 Google Sheet。

---

## Step 6. Obtain the Google Sheet ID / 取得 Google Sheet ID

Example URL / 例如：

```
https://docs.google.com/spreadsheets/d/1ABCDEFxxxx/edit
```

The highlighted portion is the Google Sheet ID.

中间这一段就是 Google Sheet ID。

```
1ABCDEFxxxx
```

---

## Step 7. Create a Cloud Storage Bucket / 建立 Cloud Storage Bucket

Navigate to:

进入：

```
Google Cloud Console
└── Cloud Storage
    └── Buckets
```

If the bucket does not exist, create one.

如果 Bucket 尚未建立，请先建立一个。

Example / 例如：

```
survey-test-tedx
```

---

## Step 8. Grant Storage Permissions / 给予 Storage 权限

Navigate to:

进入：

```
Cloud Storage
└── Buckets
    └── survey-test-tedx
        └── Permissions
```

Click **Grant Access**.

点击 **Grant Access**。

**Principal**

Enter your Service Account email.

填入你的 Service Account Email。

Example / 例如：

```
survey-form-bot@your-project-id.iam.gserviceaccount.com
```

Assign one of the following roles:

给予以下其中一种权限：

- Storage Object Creator _(Recommended / 建议)_
- Storage Object Admin

---

## Step 9. Configure the Survey Form / 配置 Survey Form

Open the Admin Portal:

开启后台：

```
http://localhost:3000/admin/forms
```

Edit your form.

编辑对应的 Form。

Fill in the following information:

填写以下资料：

### Google Sheet ID

Paste the Sheet ID from Step 6.

填入步骤 6 取得的 Google Sheet ID。

### Google Bucket Name

Example / 例如：

```
survey-test-tedx
```

### Service Account JSON

Open the downloaded JSON file and copy its entire contents.

打开刚下载的 JSON 文件，并复制**整个内容**。

Return to the Admin Portal and click:

回到后台，点击：

```
Paste Service Account JSON
```

The remaining fields will be filled automatically.

其余栏位会自动填写。

---

## Setup Complete / 完成

Your Survey Form is now configured to:

Survey Form 已完成设定，可以：

- Upload attachments to Google Cloud Storage.
- 上传附件至 Google Cloud Storage。

- Export responses to Google Sheets.
- 将提交资料写入 Google Sheets。
