export const floorAndHall = {
    name: "外场 & 内场管理 Hall & Floor Management",
    description: "外场 & 内场管理 Hall & Floor Management",
    customData: { waitTime: 15 },
    visibleIf: "{first_choice} = 'Hall & Floor'",
    elements: [
        {
            type: "panel",
            name: "floor_and_hall_description_panel",
            elements: [
                {
                    type: "html",
                    name: "floor_and_hall_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Floor & Hall</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>外场 & 内场管理</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>Manages event space and audience movement to ensure a smooth, safe, and welcoming on-site experience.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Venue Mapping: Draw detailed 2D/3D maps with key zones</li>
                        <li>Volunteer Training: Conduct walkthroughs and briefings</li>
                        <li>Route Planning: Design queueing and dining flow</li>
                        <li>On-Site Management:</li>
                        <ul style="margin-left: 20px;">
                          <li>Guide seating and provide information</li>
                          <li>Control crowd flow for safety</li>
                          <li>Handle emergencies with security support</li>
                        </ul>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Experience in large event or crowd management</li>
                        <li>Strong coordination and crisis handling</li>
                        <li>Intuitive spatial planning</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Experience drawing floor plans</li>
                        <li>Background in service or event industry</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>1-2 hours/week; will need to attend recce two months before event day. Full responsibility on event day.</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">场地组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责 TEDxPS 现场观众及场地管理，确保会场布局合理、流动顺畅，并提供优质现场服务。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>场地规划：绘制 2D/3D 场地图，标注关键区域</li>
                        <li>志工培训：进行场地勘察与岗位培训</li>
                        <li>路线规划：优化排队及动线，避免拥堵</li>
                        <li>现场管理：</li>
                        <ul style="margin-left: 20px;">
                          <li>引导观众入座，提供资讯</li>
                          <li>控制人流，确保安全</li>
                          <li>应急协调，与保安配合处理突发事件</li>
                        </ul>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>大型活动现场或人流管理经验</li>
                        <li>沟通协调与应急处理能力</li>
                        <li>对空间与动线规划有直觉</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>有 2D/3D 场地图绘制经验</li>
                        <li>服务业或活动管理经验</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>每周 1-2小时，年会两个月前会需要出席场地考察，年会当天全程负责</li>
                      </ul>
                    </div>`
                }
            ]
        },
        {
          type: "panel",
          name: "floor_and_hall_panel",
          elements: [
            {
              type: "comment",
              name: "floor_and_hall_ques1",
              title: `At the start of the annual event, you notice a major oversight in crowd control and report it to your team leader. After a meeting with the team, your leader proposes a solution to be implemented in the second half of the event. 
  
  However, based on your observations, you believe the solution has minor flaws. Your team leader adjourns the meeting immediately after giving the implementation instructions. 
  
  With 30 minutes left before the second half begins, what actions would you take?  
  
  年会当天，你在巡场的途中发现三楼的偏僻角落着火了。火警不知为何并没有运作，火势也已经蔓延到你无法控制的程度，你也联络不上楼层的负责人和你的组长。
  
  在此情况下，请写下你的 4 个主要应对步骤以及原因。  
  `,
              isRequired: true,
          },
          {
              type: "comment",
              name: "floor_and_hall_ques2",
              title: `As a member of the venue management team, one of the most crucial and complex tasks is coordinating with the catering team on the food distribution plan for the event day.
  
   Today is Friday, and you have an in-person meeting with them next Thursday. The food distribution plan must be finalized by the following Thursday. 
  
  Please outline your coordination timeline with the catering team and specify the key discussion points.  
  
  身为场务管理组的一员，其中最重要的和复杂的任务是和餐饮组协调当天的食物派发方式。
  
  今天是星期五，你会在下个星期四和他们有实体会议，食物派送方式需要在后个星期四之前确定。
  
  请写下你和餐饮组协调的时间线和协调内容。  
  `,
              isRequired: true,
          },
          {
              type: "comment",
              name: "floor_and_hall_ques3",
              title: `At the start of the annual event, you notice a major oversight in crowd control and report it to your team leader. After a meeting with the team, your leader proposes a solution to be implemented in the second half of the event. 
  
  However, based on your observations, you believe the solution has minor flaws. Your team leader adjourns the meeting immediately after giving the implementation instructions. 
  
  With 30 minutes left before the second half begins, what actions would you take?  
  
  年会刚开始，你发现人流控管方面有重大疏失，并禀报了你的组长。组长在和所有人开会后提出了应对方案，并要在年会下半场实施。
  
  根据你的观察，你认为此方法有一些小瑕疵，但你的组长交代了实施方式后就解散会议了。
  
  距离下半场开始还有 30 分钟，你会怎么做？    
  `,
              isRequired: true,
          },
          ]
        }
    ]
};