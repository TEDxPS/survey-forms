export const production = {
    name: "导播制作 Production",
    description: "导播制作 Production",
    customData: { sheetName: "Production" },
    visibleIf: "{first_choice} == 'Production'",
    elements: [
        {
            type: "panel",
            name: "production_description_panel",
            elements: [
                {
                    type: "html",
                    name: "production_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Production</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>制作组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>Handles AV production and stage tech support for the annual event, ensuring all multimedia content runs smoothly.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <ul>
                        <li>Equipment Management: Oversee setup of lights, audio, and video systems</li>
                        <li>Content Testing: Test PPTs and videos in advance to ensure smooth playback</li>
                        <li>Show Directing: Manage live directing, switching visuals and effects during the event</li>
                        <li>Technical Support: Provide on-site technical assistance and troubleshoot issues</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Familiarity with stage and multimedia equipment</li>
                        <li>Experience in live production and show directing</li>
                        <li>Strong problem-solving and quick response ability</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>Full standby for 3 days before the event</li>
                        <li>Full on-site support during the event</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">制作组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责年会现场影音制作及舞台技术支持，确保所有多媒体内容顺利呈现，保障活动流程无误。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <ul>
                        <li>设备管理：监督舞台灯光、音响、视频播放等技术设置</li>
                        <li>内容测试：预先测试 PPT 和视频，确保运行流畅</li>
                        <li>导播管理：年会期间负责导播工作，调控画面及特效切换</li>
                        <li>技术支持：现场提供技术支持，解决任何突发设备问题</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>熟悉舞台及多媒体设备操作</li>
                        <li>具备现场演出及导播管理经验</li>
                        <li>快速应变和问题解决能力</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>年会前三天全程待命</li>
                        <li>年会期间全程现场支持</li>
                      </ul>
                    </div>`
                }
            ]
        },
    ]
};