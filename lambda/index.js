const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET = "badges.xdai.io";
const BASE_PATH = "ethdenver/v1";

exports.handler = async (event) => {
    console.log("Event: ", event);
    console.log("event.body: ", event.body);

    let input = JSON.parse(event.body);
    console.log("input: ", input);

    let jsonPath = `${BASE_PATH}/json/${input.name}.json`;
    let imagePath = `${BASE_PATH}/images/${input.name}`;

    // Check to see if metadata object already exists
    var checkParams = {
        Bucket: BUCKET,
        Key: jsonPath
    };

    let data;

    try {
        data = await s3.headObject(checkParams).promise()
        console.log("The object already existed. Data: ", data);

        return {
            statusCode: 400,
            body: JSON.stringify('Exists'),
            headers: {
            	"Access-Control-Allow-Methods": "POST",
            	"Access-Control-Allow-Headers": "",
            	"Access-Control-Allow-Origin": "*"
            }
        };

    } catch(err) {
        console.log("Didn't find resource. Good to go: ", err);
    }

    let json = {
        description: input.description,
        external_url: "https://xdai.io",
        image: `https://badges.xdai.io/ethdenver/v1/images/${input.name}`,
        name: input.name
    }

    try {
        let ret = await putObjectToS3(BUCKET, jsonPath, JSON.stringify(json), {ContentType: 'application/json'});
        console.log("Ret: ", ret);
    } catch(err) {
        console.log("Err: ", err);
    }

    try {
    	let imageData = new Buffer(input.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    	console.log("imageData: ", imageData);
        let imgRet = await putObjectToS3(BUCKET, imagePath, imageData, {ContentType: 'image/jpeg', ContentEncoding: 'base64'});
        console.log("imgRet: ", imgRet);
    } catch(err) {
        console.log("Err: ", err);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('ok'),
        headers: {
        	"Access-Control-Allow-Methods": "POST",
        	"Access-Control-Allow-Headers": "",
        	"Access-Control-Allow-Origin": "*"
        }
    };
};

async function putObjectToS3(bucket, key, data, opts={}){
    console.log("In put object")
    console.log("bucket: ", bucket);
    console.log("key: ", key);
    console.log("data: ", data);


    var baseParams = {
        Bucket : bucket,
        Key : key,
        Body : data,
        ACL: 'public-read'
    };

    var params = Object.assign(baseParams, opts);
    console.log("params: ", params);

    return s3.putObject(params).promise()
}
