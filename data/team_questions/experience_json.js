export const experience = {
    name: "体验 - 参展单位/ 周边商品/ 㐀势活动 Experience - Pop Up/ Merchandize/ Adventure/",
    description: "体验 - 参展单位/ 周边商品/ 㐀势活动 Experience - Pop Up/ Merchandize/ Adventure/",
    customData: { waitTime: 15 },
    visibleIf: "{first_choice} = 'Experience'",
    elements: [
        {
            type: "panel",
            name: "experience_description_panel",
            elements: [
                {
                    type: "html",
                    name: "experience_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Experience</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>体验组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>Plans and executes thematic experience activities throughout the year and on event day, including monthly Adventure events, to boost engagement and create immersive audience experiences.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">1. Adventure 2025</h4>
                      <ul>
                        <li>Event Execution: Organize diverse monthly events aligned with TEDxPS values</li>
                        <li>Site Visit: Define flow and ensure smooth experience</li>
                        <li>Manpower: Coordinate volunteer needs with the Volunteer Team</li>
                        <li>Feedback & Optimization: Collect responses and improve future sessions</li>
                        <li>Salon Management: Design immersive salon sessions for event day</li>
                      </ul>

                      <h4 style="color: #ffffff; margin-top: 10px;">2. Event Day Experience 2025</h4>
                      <ul>
                        <li>Experience Design: Plan exhibitions, installations, and partnerships aligned with theme</li>
                        <li>Space Management: Create floor plans and optimize flow</li>
                        <li>Booth Coordination: Align with Partner and Speaker Teams</li>
                        <li>Interaction: Supervise setup and enhance engagement</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Experience in event planning and execution, capable of running Adventures independently</li>
                        <li>Cross-team collaboration and communication skills</li>
                        <li>Creative thinking to design interactive experiences</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Experience in immersive or exhibition design</li>
                        <li>Experience with KOL campaigns, brand partnerships, or community building</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>5–7 hours/week; host at least 1 Adventure/month; intensive around event period</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">体验组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责根据年会主题策划并执行各类体验活动，包括每个月一场的 Adventure 活动，以及年会当天的场外体验活动，以提升现场互动和品牌体验，创造沉浸式观众体验。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <h5 style="color: #ffffff; margin-top: 10px;">1. Adventure 活动 2025</h5>
                      <ul>
                        <li>活动执行：每月组织 Adventure 活动，确保活动形式多样，符合 TEDxPS 价值观</li>
                        <li>实地考察：制定 Adventure 活动流程，确保活动体验流畅</li>
                        <li>人力协调：与志工管理组协调人力需求</li>
                        <li>活动反馈：收集反馈，优化未来活动方案</li>
                        <li>沙龙管理：策划并执行年会当天的沉浸式沙龙项目</li>
                      </ul>

                      <h5 style="color: #ffffff; margin-top: 10px;">2. 年会场外体验 2025</h5>
                      <ul>
                        <li>体验策划：围绕主题策划展览、互动装置、品牌合作等</li>
                        <li>场地管理：制定展区图、优化观众动线</li>
                        <li>展位协调：与合作伙伴组、讲者组协调展位细节</li>
                        <li>互动优化：监督现场布置、提升互动体验</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>活动策划与执行经验，能够独立运营 Adventure 活动</li>
                        <li>团队协作及跨部门沟通能力</li>
                        <li>具有创新思维，能策划互动性强的体验内容</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>沉浸式体验或展览策划经验</li>
                        <li>有 KOL 活动、品牌合作、社区运营经验</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>每周 5-7 小时，每月举办至少一场 Adventure，年会期任务重</li>
                      </ul>
                    </div>`
                }
            ]
        },
        {
            type: "panel",
            name: "experience_panel",
            elements: [
                {
                    type: "comment",
                    name: "experience_ques1",
                    title: "Why are you applying to join the Experience team? What personal goals or areas of development do you hope to achieve here? | 你为何申请加入 Experience 组？你希望在这里实现哪些个人目标或发展方向？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "experience_ques2",
                    title: "Have you ever faced a difficult choice in your past work experience or personal life that was guided by a core value you strongly uphold? Please share your story. | 在你过往的工作经历或个人生活中，有没有一个时刻你做出了艰难的选择，并且是基于你坚守的某个核心价值观？请分享.",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "experience_ques3",
                    title: "Think of a project you have led or participated in. What challenges did you encounter, and how did you guide the team to overcome them and achieve the desired outcome? | 你曾经领导或参与过的一个项目，面对了哪些挑战？你是如何带领团队克服这些挑战，并最终实现预期目标的？",
                    isRequired: true,
                },
            ]
        }
    ]
};