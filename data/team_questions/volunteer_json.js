export const volunteer = {
    name: "志工管理 Volunteer Management",
    description: "志工管理 Volunteer Management",
    customData: { waitTime: 15 },
    visibleIf: "{first_choice} = 'Volunteer Management'",
    elements: [
        {
            type: "panel",
            name: "volunteer_description_panel",
            elements: [
                {
                    type: "html",
                    name: "volunteer_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Volunteer Management</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>志工管理组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>The Volunteer Management Team is responsible for recruiting, training, allocating, and managing TEDxPS volunteers to ensure all teams receive sufficient and effective support during the event.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Volunteer Onboarding: Organize orientation sessions, arrange training and briefings to help new volunteers integrate quickly</li>
                        <li>Recruitment Process: Coordinate the volunteer recruitment process (reviewing applications, scheduling interviews, etc.)</li>
                        <li>Database Management: Collect and maintain the volunteer database and update information in a timely manner</li>
                        <li>Resource Coordination: Coordinate volunteer needs across teams to ensure sufficient manpower during the event</li>
                        <li>Event Planning: Plan and execute the volunteer orientation and appreciation party, including venue and F&B coordination</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Experience in HR or volunteer management</li>
                        <li>Strong organizational and coordination skills</li>
                        <li>Excellent communication and cross-functional collaboration skills</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>3–5 hours per week; requires close coordination before the event</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">志工管理组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责 TEDxPS 志工的招募、培训、调配与管理，确保各组在活动期间拥有足够且高效的志工支持。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>志工迎新：组织志工迎新会、安排培训和简报，确保新志工快速融入</li>
                        <li>招募流程：协调志工招募流程（审查筛选报名资料、安排面试等）</li>
                        <li>数据库管理：收集并维护志工数据库，及时更新志工信息</li>
                        <li>协调人力资源：协调各组的志工需求，确保活动期间人力资源充足</li>
                        <li>活动筹划：负责志工迎新、庆功宴的筹划与执行，协调场地和餐饮事宜</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>具备人力资源或志工管理经验</li>
                        <li>良好的组织和协调能力</li>
                        <li>优秀的沟通能力，能跨部门联动</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>每周 3-5 小时，活动前期需密切协调志工安排</li>
                      </ul>
                    </div>`
                },
            ]
        },
        {
          type: "panel",
          name: "volunteer_panel",
          elements: [
            {
              type: "html",
              name: "volunteer_video",
              html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                <h4 style="margin-bottom: 15px;">Please watch the video below and then answer the questions. | 请观看下面的视频，然后回答问题。</h4>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                  <iframe 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                    src="https://www.youtube.com/embed/vtQ5SVdKKfI" 
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
              name: "volunteer_ques1",
              title: "Based on the video attached above, honestly share how this group made you feel. | 从以上的影片中， 请诚实的分享此小组带给您的感受？",
              isRequired: true,
            },
            {
                type: "comment",
                name: "volunteer_ques2",
                title: `Within the Volunteer Management Team, there are 2 main divisions:
【Documentation Team 】
【Activity Team 】
If you were to focus on one of these divisions, where would you prefer to place yourself? Why?

志工管理组内被分划成2大组
【文书组】【活动组】
若要您专注在其中一小组，您会想把自己放在哪里？ 为什么？
                `,
                isRequired: true,
            },
            {
                type: "comment",
                name: "volunteer_ques3",
                title: "If you were a character in the animated movie Nezha 2, who would you be and why? | 您觉得您会是动画片《哪吒2》里的什么角色？为什么？",
                isRequired: true,
            }
          ]
      },
    ]
};