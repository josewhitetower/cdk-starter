#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterStack } from '../lib/cdk-starter-stack';
import { PhotosStack } from './PhotosStack';
import { PhotosHandlerStack } from './PhotosHandlerStack';

const app = new cdk.App();
new PhotosStack(app, 'PhotosStack');
new PhotosHandlerStack(app, 'PhotosHandlerStack');