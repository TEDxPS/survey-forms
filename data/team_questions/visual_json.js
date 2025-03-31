export const visual = {
    name: "主视觉 - 平面/ 动画设计 Visual - Graphic/ Animation Design",
    description: "主视觉 - 平面/ 动画设计 Visual - Graphic/ Animation Design",
    customData: { waitTime: 15 },
    visibleIf: "{first_choice} == 'Visual'",
    elements: [
        {
            type: "panel",
            name: "visual_description_panel",
            elements: [
                {
                    type: "html",
                    name: "visual_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Visual</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>视觉组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>The Visual Team is responsible for the overall visual design of TEDxPS events, including creating the key visual identity and applying it across all materials to ensure a unified and appealing brand presence.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Key Visual Design: Create and define the main visual concept and design guidelines for the event</li>
                        <li>Visual Materials Production: Design event-related materials such as posters, backdrops, booklets, short videos, and other promotional content</li>
                        <li>Cross-Team Collaboration: Coordinate with all teams to ensure visuals match the overall event style</li>
                        <li>Design Support: Provide design support for departments like Editorial, Social Media, Ticketing, etc.</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Proficient in design software such as Photoshop, Illustrator, After Effects</li>
                        <li>Solid experience in graphic design and visual communication</li>
                        <li>Creativity and ability to collaborate across departments</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Background in animation design, UI/UX, or interior design</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>5–7 hours per week; design work is intensive during the pre-event period</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">视觉组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责 TEDxPS 活动的整体视觉设计，包括关键视觉形象的创作及其在各类物料中的应用，确保品牌形象统一、吸引人。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>主视觉设计：创建并制定活动主视觉概念与设计指南</li>
                        <li>视觉物料制作：设计活动相关物料，如海报、展板、会刊、短视频及其他宣传品</li>
                        <li>跨组协作：协调各团队需求，确保视觉输出与活动整体风格一致</li>
                        <li>设计支持：与各部门（如文案、社交媒体、票务等）协同合作，提供设计支持</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>熟练使用 Photoshop、Illustrator、After Effects 等设计软件</li>
                        <li>扎实的平面设计、视觉传达经验</li>
                        <li>创新及跨部门沟通协作能力</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>动画设计、UI/UX 或室内设计背景</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>每周 5-7 小时，年会前期设计任务繁重</li>
                      </ul>
                    </div>`
                }
            ]
        },
        {
            type: "panel",
            name: "visual_panel",
            elements: [
                {
                    type: "comment",
                    name: "visual_ques1",
                    title: "What software do you use for graphic design? Are you familiar with operating Adobe Illustrator (AI), Adobe InDesign, Adobe Photoshop (PS), Adobe After Effects (AE), and Adobe Animate (AN)? | 你是用什么软件画图？是否懂得操作 Adobe Illustrator (AI), Adobe InDesign, Adobe Photoshop (PS), Adobe After Effects (AE), and Adobe Animate (AN)?",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "visual_ques2",
                    title: "How proficient are you with the above software? Please rate your familiarity on a scale of 1 to 10, with 10 being the highest. | 对于以上软件的⁠熟悉程度是多少？请以 10分为满分的标准列出。",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "visual_ques3",
                    title: "Please provide some of your design portfolios for assessment purposes. | 请提供一些您的design portfolio以作为考核之用。",
                    isRequired: true,
                },
                {
                    type: "radiogroup",
                    name: "visual_ques4",
                    title: "Have you previously worked with animation production? | 之前有接触过动画制作吗？",
                    isRequired: true,
                    choices: [
                        {
                          value: "Has animation experience",
                          text: "Yes | 有"
                        },
                        {
                          value: "No animation experience",
                          text: "No | 无"
                        }
                    ],
                },
                {
                    type: "comment",
                    name: "visual_ques5",
                    title: "Have you previously worked on social media post design and layout design? | 有接触过social media post设计及排版设计吗？",
                    isRequired: true,
                    choices: [
                        {
                          value: "Has social media post experience",
                          text: "Yes | 有"
                        },
                        {
                          value: "No social media post experience",
                          text: "No | 无"
                        }
                    ],
                },
                {
                    type: "comment",
                    name: "visual_ques6",
                    title: "What aspects of design do you usually engage with the most (eg: branding design, print layout design, web/UIUX design, packaging design, idea conceptualization, social media design, poster design)? | 通常您在做设计时，接触比较多哪方面的设计（例如：品牌设计，印刷排版设计，网页/uiux设计，包装设计，idea thinking构思，社交媒体设计，海报设计）？",
                    isRequired: true,
                },
            ]
        }
    ]
};