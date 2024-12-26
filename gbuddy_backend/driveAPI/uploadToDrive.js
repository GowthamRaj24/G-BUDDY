const fs = require('fs');
const driveService = require('./googleDrive');

const uploadToDrive = async (fileObject) => {
    const fileMetadata = {
        name: fileObject.originalname,
        parents: ['1_Hn39XjOA9vu9fhjYTz6Vm37MwYqDWVg'],
    };

    const media = {
        mimeType: fileObject.mimetype,
        body: fs.createReadStream(fileObject.path),
    };

    try {
        // Log details for debugging
        console.log("File path:", fileObject.path);
        if (!fs.existsSync(fileObject.path)) {
            throw new Error(`File does not exist at path: ${fileObject.path}`);
        }

        const response = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink',
            supportsAllDrives: true,
        });

        console.log("File uploaded successfully:", response.data.id);

        // Generate file URL
        const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;
        fs.unlinkSync(fileObject.path); // Clean up temporary file
        return fileUrl;
    } catch (error) {
        console.error("Error during upload:", error);
        throw new Error(`Drive API Error: ${error.message}`);
    }
};

module.exports = uploadToDrive;
