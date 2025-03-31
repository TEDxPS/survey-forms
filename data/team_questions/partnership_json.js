export const partnership = {
    name: "合作伙伴 - 金钱与商品 Partnership - Monetary & In-Kind",
    description: "合作伙伴 - 金钱与商品 Partnership - Monetary & In-Kind",
    customData: { waitTime: 15 },
    visibleIf: "{first_choice} = 'Partnership'",
    elements: [
        {
            type: "panel",
            name: "partnership_description_panel",
            elements: [
                {
                    type: "html",
                    name: "partnership_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Partnership</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>合作伙伴组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>Responsible for identifying and maintaining partnerships with TEDxPS sponsors, including monetary and in-kind support, to ensure sufficient resources for the event.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Business Development: Seek and negotiate with potential sponsors and partners, building long-term relationships</li>
                        <li>Proposal & Planning: Prepare sponsorship proposals and meet sponsors in person to finalize details</li>
                        <li>Sponsor Hospitality: Welcome and assist sponsors on event day to ensure a positive experience</li>
                        <li>Brand Exposure Follow-up: Provide post-event brand exposure reports and feedback</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Experience in business negotiation and marketing</li>
                        <li>Strong brand partnership and relationship management</li>
                        <li>Excellent communication and networking skills</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Experience with large-scale event sponsorship development</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>3–5 hours per week; the 3 months leading up to the annual event will be busier to achieve KPIs.</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">合作伙伴组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责寻找与维护 TEDxPS 赞助商及合作伙伴关系，包括金钱与物资赞助，确保活动资源充足。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>商务拓展：寻找并洽谈潜在赞助商与合作伙伴，建立长期合作关系</li>
                        <li>合作策划：准备赞助计划书，并与赞助商线下会面商讨细节</li>
                        <li>赞助管理：年会当天负责接待赞助商，解答疑问，确保良好体验</li>
                        <li>品牌曝光：会后跟进赞助商品牌曝光数据及反馈</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>商务谈判及市场推广经验</li>
                        <li>优秀的品牌合作与关系管理能力</li>
                        <li>良好的沟通与人脉拓展能力</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>大型活动赞助拓展经验</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>每周 3-5 小时，年会前3个月较忙，要完成目标</li>
                      </ul>
                    </div>`
                }
            ]
        },
        {
            type: "panel",
            name: "partnership_panel",
            elements: [
                {
                    type: "comment",
                    name: "partnership_ques1",
                    title: "What is effective communication? | 什么是有效沟通？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "partnership_ques2",
                    title: "What is the essence of collaboration and division of work? | 合作分工的精髓是什么？",
                    isRequired: true,
                },
                {
                    type: "radiogroup",
                    name: "partnership_ques3",
                    title: "In a team collaboration process, which of the following would you prioritize？ | 在团队一起合作的过程，以下那一项会是你优先做 ？ ",
                    isRequired: true,
                    choices: [
                        {
                            value: "Urgent and important",
                            text: "Urgent and important | 紧急且重要"
                          },
                          {
                            value: "Not urgent, but important",
                            text: "Not urgent, but important | 不紧急但重要"
                          },
                          {
                              value: "Urgent but not important",
                              text: "Urgent but not important | 紧急但不重要"
                          },
                          {
                            value: "Not urgent and not important",
                            text: "Not urgent and not important | 不紧急也不重要"
                        }
                    ]
                },
                {
                    type: "comment",
                    name: "partnership_ques4",
                    title: "Please explain the reason of your choice to the question above. | 依据您在以上的选择说出原因",
                    isRequired: true,
                },
            ]
        }
    ]
};