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

  //L2 construct
  new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [{
      expiration: cdk.Duration.days(2)
    }]
  })

  //L3 construct
  new L3Bucker(this, 'MyL3Bucket', 3)


  }
}
