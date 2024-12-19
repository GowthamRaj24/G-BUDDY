const fs = require('fs');
const driveService = require('./googleDrive');

const uploadToDrive = async (fileObject) => {
    const fileMetadata = {
        name: fileObject.originalname,
        parents: ['1_Hn39XjOA9vu9fhjYTz6Vm37MwYqDWVg']
    };

    const media = {
        mimeType: fileObject.mimetype,
        body: fs.createReadStream(fileObject.path)
    };

    const response = await driveService.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });

    const fileId = response.data.id;
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
    
    // Clean up the temporary file
    fs.unlinkSync(fileObject.path);

    return fileUrl;
};

module.exports = uploadToDrive;
