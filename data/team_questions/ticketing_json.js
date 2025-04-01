export const ticketing = {
    name: "票务 Ticketing",
    description: "Ticketing team handles event admission and registration | 票务团队负责事件入场和注册",
    customData: { sheetName: "Ticketing" },
    visibleIf: "{first_choice} == 'Ticketing'",
    elements: [
        {
            type: "panel",
            name: "ticketing_description_panel",
            elements: [
                {
                    type: "html",
                    name: "ticketing_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Ticketing</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>票务组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>In charge of TEDxPS ticketing strategy and system management, ensuring smooth ticket sales and quality attendee service.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Strategy: Develop and implement ticketing strategy (corporate, online sales)</li>
                        <li>Data Management: Track sales, collect attendee info, and improve user experience</li>
                        <li>On-Site Operations: Handle registration, ticket scanning, and crowd control</li>
                        <li>Sponsor Coordination: Manage angel tickets with schools and educational bodies</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Experience in ticketing and marketing</li>
                        <li>Event management and customer service skills</li>
                        <li>Strong data analysis and troubleshooting skills</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Experience improving online ticketing platforms</li>
                        <li>Proficient in Microsoft Excel (Pivot Table, VLOOKUP, Macro VBA Script)</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>3–5 hours/week; full responsibility during event period</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">票务组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责 TEDxPS 票务策略及售票系统管理，确保门票销售顺利进行，并为参会者提供优质服务。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>票务策略：制定并执行售票策略（包括企业票务及线上推广）</li>
                        <li>数据管理：跟进票务销售数据，收集观众信息，优化购票体验</li>
                        <li>现场运营：年会当天负责观众登记、检票及人流疏导</li>
                        <li>赞助协调：协调天使赞助及受惠票务安排，与学校和教育机构保持沟通</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>票务销售及市场推广经验</li>
                        <li>活动管理及现场观众服务能力</li>
                        <li>良好的数据分析与问题解决能力</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>优化线上购票平台经验</li>
                        <li>掌握Microsoft Excel技能 (Pivot Table, VLOOKUP, Macro VBA Script)</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>每周 3-5 小时，年会期间全程负责</li>
                      </ul>
                    </div>`
                }
            ]
        },
        {
            type: "panel",
            name: "ticketing_panel",
            elements: [
                {
                    type: "checkbox",
                    name: "ticketing_ques1",
                    title: "Which type of work are you most confident in or most interested in? | 以下哪一类的工作内容是你最有信心或最感兴趣的？（可多选）",
                    isRequired: true,
                    choices: [
                        {
                          value: "Data Organization",
                          text: "Data organization & analysis, ticketing system optimization (technical & detail-oriented tasks) | 数据整理与分析、优化票务系统（偏技术类、细节处理）"
                        },
                        {
                          value: "Ticketing Strategy",
                          text: "Ticketing strategy, audience allocation, on-site registration process design, external communication (coordination & communication-focused tasks) | 售票策略、观众分配、现场登记流程设计、对外沟通（偏外务与沟通协调）"
                        },
                        {
                            value: "Angel Sponsor",
                            text: "Angel sponsorship liaison (connecting and communicating with sponsors and students) | 天使赞助对接（赞助商与学生的联系与沟通）"
                        }
                    ],
                },
                {
                    type: "comment",
                    name: "ticketing_ques2",
                    title: 'Ticketing plays a crucial behind-the-scenes role in ensuring a smooth ticketing, entry, and audience experience. How do you view this "backstage" role? | 票务工作是确保购票、入场和观众体验顺利进行的关键环节。你怎么看待这种“幕后”的角色？',
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "ticketing_ques3",
                    title: 'What is your MBTI and How do you think your MBTI type would contribute to the ticketing team?| 你的MBTI是什么？你觉得它在票务组会有什么样的发挥？',
                    description: "It's okay if you don't know your MBTI! Feel free to share your characters |（不知道也没关系！可以直接分享你的性格特点）",
                    isRequired: true,
                },
            ]
        }
    ]
};