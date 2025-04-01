export const editorial = {
    name: "文案 Editorial",
    description: "文案 Editorial",
    customData: { sheetName: "Editorial" },
    visibleIf: "{first_choice} = 'Editorial'",
    elements: [
        {
            type: "panel",
            name: "editorial_description_panel",
            elements: [
                {
                    type: "html",
                    name: "editorial_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Editorial</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>文案组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>The Editorial Team is responsible for drafting and proofreading various types of written content for TEDxPetalingStreet, including selected social media materials, speaker bios, and publication content, ensuring the information is accurate, engaging, and consistent with the TEDxPetalingStreet brand tone.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Content Writing: Write and proofread various promotional materials for TEDxPetalingStreet (e.g., social media posts, posters, teasers, YouTube, merchandise, countdowns, etc.)</li>
                        <li>Speaker Bio: Draft speaker bios and booklet content for the annual event</li>
                        <li>Content Optimization: Attend speaker rehearsals and extract key highlights for real-time updates on-site and online</li>
                        <li>Cross-Team Collaboration: Work closely with the Visual Team to coordinate content for various event needs</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Excellent writing and editing skills</li>
                        <li>Attention to detail and patience to ensure content accuracy</li>
                        <li>Strong cross-functional communication and collaboration skills</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Experience in SEO or brand marketing</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>3–5 hours per week; heavier workload during the pre-event period</li>
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
            name: "editorial_panel",
            elements: [
              {
                type: "html",
                name: "editorial_video",
                html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                  <h4 style="margin-bottom: 15px;">Please watch the video below and then answer the questions. | 请观看下面的视频，然后回答问题。</h4>
                  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                    <iframe 
                      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                      src="https://www.youtube.com/embed/NQaPItGXAmk" 
                      title="YouTube video player" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
                    </iframe>
                  </div>
                </div>`
              },
              {
                type: "comment",
                name: "editorial_ques1",
                title: "If you were to write a promotional post based on the interview above for social media platforms (e.g., Facebook, Xiaohongshu), how would you write it? | 如果需要您从以上的采访中，写出一篇推广文，用在社交媒体平台(FB, XHS)。请问您会如何写？",
                isRequired: true,
              },
              {
                  type: "comment",
                  name: "editorial_ques2",
                  title: "Please translate your answer to the question above in Chinese. | 请用英文翻译以上问题您所填写的答案。",
                  isRequired: true,
              },
              {
                  type: "comment",
                  name: "editorial_ques3",
                  title: "What do you think needs to be improved for TEDxPetalingStreet's previous copywriting on social media? | 请问您觉得往年TEDxPetalingStreet在社交媒体里所发布的文案有什么需要改善？",
                  isRequired: true,
              }
            ]
        },
    ]
};