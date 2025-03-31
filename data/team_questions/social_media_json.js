export const socialMedia = {
    name: "社交媒体 Social Media Team",
    description: "Social Media team manages online presence | 社交媒体队负责管理线上平台",
    visibleIf: "{first_choice} == 'Social Media'",
    elements: [
        {
            type: "panel",
            name: "social_media_description_panel",
            elements: [
                {
                    type: "html",
                    name: "social_media_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Social Media</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>社交媒体组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>The Social Media Team is responsible for managing TEDxPS's social media platforms and publishing content to enhance brand influence and increase online engagement, particularly among the 20–35 age group.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Social Media Strategy: Develop and execute strategies ensuring content aligns with TEDx values and suits each platform</li>
                        <li>Content Creation: Produce, write, publish, and manage content across platforms (including short videos, visual posts, etc.)</li>
                        <li>Community Engagement: Respond quickly to interactions and increase user participation</li>
                        <li>Data Analysis: Analyze social media data and adjust strategies accordingly</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Familiarity with major platforms (FB, IG, LinkedIn, Xiaohongshu, Threads etc.)</li>
                        <li>Content creation skills (copywriting, video editing, image layout, etc.)</li>
                        <li>Community management and data analysis skills</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>5–7 hours per week; real-time updates required during the event</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">社交媒体组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责 TEDxPS 社交媒体平台的整体运营与内容发布，提升品牌影响力并增加线上互动，特别针对 20-35 岁目标群体。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>社交媒体策略：制定并执行社交媒体策略，确保内容符合 TEDx 精神并适应各平台特点</li>
                        <li>内容制作：生产、撰写、发布并管理各平台内容（包括短视频、图文等）</li>
                        <li>社群互动：快速响应平台互动，提升用户参与度</li>
                        <li>数据分析：分析社交媒体数据，调整优化策略</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>熟悉各大社交媒体平台（FB、IG、LinkedIn、小红书、Threads等）</li>
                        <li>内容创作能力（文案撰写、视频剪辑、图片排版等）</li>
                        <li>社群管理及数据分析能力</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>每周 5-7 小时，年会期间需现场即时更新</li>
                      </ul>
                    </div>`
                }
            ]
        },
        {
            type: "panel",
            name: "social_media_panel",
            elements: [
                {
                    type: "comment",
                    name: "social_media_ques1",
                    title: "Please provide the social media accounts you manage (e.g., Facebook, Instagram, Xiaohongshu). How do you plan your content and improve engagement? | 请提供你运营的社交媒体账号（如 Facebook、Instagram、小红书等）。",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "social_media_ques2",
                    title: "Briefly describe your content strategy, interaction methods, and ways to increase audience engagement. | 你是如何规划内容并提升互动率的？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "social_media_ques3",
                    title: `If you were to create a 30-second short video for TEDxPetalingStreet, how would you conceptualize the content? Please outline your process (including script, filming, editing, subtitles, etc.). | 如果让你为 TEDxPetalingStreet 制作一支 30 秒的短视频，你会如何构思内容？

请简单描述你的流程（包含脚本、拍摄、剪辑、字幕等）。`,
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "social_media_ques4",
                    title: `How do you plan your content pillars for Xiaohongshu?

When writing a post, how do you design the cover, title, and content structure to maximize exposure and engagement?

你如何规划小红书的内容方向（Content Pillar）？

在撰写笔记时，你会如何设计封面、标题和内容结构，以提高曝光和互动？`,
                    isRequired: true,
                },
            ]
        }
    ]
};