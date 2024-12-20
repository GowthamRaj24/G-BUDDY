const fs = require('fs');
const driveService = require('./googleDrive');

const uploadToDrive = async (fileObject) => {
    const fileMetadata = {
        name: fileObject.originalname,
        parents: ['1_Hn39XjOA9vu9fhjYTz6Vm37MwYqDWVg']
    };

    console.log(fileMetadata);

    const media = {
        mimeType: fileObject.mimetype,
        body: fs.createReadStream(fileObject.path)
    };

    // console.log("media" + media);

    try {
        const response = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink',
            supportsAllDrives: true,
        });
        

        console.log("res" + response.data.id)

        const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;
        fs.unlinkSync(fileObject.path);
        return fileUrl;
    } catch (error) {
        console.log("error in uploading--" , error.message);
        throw new Error(`Drive API Error: ${error.message}`);
    }
};

module.exports = uploadToDrive;
