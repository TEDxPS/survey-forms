export const stageManagement = {
    name: "后台管理 Stage Management",
    description: "后台管理 Stage Management",
    customData: { waitTime: 15 },
    visibleIf: "{first_choice} == 'Stage Management'",
    elements: [
        {
            type: "panel",
            name: "stage_management_description_panel",
            elements: [
                {
                    type: "html",
                    name: "stage_management_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Stage Management</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>舞台管理组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>Oversees stage operations for the annual event, coordinating speakers, emcees, and backstage teams to ensure a smooth program flow.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Flow Planning: Design event rundown and coordinate execution</li>
                        <li>Speaker Rehearsals: Organize speaker rehearsals and equipment checks</li>
                        <li>Stage Setup: Supervise stage setup, ensuring lighting, sound, and visuals function properly</li>
                        <li>On-Site Command: Direct on-stage and backstage activities during the event</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Experience in event/stage management</li>
                        <li>Familiar with lighting, audio, and multimedia tech</li>
                        <li>Strong organizational and coordination abilities</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Preferred Qualifications</h3>
                      <ul>
                        <li>Experience in managing large-scale stage events or performances</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>Full standby during 3 days before the event</li>
                        <li>Full on-site coordination during the event</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">舞台管理组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责年会舞台整体运作，协调讲者、主持人与后台各组之间的配合，确保演讲流程顺畅有序。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>流程制定：制定年会演讲流程并协调各环节的执行</li>
                        <li>讲者排练：组织讲者排练及设备调试，确保演讲体验最佳</li>
                        <li>舞台搭建：监督舞台搭建，确保灯光、音响和布景正常运行</li>
                        <li>现场指挥：年会当天负责现场指挥，协调后台与导播等团队</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>活动舞台管理经验</li>
                        <li>熟悉灯光、音响及多媒体技术</li>
                        <li>优秀的团队统筹与协调能力</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">加分项</h4>
                      <ul>
                        <li>大型活动舞台管理或演出协调经验</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>年会前三天全程待命</li>
                        <li>年会期间全程现场协调</li>
                      </ul>
                    </div>`
                }
            ]
        },
    ]
};