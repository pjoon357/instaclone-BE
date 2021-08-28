import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
    region: "ap-northeast-2",
});

const Bucket = "instaclone-upload-aws";
const s3 = new AWS.S3();

export const uploadToS3 = async (file, userId, folderName) => {
    const { filename, createReadStream } = await file;
    const newFilename = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const { Location } = await s3.upload({
        Bucket,
        Key: newFilename,
        ACL: "public-read",
        Body: readStream
    }).promise();

    return Location;
};

export const deleteToS3 = async (fileUrl, folderName) => {
    const filePath = fileUrl.split(`/${folderName}/`)[1];
    const Key = `${folderName}/${filePath}`;
    const params = {
        Bucket,
        Key,
    };
    await s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });
};