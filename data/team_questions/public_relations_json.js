export const publicRelations = {
    name: "公共关系 Public Relations",
    description: "公共关系 Public Relations",
    customData: { sheetName: "Public Relations" },
    visibleIf: "{first_choice} == 'Public Relations'",
    elements: [
        {
            type: "panel",
            name: "public_relations_description_panel",
            elements: [
                {
                    type: "html",
                    name: "public_relations_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Public Relations</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>公关组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>Responsible for building relationships with media, communities, and external partners. Plans press conferences and promotional campaigns to enhance TEDxPS brand visibility.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Press Conference: Plan and execute the annual press event, highlight key updates</li>
                        <li>Media Relations: Build and maintain ties with media, KOLs, and communities</li>
                        <li>Promo Strategy: Coordinate with internal teams to create promotional campaigns</li>
                        <li>Press Materials: Draft press releases and manage media interviews</li>
                        <li>KOL Outreach: Develop and execute KOL collaboration strategies</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Experience in media PR and press writing</li>
                        <li>Strong cross-team communication and coordination</li>
                        <li>Strong project management and execution skills</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Experience planning media and PR campaigns</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>3-5 hours/week; workload heavier before the event</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">公关组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责与媒体、社群及外部合作伙伴建立良好关系，策划新闻发布会及各类宣传活动，提升 TEDxPS 品牌影响力。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>新闻发布会：策划并执行年度新闻发布会，发布年会动态及亮点</li>
                        <li>媒体合作：建立和维护与媒体、KOL及社群的合作关系</li>
                        <li>宣传策划：协调内部活动，与讲者、体验等团队合作策划宣传活动</li>
                        <li>新闻稿件：草拟新闻稿，管理媒体采访及相关沟通</li>
                        <li>KOL 合作：制定并推进 KOL 合作策略，拓宽品牌曝光</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>媒体公关及新闻稿撰写经验</li>
                        <li>优秀的跨团队沟通与协调能力</li>
                        <li>强烈的项目管理及执行能力</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>具备丰富的媒体及公关活动策划经验</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>每周 3-5 小时，年会前期工作较多</li>
                      </ul>
                    </div>`
                }
            ]
        },
        {
            type: "panel",
            name: "public_relations_panel",
            elements: [
                {
                    type: "comment",
                    name: "public_relations_ques1",
                    title: "Do you have any writing experience (articles/captions/blogs etc)? If yes, feel free to share us as a reference. If no, would you be keen to write?  | 您是否有过文字写作经验（文章/文案/博客等）？如果有，您可以分享给我们参考。如果没有，您对文字写作有兴趣吗？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "public_relations_ques2",
                    title: "Kindly list down 3 of your most favourite Malaysian online media/ self-media (Chinese or English is fine). Why they are your favourite media? | 请列出您最喜欢的3家马来西亚在线媒体/ 自媒体（中文或英文都行)。为什么它们是您最喜欢的媒体？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "public_relations_ques3",
                    title: "What animal is your personality most similar to? Why? | 您的个性最像什么动物？为什么？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "public_relations_ques4",
                    title: "How would you promote TEDxPetalingStreet as a brand to the mass media? | 如果现在要把TEDxPetalingStreet品牌做媒体推广， 你会怎么做？",
                    isRequired: true,
                },
            ]
        }
    ]
};