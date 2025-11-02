import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { SSMClient, GetParametersByPathCommand } from "@aws-sdk/client-ssm"

let options = {
    region: 'us-east-1'
}

const fsignUrl = async ({ client, bucket, key }) => {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(client, command, { expiresIn: 120 });
}

if (process.env.NODE_ENV && process.env.NODE_ENV==="development"){
    options.credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
}

const client = new S3Client(options);

export const signUrl = async (req, res) => {
    try {
        const { folder, filename } = req.params
        console.log(process.env.AWS_BUCKET)
        console.log(filename);
        // console.log(options);
        const url = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key: `${folder}/${filename}` });
        console.log(url)
        res.send(url);
        
    } catch (error) {
        console.log(error)
        console.log(error.message)
    }
}