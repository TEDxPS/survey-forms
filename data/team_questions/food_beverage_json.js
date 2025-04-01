export const foodBeverage = {
    name: "餐饮 Food & Beverage",
    description: "餐饮 Food & Beverage",
    customData: { sheetName: "Food & Beverage" },
    visibleIf: "{first_choice} = 'Food & Beverage'",
    elements: [
        {
            type: "panel",
            name: "food_beverage_description_panel",
            elements: [
                {
                    type: "html",
                    name: "food_beverage_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Food & Beverage</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>餐饮组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>In charge of F&B arrangements and sponsorship for TEDxPS events, ensuring smooth delivery and quality control of on-site food services.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Sponsorship Management: Maintain relations with current F&B sponsors and seek new opportunities</li>
                        <li>Business Liaison: Contact sponsors via email/WhatsApp or in person to present proposals and negotiate details</li>
                        <li>Site Coordination: Conduct venue inspections to confirm layout and facility needs</li>
                        <li>Execution: Oversee food arrival, distribution, and coordination on event day</li>
                        <li>Sponsor Follow-up: Send thank-you notes and share photos/videos for exposure</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Experience in F&B management and supply chain coordination</li>
                        <li>Excellent communication and coordination across stakeholders</li>
                        <li>Strong attention to detail for smooth execution</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Background in food safety management</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>2-3 hours/week; pre-event phase is busy</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">餐饮组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责 TEDxPS 年会及相关活动的餐饮安排和赞助洽谈，确保现场食品供应与品质管控到位。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>赞助管理：年会前维护与现有餐饮赞助商的关系，寻找新赞助机会</li>
                        <li>商务沟通：通过邮件、WhatsApp 或线下会面，提交餐饮合作计划书并商讨赞助细节</li>
                        <li>场地协调：负责场地勘察，确认布局及设施位置，为活动筹备提供依据</li>
                        <li>餐饮执行：年会当天跟进餐饮品项的到场、分配及现场协调</li>
                        <li>合作反馈：活动结束后，发送感谢信件并分享活动照片、视频等赞助曝光内容</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>餐饮管理及供应链协调经验</li>
                        <li>优秀的沟通与协调能力，能与多方对接</li>
                        <li>注重细节，确保现场执行顺畅</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>食品安全管理经验</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>每周 2-3 小时，年会前期工作较繁忙</li>
                      </ul>
                    </div>`
                }
            ]
        },
    ]
};