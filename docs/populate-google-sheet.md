# `populate-sheet` 使用手册 / User Manual

## 概述 / Overview

此脚本会读取 MongoDB 中指定表单的问题结构，并自动在对应的 Google Sheet 中初始化表头栏位。每次新建表单时需执行一次，之后提交的回应才能正确对应到各栏位。\
This script reads a form's question structure from MongoDB and initializes the header columns in the corresponding Google Sheet. Run it once whenever a new form is created so that future submissions map correctly to their columns.

---

## 前置条件 / Prerequisites

执行前请确认以下事项已完成：\
Before running, confirm the following:

1. MongoDB 正在运行，且目标表单文档已存在于 `forms` collection\
   MongoDB is running and the target form document exists in the `forms` collection
2. `.env` 文件中已设置 `MONGO_URI`\
   `MONGO_URI` is set in your `.env` file
3. MongoDB 中的表单文档包含 `google.sheetId`、`google.client_email`、`google.private_key` 字段\
   The form document in MongoDB contains `google.sheetId`, `google.client_email`, and `google.private_key`
    ```json
    {
      "google": {
        "sheetId": "YOUR_GOOGLE_SHEET_ID",
        "client_email": "service-account@project.iam.gserviceaccount.com",
        "private_key": "-----BEGIN PRIVATE KEY-----\n..."
      }
    }
    ```
4. 该 Google Service Account 已被授予目标 Google Sheet 的**编辑权限**\
   The Google Service Account has been granted **Editor** access to the target Google Sheet

---

## 用法 / Usage

```bash
npm run populate-sheet -- <slug>
```

### 参数 / Parameters

| 参数<br>Parameter | 必填<br>Required | 说明<br>Description                                                   |
|-----------------|----------------|---------------------------------------------------------------------|
| `slug`          | ✅              | 表单在 MongoDB 中的唯一识别码<br>The unique identifier of the form in MongoDB |

### 范例 / Examples

```bash
# 初始化名为 "my-form-2026" 的表单
# Initialize the form named "my-form-2026"
npm run populate-sheet -- my-form-2026

# 初始化 TEDx 招募表单
# Initialize the TEDx recruitment form
npm run populate-sheet -- tedx-recruitment-2026
```

---

## 脚本行为 / What the Script Does

1. 连接 MongoDB，查找 `slug` 对应的表单文档\
Connects to MongoDB and looks up the form document by `slug`
2. 读取所有 `pages[].elements` 提取问题列表（自动跳过 `html` 和 `expression` 类型）\
Reads all `pages[].elements` to extract the question list (skips `html` and `expression` types automatically)
3. 展开 `panel` 类型内的嵌套问题\
Expands nested questions inside `panel` elements
4. 在 Google Sheet **第一个分页（Sheet1）** 写入：\
   Writes to the **first tab (Sheet1)** of the Google Sheet:
   - 第 1 行：所有问题的 `name`（程式码用的 ID，作为实际 header）\
     Row 1: each question's `name` (the machine-readable ID used as the actual header key)
   - 第 2 行：所有问题的 `title`（人类可读的描述行）\
     Row 2: each question's `title` (a human-readable description row)
   - 固定前两栏永远是 `Submission ID` 和 `Timestamp`\
     The first two columns are always `Submission ID` and `Timestamp`
5. 若表单设置了 `google.sheetRouting.map`，脚本会为 `map` 中列出的每个分页名称**自动建立独立分页**，栏位与 Sheet1 完全相同（路由是依据单一答案值决定，而非依据页面分组，因此不需要narrow 到「该分组专属问题」）\
If the form's `google.sheetRouting.map` is set, the script **creates a separate tab** for each unique tab name listed in `map`, using the exact same columns as Sheet1 (since routing is decided by one answer's value rather than by page grouping, there is no "that group's specific questions" subset to narrow down to)

---

## MongoDB 表单文档结构 / Required MongoDB Document Structure

以下为脚本读取的最小所需字段：\
The minimum fields the script reads from the form document:

```json
{
  "slug": "my-form-2026",
  "pages": [
    {
      "name": "page1",
      "elements": [
        { "type": "text", "name": "full_name", "title": "Full Name" },
        { "type": "text", "name": "email",     "title": "Email Address" },
        {
          "type": "dropdown",
          "name": "department",
          "title": "Department",
          "choices": [
            { "value": "editorial", "text": "Editorial" },
            { "value": "logistics", "text": "Logistics" }
          ]
        }
      ]
    }
  ],
  "google": {
    "sheetId": "YOUR_GOOGLE_SHEET_ID",
    "client_email": "service-account@project.iam.gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\n...",
    "sheetRouting": {
      "field": "department",
      "map": {
        "editorial": "Editorial"   // 会建立独立的 "Editorial" 分页
                                   // Creates a separate "Editorial" tab
      }
    }
  }
}
```

> `google.sheetRouting` 是**可选插件功能**（由 `src/plugins/sheet-routing` 提供），与表单本身的问题结构完全解耦 — 它不读取 `pages` 或 `customData`，只依据 `field` 指定的问题的答案值查表路由。详见下方「Sheet 路由插件」章节。\
> `google.sheetRouting` is an **optional plugin feature** (provided by `src/plugins/sheet-routing`), fully decoupled from the form's question structure — it does not read `pages` or `customData`, it only looks up a routing destination based on the answer value of the question named in `field`. See the "Sheet Routing Plugin" section below.

---

## `pages` 参数详解 / `pages` Field Reference

每个 `pages` 数组项代表表单的一个页面，包含以下可用字段：\
Each item in the `pages` array represents one page of the form and supports the following fields:

### 页面级字段 / Page-level Fields

| 字段<br>Field            | 类型<br>Type | 必填<br>Required | 说明<br>Description                                                                             |
|------------------------|------------|----------------|-----------------------------------------------------------------------------------------------|
| `name`                 | `string`   | ✅              | 页面的唯一识别码（不显示给用户）<br>Unique page identifier (not shown to users)                               |
| `elements`             | `array`    | ✅              | 该页面包含的问题列表<br>List of questions on this page                                                  |
| `readTimeEnforcement`  | `number`   | ❌              | 强制阅读秒数，倒数结束前「下一步」按钮为禁用状态<br>Seconds users must wait before the Next button is enabled         |
| `customData`           | `object`   | ❌              | 供其他用途的自由格式元数据；分页路由已改由 `google.sheetRouting` 处理，不再读取此栏位<br>Free-form metadata for other uses; sheet routing is now handled by `google.sheetRouting` and no longer reads this field |

### `elements` 问题字段 / `elements` Question Fields

| 字段<br>Field  | 类型<br>Type | 必填<br>Required | 说明<br>Description                                                                                     |
|--------------|------------|----------------|-------------------------------------------------------------------------------------------------------|
| `type`       | `string`   | ✅              | 问题类型（见下方类型表）<br>Question type (see type table below)                                                  |
| `name`       | `string`   | ✅              | 问题的唯一识别码，会成为 Google Sheet 的 header key<br>The unique question ID, used as the Google Sheet header key |
| `title`      | `string`   | ❌              | 显示给用户的问题文字；省略时使用 `name`<br>Question text shown to users; falls back to `name` if omitted              |
| `isRequired` | `boolean`  | ❌              | 设为 `true` 时此题为必填<br>Set to `true` to make this question mandatory                                     |
| `elements`   | `array`    | ❌              | 仅 `panel` 类型使用，内含子问题列表<br>Only used by `panel` type to contain nested questions                       |

### 支援的问题类型 / Supported Question Types

以下类型会被提取为 Google Sheet 栏位；`html` 和 `expression` 类型会被**自动略过**，不占用栏位。\
The following types are extracted as Sheet columns. `html` and `expression` types are **automatically skipped** and do not occupy columns.

---

#### `text` — 单行文字 / Single-line Text

| 可用字段<br>Field | 说明<br>Description                                                                                                                                               |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `inputType`   | 输入格式，如 `"email"`、`"number"`、`"date"`、`"tel"`、`"url"`，默认为 `"text"`<br>Input format, e.g. `"email"`, `"number"`, `"date"`, `"tel"`, `"url"`, defaults to `"text"` |
| `placeholder` | 输入框提示文字<br>Placeholder text shown inside the input                                                                                                              |
| `maxLength`   | 最大字元数<br>Maximum number of characters                                                                                                                           |
| `validators`  | 验证规则（见 SurveyJS 文档）<br>Validation rules (see SurveyJS docs)                                                                                                     |

```json
{ "type": "text", "name": "email", "title": "Email Address", "inputType": "email", "isRequired": true }
{ "type": "text", "name": "birth_date", "title": "Date of Birth", "inputType": "date" }
{ "type": "text", "name": "phone", "title": "Phone Number", "inputType": "tel", "placeholder": "+60 12-345 6789" }
```

---

#### `comment` — 多行文字 / Multi-line Text

| 可用字段<br>Field | 说明<br>Description                                           |
|---------------|-------------------------------------------------------------|
| `rows`        | 文字框预设显示行数，默认 `4`<br>Number of visible rows, defaults to `4` |
| `maxLength`   | 最大字元数<br>Maximum number of characters                       |
| `placeholder` | 提示文字<br>Placeholder text                                    |

```json
{ "type": "comment", "name": "motivation", "title": "Why do you want to join?", "rows": 6, "maxLength": 500 }
```

---

#### `radiogroup` — 单选题 / Single Choice

| 可用字段<br>Field | 说明<br>Description                                                                                                                                  |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `choices`     | ✅ 必填，选项列表，每项为 `{ "value": "...", "text": "..." }` 或纯字串<br>Required, list of choices, each as `{ "value": "...", "text": "..." }` or a plain string |
| `hasOther`    | 设为 `true` 时加入「其他」选项，用户可自填文字<br>Set to `true` to add an "Other" option with free-text input                                                         |
| `colCount`    | 选项排列栏数，`0` = 横排全部，`1`（默认）= 每行一项<br>Number of columns for layout, `0` = all in one row, `1` (default) = one per row                                 |

```json
{
  "type": "radiogroup",
  "name": "tshirt_size",
  "title": "T-Shirt Size",
  "choices": ["XS", "S", "M", "L", "XL"],
  "isRequired": true
}
```

```json
{
  "type": "radiogroup",
  "name": "department",
  "title": "Department of Interest / 有兴趣的部门",
  "colCount": 2,
  "hasOther": true,
  "choices": [
    { "value": "editorial", "text": "Editorial 编辑" },
    { "value": "logistics", "text": "Logistics 统筹" },
    { "value": "marketing", "text": "Marketing 市场" }
  ]
}
```

> **特别说明 / Special Note:** 选项文字中的 `\\\\` 会被渲染为 `|`，可用于在同一行显示中英双语，例如：\
> `\\\\` in choice text is rendered as `|`, useful for bilingual options on one line:
> ```json
> { "value": "yes", "text": "Yes \\\\ 是" }
> ```

---

#### `checkbox` — 多选题 / Multiple Choice

| 可用字段<br>Field        | 说明<br>Description                                                         |
|----------------------|---------------------------------------------------------------------------|
| `choices`            | ✅ 必填，格式同 `radiogroup`<br>Required, same format as `radiogroup`            |
| `hasOther`           | 是否加入「其他」自填项<br>Whether to add an "Other" free-text option                 |
| `hasSelectAll`       | 是否显示「全选」按钮<br>Whether to show a "Select All" button                       |
| `hasNone`            | 是否显示「以上皆非」选项<br>Whether to show a "None of the above" option              |
| `maxSelectedChoices` | 最多可选几项，`0` = 无限制<br>Maximum number of selectable choices, `0` = unlimited |

```json
{
  "type": "checkbox",
  "name": "skills",
  "title": "Select all skills that apply",
  "hasOther": true,
  "maxSelectedChoices": 3,
  "choices": [
    { "value": "writing", "text": "Writing / 写作" },
    { "value": "design", "text": "Graphic Design / 设计" },
    { "value": "video", "text": "Video Editing / 剪辑" },
    { "value": "photography", "text": "Photography / 摄影" }
  ]
}
```

---

#### `dropdown` — 下拉选单 / Dropdown

| 可用字段<br>Field | 说明<br>Description                                                                                          |
|---------------|------------------------------------------------------------------------------------------------------------|
| `choices`     | ✅ 必填，格式同 `radiogroup`<br>Required, same format as `radiogroup`                                             |
| `hasOther`    | 是否加入「其他」自填项<br>Whether to add an "Other" free-text option                                                  |
| `placeholder` | 选单未选时的提示文字，默认为 `"Select..."`<br>Placeholder text shown when nothing is selected, defaults to `"Select..."` |

```json
{
  "type": "dropdown",
  "name": "country",
  "title": "Country of Residence",
  "placeholder": "-- Select a country --",
  "choices": [
    { "value": "my", "text": "Malaysia" },
    { "value": "sg", "text": "Singapore" },
    { "value": "other", "text": "Other" }
  ]
}
```

---

#### `boolean` — 是／否 / Yes or No

| 可用字段<br>Field | 说明<br>Description                                                          |
|---------------|----------------------------------------------------------------------------|
| `labelTrue`   | 「是」那侧的显示文字，默认 `"Yes"`<br>Label for the true side, defaults to `"Yes"`      |
| `labelFalse`  | 「否」那侧的显示文字，默认 `"No"`<br>Label for the false side, defaults to `"No"`       |
| `valueTrue`   | 勾选时储存的值，默认 `true`<br>Value stored when toggled on, defaults to `true`      |
| `valueFalse`  | 取消勾选时储存的值，默认 `false`<br>Value stored when toggled off, defaults to `false` |

```json
{
  "type": "boolean",
  "name": "consent",
  "title": "I agree to the terms and conditions",
  "labelTrue": "Yes, I agree",
  "labelFalse": "No",
  "isRequired": true
}
```

---

#### `rating` — 评分 / Rating Scale

| 可用字段<br>Field        | 说明<br>Description                                               |
|----------------------|-----------------------------------------------------------------|
| `rateMin`            | 最小分值，默认 `1`<br>Minimum rating value, defaults to `1`            |
| `rateMax`            | 最大分值，默认 `5`<br>Maximum rating value, defaults to `5`            |
| `rateStep`           | 每格步进值，默认 `1`<br>Step between each rating value, defaults to `1` |
| `minRateDescription` | 最低分旁显示的说明文字<br>Label displayed next to the minimum value        |
| `maxRateDescription` | 最高分旁显示的说明文字<br>Label displayed next to the maximum value        |

```json
{
  "type": "rating",
  "name": "experience_level",
  "title": "Rate your experience in event management",
  "rateMin": 1,
  "rateMax": 5,
  "minRateDescription": "No experience",
  "maxRateDescription": "Expert"
}
```

---

#### `file` — 档案上传 / File Upload

| 可用字段<br>Field     | 说明<br>Description                                                                                                              |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `acceptedTypes`   | 允许的档案类型，如 `".pdf,.docx"` 或 `"image/*"`<br>Accepted file types, e.g. `".pdf,.docx"` or `"image/*"`                              |
| `maxSize`         | 单个档案最大 KB 数<br>Maximum file size in KB                                                                                         |
| `allowMultiple`   | 是否允许一次上传多个档案，默认 `false`<br>Whether to allow uploading multiple files at once, defaults to `false`                              |
| `storeDataAsText` | 是否将档案转为 Base64 储存，**默认为 `true`**；必须显式设为 `false` 才会改为透过表单配置的档案储存供应商上传<br>Whether to store the file as Base64; **defaults to `true`**, must be explicitly set to `false` to upload through the form's configured file storage provider instead |

上传后 Google Sheet 中储存的值为该表单所配置的档案储存供应商回传的公开连结（如使用 Google Cloud Storage，则为 `storage.googleapis.com` 连结）。详见 [docs/file-storage-providers.md](file-storage-providers.md)。\
After upload, the value stored in Google Sheet is the public URL returned by the form's configured file storage provider (e.g. a `storage.googleapis.com` link when using Google Cloud Storage). See [docs/file-storage-providers.md](file-storage-providers.md) for details.

```json
{
  "type": "file",
  "name": "resume",
  "title": "Upload your resume (PDF only, max 5MB)",
  "acceptedTypes": ".pdf",
  "maxSize": 5120,
  "storeDataAsText": false
}
```

---

#### `matrix` — 矩阵题 / Matrix

每一行是一个子题，各行共用同一组栏（`columns`）作为选项。\
Each row is a sub-question; all rows share the same set of `columns` as choices.

| 可用字段<br>Field      | 说明<br>Description                                                                                                              |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `rows`             | ✅ 子题列表，每项为 `{ "value": "...", "text": "..." }`<br>Required, list of sub-questions, each as `{ "value": "...", "text": "..." }` |
| `columns`          | ✅ 共用选项列表，格式同 `rows`<br>Required, shared choice columns, same format as `rows`                                                  |
| `isAllRowRequired` | 是否要求所有行都必须作答<br>Whether every row must be answered                                                                             |

```json
{
  "type": "matrix",
  "name": "availability",
  "title": "Rate your availability for each period",
  "isAllRowRequired": true,
  "columns": [
    { "value": "1", "text": "Not available" },
    { "value": "2", "text": "Maybe" },
    { "value": "3", "text": "Available" }
  ],
  "rows": [
    { "value": "weekday_morning", "text": "Weekday Morning" },
    { "value": "weekday_evening", "text": "Weekday Evening" },
    { "value": "weekend", "text": "Weekend" }
  ]
}
```

---

#### `html` — 说明文字 / Display Text ⚠️ 不产生栏位

用于在表单中显示纯 HTML 内容（说明、条款等），**不会**产生 Google Sheet 栏位，也不储存用户数据。\
Displays HTML content (instructions, terms, etc.) — **no column created**, no data stored.

支援 Markdown 链接语法：`[Link Text](https://url)` 会自动渲染为红色超链接。\
Supports Markdown link syntax: `[Link Text](https://url)` is rendered as a red hyperlink.

```json
{
  "type": "html",
  "name": "terms_display",
  "html": "<p>请在提交前仔细阅读 <a href='https://tedxpetalingstreet.com/terms'>条款与细则</a>。</p>"
}
```

```json
{
  "type": "html",
  "name": "deadline_notice",
  "html": "<p><strong>Application deadline: 31 December 2026</strong></p>"
}
```

---

#### `panel` — 问题群组 / Question Group ⚠️ 本身不产生栏位

将多个问题组合成一个视觉区块，`panel` 本身不占 Google Sheet 栏位，只有内部的 `elements` 会产生栏位。\
Groups multiple questions into a visual block. The panel itself creates no column; only its nested `elements` do.

| 可用字段<br>Field | 说明<br>Description                                                                                                |
|---------------|------------------------------------------------------------------------------------------------------------------|
| `elements`    | ✅ 子问题列表，支援所有问题类型（除 `panel` 嵌套自身）<br>Required, list of nested questions; supports all types except nested `panel` |
| `title`       | 群组标题，显示给用户<br>Group heading shown to users                                                                       |

```json
{
  "type": "panel",
  "name": "social_media_panel",
  "title": "Social Media Links (Optional)",
  "elements": [
    { "type": "text", "name": "instagram", "title": "Instagram Handle", "placeholder": "@username" },
    { "type": "text", "name": "linkedin", "title": "LinkedIn Profile URL", "inputType": "url" }
  ]
}
```

---

### 范例：完整 `pages` 配置 / Example: Full `pages` Configuration

```json
{
  "slug": "tedx-recruitment-2026",
  "pages": [
    {
      "name": "introduction",
      "readTimeEnforcement": 20,
      "elements": [
        {
          "type": "html",
          "name": "intro_text",
          "html": "<p>欢迎参加 TEDxPetalingStreet 2026 招募！</p>"
        }
      ]
    },
    {
      "name": "personal_info",
      "elements": [
        { "type": "text",     "name": "full_name",  "title": "Full Name / 全名",                      "isRequired": true },
        { "type": "text",     "name": "email",       "title": "Email Address",                         "isRequired": true, "inputType": "email" },
        { "type": "dropdown", "name": "department",  "title": "Department of Interest / 有兴趣的部门", "isRequired": true,
          "choices": [
            { "value": "editorial",  "text": "Editorial 编辑" },
            { "value": "logistics",  "text": "Logistics 统筹" },
            { "value": "marketing",  "text": "Marketing 市场" }
          ]
        }
      ]
    },
    {
      "name": "general_questions",
      "elements": [
        { "type": "comment", "name": "motivation",       "title": "Why do you want to join? / 为什么想加入？", "isRequired": true },
        { "type": "rating",  "name": "experience_level", "title": "Rate your relevant experience (1–5)",       "rateMin": 1, "rateMax": 5 },
        { "type": "file",    "name": "resume",           "title": "Upload your resume / 上传履历",             "acceptedTypes": ".pdf", "storeDataAsText": false }
      ]
    },
    {
      "name": "editorial_specific",
      "elements": [
        {
          "type": "panel",
          "name": "writing_sample_panel",
          "elements": [
            { "type": "comment", "name": "writing_sample", "title": "Provide a writing sample / 提供写作样本", "isRequired": true },
            { "type": "text",    "name": "published_link",  "title": "Link to published work (if any)" }
          ]
        }
      ]
    }
  ],
  "google": {
    "sheetRouting": {
      "field": "department",
      "map": { "editorial": "Editorial" }
    }
  }
}
```

**以上配置会产生的 Google Sheet 结构：**\
**The Google Sheet structure produced by the above config:**

- **Sheet1**：包含所有页面的问题（`full_name`、`email`、`department`、`motivation`、`experience_level`、`resume`、`writing_sample`、`published_link`）\
  Contains all pages' questions
- **Editorial 分页**：与 Sheet1 拥有完全相同的栏位；当提交者的 `department` 答案为 `"editorial"` 时，该提交的整行数据会被复制到此分页（见下方「Sheet 路由插件」）\
  Has the exact same columns as Sheet1; when a submitter's `department` answer is `"editorial"`, that submission's full row is copied into this tab (see "Sheet Routing Plugin" below)

---

## Sheet 路由插件 / Sheet Routing Plugin

`google.sheetRouting` 是一个**可选插件功能**，由 `src/plugins/sheet-routing/index.ts` 实现，在 `/api/submit` 写入主表（Sheet1）之后运行。它与表单的 `pages`/`customData` 完全解耦——不扫描页面结构，只依据你指定的**单一问题**的答案值来决定要不要，以及复制到哪个分页。\
`google.sheetRouting` is an **optional plugin feature**, implemented in `src/plugins/sheet-routing/index.ts`, that runs after `/api/submit` writes the master row (Sheet1). It is fully decoupled from the form's `pages`/`customData` — it does not scan page structure, it only decides whether (and where) to copy a row based on the answer value of **one question you designate**.

### 配置格式 / Config Shape

```json
{
  "google": {
    "sheetRouting": {
      "field": "department",
      "map": {
        "editorial": "Editorial",
        "logistics": "Logistics",
        "marketing": "Marketing"
      }
    }
  }
}
```

| 字段<br>Field           | 类型<br>Type             | 说明<br>Description                                                                                      |
|------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------|
| `field`                | `string`                | 决定路由的问题 `name`（通常是 `radiogroup` 或 `dropdown`）<br>The question `name` that decides routing (typically a `radiogroup` or `dropdown`) |
| `map`                  | `Record<string,string>` | 答案值 → 目标分页名称的对照表；未命中的答案不会产生任何副本<br>Lookup table from answer value → destination tab name; answers with no match produce no copy |

这个功能**不限于团队招募场景**——`field` 可以是任何单选题，`map` 的用途可以是地区分流、活动赛道分流，或任何你需要把提交副本分流到不同分页的场景。\
This feature is **not limited to team recruitment scenarios** — `field` can be any single-answer question, and `map` can be used for regional routing, event-track routing, or any scenario where you need to split submission copies across different tabs.

### 停用此插件 / Disabling This Plugin

若你的表单不需要此功能，只需省略 `google.sheetRouting`——不设置就完全不会触发。若要在整个部署中彻底移除此插件（例如你在 fork 这个专案，且完全不需要 Sheet 路由），从 `src/plugins/registry.ts` 的 `enabledPlugins` 数组中移除 `sheetRouting` 条目即可，核心提交逻辑不会因此受影响。\
If your form doesn't need this, simply omit `google.sheetRouting` — nothing triggers without it. To remove this plugin entirely from a deployment (e.g. you're forking this project and don't need sheet routing at all), remove the `sheetRouting` entry from the `enabledPlugins` array in `src/plugins/registry.ts`; the core submit logic is unaffected either way.

> **注意 / Note:** `introduction` 页只有 `html` 类型，**不会**产生任何 Sheet 栏位。`readTimeEnforcement: 20` 会让用户在该页停留 20 秒后才能继续，但此字段对 Google Sheet 无影响。\
> The `introduction` page contains only an `html` element — **no columns are created**. `readTimeEnforcement: 20` forces users to wait 20 seconds on that page before proceeding, but has no effect on the Sheet structure.

---

## Sheet 结构说明 / Output Sheet Structure

执行后，Google Sheet 的结构如下：\
After running, the Google Sheet will look like this:

**Sheet1（主分页 / Main tab）**

| Submission ID              | Timestamp | full_name | email         | department | … |
|----------------------------|-----------|-----------|---------------|------------|---|
| *(header row — 程式码 ID)*    |           |           |               |            |   |
| *(description row — 人类可读)* |           | Full Name | Email Address | Department | … |

**Editorial（由 `google.sheetRouting` 自动建立的分页 / Auto-created tab from `google.sheetRouting`）**

| Submission ID       | Timestamp | full_name | email         | department |
|---------------------|-----------|-----------|---------------|------------|
| *(header row)*      |           |           |               |            |
| *(description row)* |           | Full Name | Email Address | Department |

> **注意 / Note:** 由 `sheetRouting` 自动建立的分页与 Sheet1 拥有**完全相同**的栏位（不再依据页面分组narrow 到「专属问题」），只有当提交者在 `sheetRouting.field` 指定的问题上给出 `sheetRouting.map` 中命中的答案时，该行才会被复制过来。\
> Tabs auto-created from `sheetRouting` have the **exact same** columns as Sheet1 (no longer narrowed to a page-group's "specific questions") — a row is only copied over when the submitter's answer to the question named in `sheetRouting.field` matches an entry in `sheetRouting.map`.

---

## 常见错误 / Common Errors

| 错误讯息<br>Error Message                       | 原因<br>Cause                                                                                                         | 解法<br>Fix                                                                                 |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| `Form with slug '...' not found`            | MongoDB 中找不到该 slug<br>Slug not found in MongoDB                                                                     | 确认 slug 拼写正确，且文档已插入<br>Check the slug spelling and confirm the document is inserted       |
| `No Google credentials provided`            | 文档缺少 `google.private_key` 或 `google.client_email`<br>Document missing `google.private_key` or `google.client_email` | 在 MongoDB 文档中补上 `google` 字段<br>Add the `google` field to the MongoDB document             |
| `No Google sheetId provided`                | 文档缺少 `google.sheetId`<br>Document missing `google.sheetId`                                                          | 在 MongoDB 文档中补上 `google.sheetId`<br>Add `google.sheetId` to the MongoDB document          |
| `Permission denied` (Google API 403)        | Service Account 没有 Sheet 编辑权限<br>Service Account lacks Editor access to the Sheet                                   | 在 Google Sheet 中将 `client_email` 加为编辑者<br>Add `client_email` as an Editor in Google Sheet |
| `Team sheet '...' already exists. Skipping` | 分页已存在，不会重复建立<br>Tab already exists, skipping creation                                                               | 正常提示，无需处理<br>Expected behaviour, no action needed                                         |

---

## 重复执行说明 / Re-running the Script

- **Sheet1 会被覆写**：每次执行都会重设 Sheet1 的 header 和描述行\
  **Sheet1 will be overwritten**: each run resets Sheet1's header and description rows
- **自定义分页不会重复建立**：若分页已存在则跳过，不会删除现有数据\
  **Custom tabs are not re-created**: if a tab already exists, it is skipped — existing data is safe
- 建议在**表单上线前**执行，避免覆盖已有的提交数据\
  It is recommended to run this script **before the form goes live** to avoid overwriting existing submissions
