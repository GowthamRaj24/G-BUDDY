const fs = require('fs');
const driveService = require('./googleDrive');

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
        body: fs.createReadStream(fileObject.path, {
            highWaterMark: 32 * 1024 // 32KB chunks for optimal streaming
        })
    };

    try {
        // Verify file readability
        await fs.promises.access(fileObject.path, fs.constants.R_OK);

        // Upload to Google Drive with retry logic
        const response = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink',
            supportsAllDrives: true,
            retryConfig: {
                retry: 3,
                retryDelay: 1000
            }
        });

        const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;

        // Clean up temporary file
        await fs.promises.unlink(fileObject.path);

        return fileUrl;
    } catch (error) {
        console.error('Upload failed:', {
            fileName: fileObject.originalname,
            error: error.message,
            stack: error.stack
        });
        throw new Error(`Drive API Error: ${error.message}`);
    }
};

module.exports = uploadToDrive;