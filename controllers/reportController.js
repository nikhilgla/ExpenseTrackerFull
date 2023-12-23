const Expense = require('../models/expensetable');
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');

exports.downloadreport = async(req,res,next) =>{
    console.log("wertyui");

        try {
            if(!req.user.ispremium){
                return res.status(401).json({ success: false, message: 'User is not a premium User'})
            }
            const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING; // check this in the task. I have put mine. Never push it to github.
            // Create the BlobServiceClient object which will be used to create a container client
            const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    
            // V.V.V.Imp - Guys Create a unique name for the container
            // Name them your "mailidexpensetracker" as there are other people also using the same storage
    
            const containerName = 'nikexpensetracker'; //this needs to be unique name
    
            console.log('\nCreating container...');
            console.log('\t', containerName);
    
            // Get a reference to a container
            const containerClient = await blobServiceClient.getContainerClient(containerName);
    
            //check whether the container already exists or not
            if(!containerClient.exists()){
                // Create the container if the container doesnt exist
                const createContainerResponse = await containerClient.create({ access: 'container'});
                console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
            }
            // Create a unique name for the blob
            const blobName = 'expenses' + uuidv1() + '.txt';
    
            // Get a block blob client
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
            console.log('\nUploading to Azure storage as blob:\n\t', blobName);
    
            // Upload data to the blob as a string
            const data =  JSON.stringify(await req.user.getExpenses());
    
            const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
            console.log("Blob was uploaded successfully. requestId: ", JSON.stringify(uploadBlobResponse));
    
            //We send the fileUrl so that the in the frontend we can do a click on this url and download the file
            const fileUrl = `https://demostoragesharpener.blob.core.windows.net/${containerName}/${blobName}`;
            res.status(201).json({ fileUrl, success: true}); // Set disposition and send it.
        } catch(err) {
            res.status(500).json({ error: err, success: false, message: 'Something went wrong'})
        }
    
    
};