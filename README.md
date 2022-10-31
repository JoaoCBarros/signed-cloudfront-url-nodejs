# Generate a Pré-Signed URL to CloudFront + S3 Bucket With Dynamic Filename

## Pre-Requisites

1.  Create a S3 Bucket in AWS with all public access blocked and an new Legacy access identity (and select `Yes, update the bucket policy`)
2.  Add a CloudFront Public key
3.  Create a CloudFront key group
4.  Create a Cloudfront Distribution using:
  1. Restrict viewer access and Trusted authorization type of Trusted key groups
  2. Cache policy and origin request policy with a custom Cache policy that allows only the Query string `response-content-disposition`

## Install

Run `npm install`

## Start

Run `npm run start`

## Docker

Run `docker-compose up -d`

or

Run `docker compose up -d`
