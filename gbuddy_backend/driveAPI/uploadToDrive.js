const uploadToDrive = async (fileObject) => {
    const fileMetadata = {
      name: fileObject.originalname,
      parents: ['1_Hn39XjOA9vu9fhjYTz6Vm37MwYqDWVg']
    };
  
    const media = {
      mimeType: fileObject.mimetype,
      body: Buffer.from(fileObject.buffer) // Use buffer directly
    };
  
    try {
      const response = await driveService.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
        supportsAllDrives: true,
      });
  
      const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;
      return fileUrl;
    } catch (error) {
      console.log("error in uploading--", error.message);
      throw new Error(`Drive API Error: ${error.message}`);
    }
  };
  