import * as cdk from 'aws-cdk-lib';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface PhotosHandlerStackProps extends cdk.StackProps {
    targetBucketArn: string;
}

export class PhotosHandlerStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
        super(scope, id, props);

        const targetBucket = cdk.Fn.importValue('photos-bucket');

        new LambdaFunction(this, 'PhotosHandler', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: Code.fromInline(`
            exports.handler = async function(event, context) {
                console.log("hello world" + process.env.TARGET_BUCKET);
            }`),
            environment: {
                TARGET_BUCKET: props.targetBucketArn
            }
        });



    }

}
