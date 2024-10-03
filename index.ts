
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import zlib from 'zlib';

// Hardcoded region, if needed, change it to the correct region
const s3Client = new S3Client({ region: 'eu-west-1' });

const loadS3File = async (key: string, bucket: string) => {
    try {
        console.info(`Loading messages from ${key}`);
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: `${key}`
        });

        const getObjectResponse = await s3Client.send(command);
        const decompressedData = zlib.unzipSync(await (getObjectResponse.Body?.transformToByteArray()) as Buffer).toString();

        const messages = decompressedData.split('\n').map(line => {
            if (!line) return null;
            try {
                return JSON.parse(line);
            } catch (error) {
                console.error('Error parsing this line:', line, error);
                return null;
            }
        }).filter(Boolean);

        console.info(JSON.stringify(messages));
        console.info(`Loaded ${messages.length} messages from ${key}`);
        return messages;
    } catch (error) {
        console.error('Error fetching messages from S3:', error);
        throw error;
    }
};

const fileName = process.argv[2];
const bucket = process.argv[3] || 'gis-discover-staging';

if (!fileName) {
    console.error("Usage: npm run start -- <fileName> <bucket>");
    process.exit(1);
}

// Call the function to read messages from the stream
loadS3File(fileName, bucket);
