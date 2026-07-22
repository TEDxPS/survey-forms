# 站点品牌配置 / Site Branding Configuration

## 概述 / Overview

此应用的 Logo、favicon、社群媒体链接、预设 Hero 图片，以及网站标题／描述／关键字等中介数据，皆可透过 MongoDB 中的一个**单例（singleton）文档**进行配置，无需修改代码或重新部署即可套用到不同组织／品牌。\
The app's logo, favicon, social media links, default hero image, and site title/description/keywords metadata can all be configured through a **singleton document** in MongoDB — no code changes or redeploys needed to re-brand the app for a different organization.

**重要：** 这个机制只配置「要使用哪个既有档案／文字」，实际的图片档案（Logo、favicon、社群图示等）仍必须存在于代码库的 `public/` 目录中。此设计刻意不将资产上传至外部储存空间，资产本身仍由 Git 版本控管。\
**Important:** This mechanism only configures *which* existing file/text to use — the actual image files (logo, favicon, social icons) must still exist in the repo's `public/` directory. This is intentional: assets stay version-controlled in Git, not uploaded to external storage.

---

## MongoDB 文档结构 / MongoDB Document Structure

集合名称（collection）为 `siteconfig`，此集合应**只有一个文档**（若有多个，脚本只会读取第一个符合的文档）。若集合中没有任何文档，应用会退回使用代码内建的 TEDxPetalingStreet 默认值（见 `src/libs/siteConfig.ts` 的 `DEFAULT_SITE_CONFIG`）。\
The collection name is `siteconfig`, and it should contain **only one document** (if multiple exist, only the first match is read). If the collection is empty, the app falls back to the built-in TEDxPetalingStreet defaults (see `DEFAULT_SITE_CONFIG` in `src/libs/siteConfig.ts`).

```json
{
  "siteName": "My Org Volunteer Application | Tagline Here",
  "title": "My Org Volunteer Application | Tagline Here",
  "description": "Join us in our journey to make a difference!",
  "keywords": ["MyOrg", "Volunteer", "Community"],
  "domain": "https://forms.myorg.com",
  "logo": "/my-org-logo.png",
  "favicon": "/icons/favicon.ico",
  "defaultHeroImage": "/my-org-hero.jpeg",
  "socialLinks": [
    { "platform": "website", "icon": "/icons/website.svg", "url": "https://www.myorg.com", "label": "Official Site" },
    { "platform": "facebook", "icon": "/icons/facebook.png", "url": "https://www.facebook.com/myorg" },
    { "platform": "instagram", "icon": "/icons/instagram.png", "url": "https://www.instagram.com/myorg/" }
  ],
  "repoUrl": "https://github.com/your-org/your-fork"
}
```

---

## 字段参考 / Field Reference

| 字段<br>Field        | 类型<br>Type       | 说明<br>Description                                                                                     |
|---------------------|--------------------|-----------------------------------------------------------------------------------------------------|
| `siteName`          | `string`           | 应用名称，用于 Open Graph `siteName` 与元数据<br>Application name, used for Open Graph `siteName` and metadata |
| `title`             | `string`           | 预设网页标题；个别表单的 `title` 字段仍可覆盖此值<br>Default page title; an individual form's `title` field still overrides this |
| `description`       | `string`           | 预设网页描述；个别表单的 `description` 字段仍可覆盖此值<br>Default page description; an individual form's `description` field still overrides this |
| `keywords`          | `string[]`         | SEO 关键字列表<br>List of SEO keywords                                                                    |
| `domain`            | `string`           | 网站的 canonical 网域，**不含**结尾斜线，例如 `"https://forms.myorg.com"`<br>Canonical site domain, **no** trailing slash, e.g. `"https://forms.myorg.com"` |
| `logo`              | `string`           | 页首 Logo 的路径，指向 `public/` 内**已存在**的档案，例如 `"/my-org-logo.png"`<br>Path to the header logo, pointing at a file that **already exists** in `public/`, e.g. `"/my-org-logo.png"` |
| `favicon`           | `string`           | Favicon 的路径，指向 `public/` 内已存在的档案<br>Path to the favicon, pointing at a file that already exists in `public/` |
| `defaultHeroImage`  | `string`           | 当表单本身未设置 `heroImage` 时使用的预设 Hero 图片路径<br>Default hero image path used when a form doesn't set its own `heroImage` |
| `socialLinks`       | `SocialLink[]`     | 页首显示的社群媒体链接列表，见下方<br>List of social links shown in the header, see below                              |
| `repoUrl`           | `string`           | 此项目的源码仓库链接，显示于页尾的开源邀请文字，也可作为页首的 GitHub 图示链接<br>This project's source repo URL, shown in the footer's open-source invitation text, and usable as the header's GitHub icon link |

### `socialLinks` 项目结构 / `socialLinks` Item Shape

| 字段<br>Field | 类型<br>Type | 必填<br>Required | 说明<br>Description                                                                                  |
|-------------|------------|----------------|------------------------------------------------------------------------------------------------------|
| `platform`  | `string`   | ✅              | 平台识别名，仅用作 React key 与 `alt` 文字，无特殊逻辑绑定<br>Platform identifier, used only as the React key and `alt` text — carries no special logic |
| `icon`      | `string`   | ✅              | 图示路径，指向 `public/` 内**已存在**的档案（36×36 像素或向量图效果最佳）<br>Icon path, pointing at a file that **already exists** in `public/` (36×36px or vector works best) |
| `url`       | `string`   | ✅              | 点击后导向的链接<br>The link this icon points to                                                          |
| `label`     | `string`   | ❌              | 若设置，会在图示旁显示文字标签，并套用「官网」样式（浅色背景、桌面版显示文字）；省略则套用一般社群图示样式<br>If set, renders a text label next to the icon using the "official site" style (light background, text shown on desktop); omit for the plain social-icon style |

---

## 新增自定义资产 / Adding Custom Assets

若要更换 Logo、favicon 或新增社群图示，**必须先把档案加入代码库**，再于 `siteconfig` 文档中引用其路径：\
To swap the logo, favicon, or add a new social icon, **the file must first be added to the repo**, then referenced by path in the `siteconfig` document:

1. 把新图片档案放入 `public/`（例如 `public/my-org-logo.png`）\
   Place the new image file in `public/` (e.g. `public/my-org-logo.png`)
2. 提交并部署该变更\
   Commit and deploy that change
3. 更新 `siteconfig` 文档中对应的路径字段（例如 `logo: "/my-org-logo.png"`）\
   Update the corresponding path field in the `siteconfig` document (e.g. `logo: "/my-org-logo.png"`)

---

## 与表单层级配置的关系 / Relationship to Form-level Config

`siteconfig` 是**全站层级**（一份部署一份）的配置，与 `forms` collection 中每份表单各自的 `heroImage`、`title`、`description` 是**互补关系而非取代**：表单本身的字段若有设置，会优先于 `siteconfig` 的对应默认值。\
`siteconfig` is a **site-wide** config (one per deployment), complementary to — not a replacement for — each form's own `heroImage`, `title`, and `description` fields in the `forms` collection. A form's own fields, when set, take priority over the corresponding `siteconfig` default.

详见 [docs/populate-google-sheet.md](populate-google-sheet.md) 了解表单层级的 `pages`／`google` 配置。\
See [docs/populate-google-sheet.md](populate-google-sheet.md) for form-level `pages`/`google` configuration.
