export const infoTech = {
    name: "资讯科技 Information Technology",
    description: "资讯科技 Information Technology",
    customData: { sheetName: "Information Technology" },
    visibleIf: "{first_choice} = 'Information Technology'",
    elements: [
        {
            type: "panel",
            name: "info_tech_description_panel",
            elements: [
                {
                    type: "html",
                    name: "info_tech_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Information Technology</strong> team. Please read the job scope carefully. | 您选择了<strong>资讯科技组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <h3 style="color: #ffffff;">Overview</h3>
                      <p>The IT Team is responsible for TEDxPS's official website, server maintenance, and related technical support, ensuring smooth operations of online platforms and on-site IT systems.</p>
                      
                      <h3 style="color: #ffffff;">Key Responsibilities</h3>
                      <ul>
                        <li>Website Maintenance: Maintain TEDxPS's official and annual event websites</li>
                        <li>Tech Support: Handle ad hoc technical requests from various teams and provide IT assistance</li>
                        <li>System Administration: Monitor server status during the event and resolve any technical issues on-site</li>
                        <li>Automation Development: Assist in developing AI tools to automate workflows for different teams</li>
                      </ul>
                
                      <h3 style="color: #ffffff;">Required Skills</h3>
                      <ul>
                        <li>Familiar with HTML, CSS, JavaScript</li>
                        <li>Capable of server administration and troubleshooting technical issues</li>
                        <li>Experience in AI programming or automation design is a plus</li>
                      </ul>
                
                      <h3 style="color: #ffffff;">Time Commitment</h3>
                      <ul>
                        <li>3–5 hours per week; must be on standby during the conference</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">资讯科技组</h3>
                      <h4 style="color: #ffffff;">职位概述</h4>
                      <p>负责 TEDxPS 官方网站、服务器及相关技术支持，确保线上平台和活动现场 IT 系统稳定高效运行。</p>
                
                      <h4 style="color: #ffffff;">主要职责</h4>
                      <ul>
                        <li>网站维护：维护 TEDxPS 官方网站及年会主题网站</li>
                        <li>技术支持：处理各组 ad hoc 的技术请求，并提供 IT 支持</li>
                        <li>系统管理：监控年会期间服务器状态，解决现场技术问题</li>
                        <li>自动化开发：协助开发 AI 自动化工具，提升各组工作流程</li>
                      </ul>
                
                      <h4 style="color: #ffffff;">所需技能</h4>
                      <ul>
                        <li>熟悉 HTML、CSS、JavaScript</li>
                        <li>具备服务器管理及技术故障排查能力</li>
                        <li>有一定的 AI 编程或自动化方案设计经验优先</li>
                      </ul>
                
                      <h4 style="color: #ffffff;">期望投入时间</h4>
                      <ul>
                        <li>每周 3-5 小时，年会期间需随时待命</li>
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
                    name: "info_tech_ques1",
                    title: "What programming languages, tools, or technologies are you familiar with (if any)? | 你熟悉哪些程式语言、工具或技术？（如果有的话）",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "info_tech_ques2",
                    title: "Do you have any personal or school projects you’ve worked on? Feel free to describe them or share links if you have any. | 你有没有做过一些个人项目或学校作业？可以简单介绍，若有链接也欢迎分享。",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "info_tech_ques3",
                    title: "Suppose we need to send a thank-you email to every volunteer who attended our annual event. How would you prepare and manage this task, step by step? | 假设我们需要给所有出席年度活动的志工发送感谢电邮，你会如何一步步准备和处理这个任务？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "info_tech_ques4",
                    title: "Suppose you’re given a list of all TEDxPetalingStreet volunteers. We need to find those who are available next weekend, can speak Mandarin, and live within 10km of the venue. How would you get this result? | 假设你拿到一份所有 TEDxPetalingStreet 志工的名单，我们需要找出那些“下周末有空、会说华语、住在会场 10 公里内”的志工。你会怎么筛选出这群人？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "info_tech_ques5",
                    title: "Suppose we have a system for TEDxPetalingStreet Adventure, which includes registration form, confirmation email, and printing list. However, during the event, some volunteers didn’t receive their pre-registered meals. How would you check where things went wrong? | 假设我们有一个 TEDxPetalingStreet Adventure 的系统，包括报名表、确认电邮和打印名单。但在活动当天，有些志工没拿到预定的便当。你会如何检查问题出在哪里？",
                    isRequired: true,
                },
            ]
        }
    ]
};