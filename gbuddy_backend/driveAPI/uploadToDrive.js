const fs = require('fs');
const driveService = require('./googleDrive');

const uploadFileWithRetry = async (driveService, fileMetadata, media, retries = 3) => {
    while (retries > 0) {
        try {
            return await driveService.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id, webViewLink',
                supportsAllDrives: true
            });
        } catch (error) {
            console.error(`Upload attempt failed. Retries left: ${retries - 1}`);
            retries--;
            if (retries === 0) throw error;
            await new Promise(res => setTimeout(res, 1000));
        }
    }
};

const uploadToDrive = async (fileObject) => {
    if (!fileObject?.path) {
        throw new Error('Invalid file object');
    }

    const fileMetadata = {
        name: fileObject.originalname,
        parents: ['1_Hn39XjOA9vu9fhjYTz6Vm37MwYqDWVg']
    };

    const media = {
        mimeType: fileObject.mimetype,
        body: fs.createReadStream(fileObject.path)
    };

    try {

        await fs.promises.access(fileObject.path, fs.constants.R_OK);

        const response = await uploadFileWithRetry(driveService, fileMetadata, media);

        const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;

        await fs.promises.unlink(fileObject.path);

        return fileUrl;
    } catch (error) {
        if (error.response) {
            console.error('Google API Error:', error.response.data);
        } else {
            console.error('Unexpected Error:', error.message);
        }
        throw new Error(`Drive API Error: ${error.message}`);
    }
};

module.exports = uploadToDrive;
