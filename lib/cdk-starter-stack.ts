import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucker extends Construct{
  constructor(scope: Construct, id: string, expirationInDays: number){
    super(scope, id);

    new Bucket(this, 'MyL3Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(expirationInDays)
      }]
    })
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  // create a s3 bucket in 3 ways

  //L1 construct
  new CfnBucket(this, 'MyL1Bucket', {
    lifecycleConfiguration: {
      rules: [{
        expirationInDays: 1,
        status: 'Enabled'
      }]
    }
  })

  const duration = new cdk.CfnParameter(this, 'duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number',
    });

  //L2 construct
  const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(duration.valueAsNumber)
      }]
    });

  //L3 construct
  new L3Bucker(this, 'MyL3Bucket', 3)

  new cdk.CfnOutput(this, 'MyL2BucketName', {
    value: myL2Bucket.bucketName
  })


  }
}

/**
  CDK commands:
  cdk init app --language=typescript
  cdk bootstrap - before deploying in order to make a starter environment
  ckk synth - to generate the cloudformation template
  cdk deploy - to deploy the stack
  cdk list - to list the stacks, see cdk-starter-stack.ts file
  cdk diff - to see the difference between the current stack and the deployed stack
  cdk doctor - to see if there are any issues with the cdk
  cdk destroy - to destroy the stack eg. cdk destroy CdkStarterStack

  cdk deploy --parameters duration=5 - to deploy the stack with a parameter
 */