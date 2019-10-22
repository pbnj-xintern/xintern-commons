var AWS = require('aws-sdk');

module.exports.uploadMultipartToS3 = async (fileName, base64Body, path) => {

    let buffer = Buffer.from(base64Body.replace(/^data:image\/\w+;base64,/, ""), 'base64')


    var s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    var params = {
        Bucket: process.env.BUCKET_NAME,
        Key: path + fileName,
        Body: buffer,
        ContentEncoding: 'base64',
    };

    let key = await s3.putObject(params, function (err, data) {
        if (err) {
            console.log(err);
            return null
        }
        console.log('succesfully uploaded the image!');
    });

    let url = 'https://' + process.env.BUCKET_NAME + '.s3.amazonaws.com/' + path + fileName

    return url;

}