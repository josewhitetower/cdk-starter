import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const myBucket = new s3.Bucket(this, 'PhotosBucket', {
            bucketName: 'photos-bucket-1234567890',
        });

        (myBucket.node.defaultChild as s3.CfnBucket).overrideLogicalId('PhotosBucket12423');
    }
}
