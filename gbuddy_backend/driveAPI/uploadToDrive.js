const fs = require('fs');
const driveService = require('./googleDrive');

const uploadToDrive = async (fileObject) => {
    // Add file existence check before creating metadata
    if (!fileObject || !fileObject.path) {
        throw new Error('Invalid file object');
    }

    const fileMetadata = {
        name: fileObject.originalname,
        parents: ['1_Hn39XjOA9vu9fhjYTz6Vm37MwYqDWVg'],
    };

    const media = {
        mimeType: fileObject.mimetype,
        body: fs.createReadStream(fileObject.path, { 
            highWaterMark: 32 * 1024 // Optimize buffer size for better performance
        }),
    };

    try {
        // Verify file existence and readability
        await fs.promises.access(fileObject.path, fs.constants.R_OK);

        const response = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink',
            supportsAllDrives: true,
            retryConfig: {
                retry: 3, // Add retry logic
                retryDelay: 1000
            }
        });

        const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;
        
        // Clean up using promises for better error handling
        await fs.promises.unlink(fileObject.path);
        
        return fileUrl;
    } catch (error) {
        console.error("Upload failed:", {
            fileName: fileObject.originalname,
            error: error.message,
            stack: error.stack
        });
        throw new Error(`Drive API Error: ${error.message}`);
    }
};

module.exports = uploadToDrive;
