export const fileUploadJson = {
    name: "file_upload",
    description: "File Upload",
    elements: [
        {
            type: "file",
            name: "file_upload",
            title: "File Upload",
            isRequired: true,
            maxSize: 5000000, // 5MB
            storeDataAsText: false,
            waitForUpload: true,
        }
    ]
};