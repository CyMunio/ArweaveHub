const { readJWKFile, arDriveFactory, wrapFileOrFolder, EID } = require('ardrive-core-js');
const path = require('path');

// Path to your Arweave wallet file
const walletPath = path.join(__dirname, 'wallet.json');

// Read wallet from file
const myWallet = readJWKFile(walletPath);

// Construct ArDrive class
const arDrive = arDriveFactory({ wallet: myWallet });

(async () => {
    try {
      // Create a public drive
      const createDriveResult = await arDrive.createPublicDrive({ driveName: 'My-Drive' });
      const driveId = createDriveResult.id;
  
      console.log('Drive created with ID:', driveId);
      
      // Wrap the file for upload
      const filePath = path.join(__dirname, 'path/to/your/file.txt');
      const wrappedEntity = wrapFileOrFolder(filePath);
  
      // Destination folder ID (root of the drive in this case)
      const destFolderId = EID(driveId);
  
      // Upload the wrapped file
      const uploadFileResult = await arDrive.uploadAllEntities({
        entitiesToUpload: [{ wrappedEntity, destFolderId }]
      });
  
      console.log('File uploaded successfully:', uploadFileResult);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  