export const videoPhoto = {
    name: "摄影 & 影片摄录 Video & Photo",
    description: "摄影 & 影片摄录 Video & Photo",
    customData: { waitTime: 15 },
    visibleIf: "{first_choice} == 'Video & Photo'",
    elements: [
        {
            type: "panel",
            name: "video_photo_description_panel",
            elements: [
                {
                    type: "html",
                    name: "video_photo_description",
                    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                      <p>You have chosen <strong>Video & Photo</strong> team. Please read the job scope carefully.</p>
                      <p>您选择了<strong>视频与摄影组</strong>。请仔细阅读以下的小组责任范畴。</p>
                      <br />
                      <h3 style="color: #ffffff; margin-top: 10px;">Overview</h3>
                      <p>Responsible for filming, editing, and photography for TEDxPS events, capturing key moments and creating high-quality visuals for promotion.</p>
                      
                      <h3 style="color: #ffffff; margin-top: 10px;">Key Responsibilities</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">Video Production</h4>
                      <ul>
                        <li>Teaser Shoots: Record speaker teasers and event specials pre-conference</li>
                        <li>Video Editing: Support other teams with filming and editing</li>
                        <li>Event Coverage: Capture behind-the-scenes and live moments for "After Movie"</li>
                        <li>Post-Event Editing: Compile speaker and event footage for recap</li>
                      </ul>

                      <h4 style="color: #ffffff; margin-top: 10px;">Photography</h4>
                      <ul>
                        <li>On-Site Shooting: Photograph rehearsals, event scenes, audience, sponsor displays</li>
                        <li>Volunteer Coverage: Create volunteer story photobooks and digital albums</li>
                        <li>Post-Processing: Select, edit, and layout photos</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Required Skills</h3>
                      <ul>
                        <li>Own filming gear (camera, video cam, lights, mic, etc.) is a plus</li>
                        <li>Basic video shooting and editing skills</li>
                        <li>Proficient with Photoshop, Lightroom, and photo editing tools</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 10px;">Time Commitment</h3>
                      <ul>
                        <li>During July to September, filming tasks for speaker teaser videos will be scheduled irregularly; each session will take approximately 1 to 2 hours.</li>
                        <li>Commitment is required for the two days of rehearsal before the annual event, as well as on the event day.</li>
                      </ul>
                
                      <h3 style="color: #ffffff; margin-top: 30px;">视频与摄影组</h3>
                      <h4 style="color: #ffffff; margin-top: 10px;">职位概述</h4>
                      <p>负责 TEDxPS 年会及相关活动的视频拍摄、剪辑与摄影，记录活动精彩瞬间，为宣传提供优质视觉素材。</p>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">主要职责</h4>
                      <h5 style="color: #ffffff; margin-top: 10px;">视频制作</h5>
                      <ul>
                        <li>预告拍摄：年会前拍摄讲者预告片及活动特辑</li>
                        <li>视频编辑：协助其他组的视频摄录与剪辑工作</li>
                        <li>年会记录：年会当天记录幕后花絮及现场实况，制作"After Movie"</li>
                        <li>内容整理：年会后整理讲者及活动视频特辑，制作成果展示</li>
                      </ul>

                      <h5 style="color: #ffffff; margin-top: 10px;">摄影工作</h5>
                      <ul>
                        <li>现场拍摄：拍摄讲者彩排、活动现场、观众及赞助商产品等</li>
                        <li>志工纪实：策划并制作志工心路历程照片集和电子书</li>
                        <li>后期处理：筛选、编辑及排版设计照片</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">所需技能</h4>
                      <ul>
                        <li>拥有自己的拍摄设备（相机、摄像机、灯光、麦克风等）优先</li>
                        <li>基本的视频拍摄及剪辑技能</li>
                        <li>熟练使用 Photoshop、Lightroom 等图片编辑软件</li>
                      </ul>
                
                      <h4 style="color: #ffffff; margin-top: 10px;">期望投入时间</h4>
                      <ul>
                        <li>七月至九月制作讲者预告片期间，会有不定期的拍摄任务，每次拍摄大约一至两个小时。</li>
                        <li>年会前两天彩排及年会当天均需投入。</li>
                      </ul>
                    </div>`
                }
            ]
        },
        {
            type: "panel",
            name: "photo_video_panel",
            elements: [
                {
                    type: "radiogroup",
                    name: "photo_video_ques1",
                    title: "Which are you more specialized/ more capable in? | 您更专业于/ 更能发挥在以下哪个技能？",
                    isRequired: true,
                    choices: [
                        {
                          value: "Photography",
                          text: "Photography/ Photos | 摄影/ 照片"
                        },
                        {
                          value: "Videography",
                          text: "Filming/ Videos | 拍摄/ 影片"
                        }
                    ],
                },
                {
                    type: "comment",
                    name: "photo_video_ques2",
                    title: "Is it possible to shoot on weekdays? How far in advance do we need to confirm the schedule with you? | 可否能在平日里出来进行拍摄？多久前需要跟您确定时间表？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "photo_video_ques3",
                    title: "Do you have your own equipment? Could you list the equipment you have (camera, lighting, etc)? | 是否拥有自己的拍摄器材？可以列出您所拥有的器材(相机灯光等)？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "photo_video_ques4",
                    title: "What software do you usually use for editing/retouching? Please also provide your portfolio/showreel. | 您习惯使用什么软件进行剪辑/ 修图？请同时附上作品集/ Showreel。",
                    isRequired: true,
                },
            ]
        }
    ]
};