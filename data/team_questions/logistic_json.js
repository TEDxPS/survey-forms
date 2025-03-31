export const logistic = {
    name: "物流 Logistic",
    description: "物流 Logistic",
    customData: { waitTime: 15 },
    visibleIf: "{first_choice} == 'Logistic'",
    elements: [
        {
            type: "panel",
            name: "logistic_description_panel",
            elements: [
                {
                    type: "html",
                    name: "logistic_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Logistics</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>物流组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>Oversees supplies, equipment, and venue logistics to ensure smooth backend operations for TEDxPS events.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">Inventory</h4>
                      <ul>
                        <li>Manage and replenish event stock</li>
                        <li>Update asset list and track inventory changes</li>
                      </ul>

                      <h4 style="color: #ffffff; margin-top: 10px;">Transport</h4>
                      <ul>
                        <li>Collect requests, draft logistics plan</li>
                        <li>Arrange transportation and oversee loading/unloading</li>
                      </ul>

                      <h4 style="color: #ffffff; margin-top: 10px;">Venue Operations</h4>
                      <ul>
                        <li>Plan layout with Floor Team</li>
                        <li>Coordinate venue assets (chairs, barriers, etc.)</li>
                        <li>Parking & Transit: Confirm parking, create guide video, recommend transport options</li>
                      </ul>

                      <h4 style="color: #ffffff; margin-top: 10px;">Sustainability</h4>
                      <ul>
                        <li>Execute waste management plan aligning with ESG & SDGs</li>
                        <li>Collaborate with eco-vendors on sorting and disposal</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Experience in logistics, warehousing, or event backend</li>
                        <li>Resource coordination and emergency response</li>
                        <li>Team collaboration and problem-solving</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Supply chain, transport or ESG experience</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>August & September: One 1-hour meeting per month</li>
                        <li>October: One meeting every two weeks.</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">物流组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责 TEDxPS 物资、设备及场地管理，确保后勤安排顺利进行，为各项活动提供坚实支持。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <h5 style="color: #ffffff; margin-top: 10px;">物资管理</h5>
                      <ul>
                        <li>库存管理：清点设备、补货与维护</li>
                        <li>资产维护：更新资产清单，记录库存变动</li>
                      </ul>

                      <h5 style="color: #ffffff; margin-top: 10px;">运输协调</h5>
                      <ul>
                        <li>运输管理：收集需求，制定物流计划</li>
                        <li>货物调度：安排运输服务，监督装卸流程</li>
                      </ul>

                      <h5 style="color: #ffffff; margin-top: 10px;">场地运营</h5>
                      <ul>
                        <li>场地规划：与 Floor 组合作完成场地图</li>
                        <li>设备需求：协调桌椅、围栏等场地物资</li>
                        <li>交通与停车：确认场地容量、制定替代方案、提供路线影片与公共交通指引</li>
                      </ul>

                      <h5 style="color: #ffffff; margin-top: 10px;">可持续管理</h5>
                      <ul>
                        <li>废弃管理：符合 ESG 与 SDG 的环保执行</li>
                        <li>合作供应商：与环保单位合作垃圾分类与处理</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>后勤、仓储或活动物流经验</li>
                        <li>团队协作与资源调度能力</li>
                        <li>应急与问题处理能力</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>供应链、运输调度或 ESG 经验</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>八月和九月：每月召开一次一小时会议</li>
                        <li>十月：每两周召开一次会议</li>
                      </ul>
                    </div>`
                }
            ]
        }
    ]
};