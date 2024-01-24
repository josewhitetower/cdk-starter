#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PhotosStack } from './PhotosStack';
import { PhotosHandlerStack } from './PhotosHandlerStack';

const app = new cdk.App();
const photosStack = new PhotosStack(app, 'PhotosStack');
new PhotosHandlerStack(app, 'PhotosHandlerStack', {
    targetBucketArn: photosStack.photoBucketArn
});