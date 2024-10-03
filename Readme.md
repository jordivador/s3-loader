# S3 File Loader

This project is a small Node.js library that reads and processes compressed log files stored in Amazon S3. It connects to an S3 bucket, downloads the specified file, decompresses it using zlib, and prints out the parsed messages. The library is written in TypeScript and uses the AWS SDK v3.

## Features
- Downloads a file from a given S3 bucket.
- Decompresses Gzip files using zlib.
- Parses each line into JSON objects.
- Outputs all parsed messages and logs any errors encountered.

## Prerequisites
- **Node.js**: Ensure Node.js v14 or higher is installed.
- **AWS Credentials**: You need appropriate AWS credentials set up to access the S3 bucket. You can configure your AWS credentials using the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) or environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/s3-file-loader.git
   cd s3-file-loader
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Configuration
By default, the library connects to the `eu-west-1` region. If you need to change the region, update the `region` parameter in the `S3Client` configuration in `index.ts`:

```typescript
const s3Client = new S3Client({ region: 'your-region' });
```

## Running the Library
To use this library, you must provide the S3 file key and optionally a bucket name.

### Default Usage
To run the program, use the following command:

```bash
npm run start -- <fileName> <bucket>
```

- **`fileName`**: S3 key of the file you want to load, e.g., `logs/2023/10/01/logs.gz`
- **Optional**: If you want to specify a different S3 bucket, pass it as the second argument.

Example:

```bash
npm run start -- logs/2023/10/01/logs.gz gis-discover-staging
```

## Output
The script will download the specified file, decompress it, parse each line as a JSON object, and print the output in the console. If there are any errors in parsing, the faulty lines will be logged separately.

## Troubleshooting
1. **AWS Access Issues**: Ensure that your IAM user/role has `s3:GetObject` permission for the specified bucket.
2. **File Not Found**: Double-check the S3 key path and bucket name.
3. **Zlib Errors**: Ensure the input file is properly compressed using Gzip.

## Development
### Build the Project
To compile the TypeScript code to JavaScript:

```bash
npm install
```

### File Structure
- **`index.ts`**: Main entry point of the application.
- **`tsconfig.json`**: TypeScript configuration file.
- **`package.json`**: Project dependencies and scripts.

## Contributing
Feel free to submit a pull request if you'd like to add new features or improve the existing code.

## License
This project is licensed under the MIT License.

---

If you have any questions or issues, please reach out or create an issue in the repository!
