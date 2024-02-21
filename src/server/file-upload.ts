"use server";

import {
    S3Client,
    // PutObjectCommand,
    // GetObjectCommand,
    // DeleteObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "node:path";
// import {env} from "@/env";

// const region= env.UPLOAD_REGION;
// const endpoint=env.UPLOAD_ENDPOINT;
// const accessKeyId= env.UPLOAD_ACCESS_KEY_ID;
// const secretAccessKey= accessKeyId && secretAccessKey;