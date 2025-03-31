export const speakerCuration = {
    name: "讲者策划 Speaker Curation",
    description: "讲者策划 Speaker Curation",
    customData: { waitTime: 15 },
    visibleIf: "{first_choice} == 'Speaker Curation'",
    elements: [
        {
            type: "panel",
            name: "speaker_curation_description_panel",
            elements: [
                {
                    type: "html",
                    name: "speaker_curation_welcome",
                    html: "Thank you for your interest in joining the “Curation / Speaker” and contributing your talents! | 感谢你想加入 “讲者组” 贡献能力！",
                },
                {
                    type: "html",
                    name: "speaker_curation_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Speaker Curation</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>讲者策划组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>Responsible for identifying and curating potential speakers who embody the TEDx spirit, and supporting content refinement to ensure impactful stage presentations.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Speaker Selection: Identify potential speakers from various fields and design 18-minute talk frameworks</li>
                        <li>Content Optimization: Assist in preparing PPT and visuals to communicate key ideas</li>
                        <li>Speaker Support: Provide support including info collation, scheduling, and rehearsal coaching</li>
                        <li>Cross-Team Coordination: Facilitate communication between speakers and teams like PR, Experience, and Stage</li>
                        <li>Promo Coordination: Join promo shoots and media interview planning</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Content planning and logical structuring ability</li>
                        <li>Excellent communication and interdepartmental coordination skills</li>
                        <li>Strong insight and critical thinking</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Actively follow major topics</li>
                        <li>Reading habit is a plus</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>From April to June, in-person rehearsals will be held biweekly, each lasting approximately 5 to 7 hours. From July to September, in-person rehearsals will be conducted weekly. The preparation work during the early and mid-stages of the annual event is expected to be quite intensive.</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">讲者策划组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责挖掘和筛选符合 TEDx 精神的潜在讲者，协助优化讲者内容，确保演讲在舞台上的最佳呈现。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>讲者筛选：挖掘各领域潜力讲者，设计 18 分钟演讲框架</li>
                        <li>内容优化：协助制作 PPT 及视觉材料，传达讲者核心观点</li>
                        <li>讲者支持：提供全周期讲者支持（资料整合、行程协调、彩排陪练等）</li>
                        <li>跨组沟通：协调讲者与公关、体验、后台等团队之间的沟通</li>
                        <li>宣传配合：参与宣传拍摄及媒体采访安排</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>具备内容策划与逻辑梳理能力</li>
                        <li>优秀的沟通协调及跨部门协作能力</li>
                        <li>敏锐的洞察力和批判性思维</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>关注各大议题</li>
                        <li>有阅读习惯为佳</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>4-6月每两个星期会有一次实体彩排 (彩排约5-7小时），7-9月每星期会有一次实体彩排，年会前期和中期的筹备工作较繁忙</li>
                      </ul>
                    </div>`
                }
            ]
        },
        {
            type: "panel",
            name: "speaker_panel",
            elements: [
                {
                    type: "html",
                    name: "speaker_video",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <h4 style="margin-bottom: 15px;">Please watch the video below and then answer the questions. | 请观看下面的视频，然后回答问题。</h4>
                      <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe 
                          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                          src="https://www.youtube.com/embed/mDHvzDp8Vhs" 
                          title="YouTube video player" 
                          frameborder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </div>
                    </div>`
                },
                {
                    type: "html",
                    name: "proficiency_desc",
                    html: "<div style=\"font-weight:600;\">Now, please put yourself in the <strong>role of the speaker team</strong> and answer the following: | 现在，请你代入<strong>讲者组</strong>的角色，请具体提出他们本次分享中：</div>\n<ul style=\"list-style-type:disc;margin-left:20px;\">\n<li>Please remember that the task of the speaker team is to assist the speakers in conveying their content and ideas. Therefore, please be mindful of your choice of words and tone in order to be respectful of the speakers. | 请记得讲者组的任务是辅助讲者传递内容和想法，因此遣词用字方面也请照顾讲者的情绪。</li>\n</ul>"
                },
                {
                    type: "comment",
                    name: "speaker_ques1",
                    title: "After watching this TEDx talk video, what do you think made the talk so impactful? | 看完这段TEDx演讲视频后，你觉得哪些元素让这场演讲特别有影响力？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "speaker_ques2",
                    title: "And if you were in charge, how would you tweak or improve the content to make it even more exciting for the audience? | 如果是你来负责，你会如何调整或改进内容，让它对观众来说更加精彩？",
                    description: "You can provide suggestions from multiple perspectives, such as the flow of the presentation, text arrangement, quantity of examples, or the accuracy of examples. | 你可以从分享脉络、文本编排、例子多寡或是例子的精准度等多角度提出建议。",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "speaker_ques3",
                    title: "If you could curate a TEDx talk on any topic that really matters to you, what would it be? And why? | 如果你可以策划一场对你个人意义重大的TEDx演讲，主题会是什么？为什么？",
                    isRequired: true,
                },
            ]
        }
    ]
};