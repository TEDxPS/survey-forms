export const videoPhoto = {
    name: "Video & Photo Team | 视频与摄影团队",
    description: "Video & Photo team handles event documentation | 视频与摄影团队负责事件记录",
    visibleIf: "{first_choice} == 'Video & Photo'",
    elements: [
        {
            type: "file",
            name: "video_photo_ques1",
            title: "Video & Photo Team Question 1 | 视频与摄影团队问题1",
            isRequired: true,
            storeDataAsText: false,
            waitForUpload: true
        }
    ]
};