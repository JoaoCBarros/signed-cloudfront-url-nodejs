const awsCloudFront = require("@aws-sdk/cloudfront-signer");
const express = require("express");
const { DateTime } = require("luxon");
const app = express();
const port = 3000;
require("dotenv").config();
const nodeUrl = require("url");

app.get("/file/:filename", (req, res) => {
  const { private_key: privateKey } = JSON.parse(
    process.env.CLOUDFRONT_PRIVATE_KEY || ""
  );
  const key = process.env.FILE_S3_KEY;
  const filename = req.params.filename;
  const cloudfrontDistributionDomain = `${process.env.CLOUDFRONT_URL}`;
  const url = `${cloudfrontDistributionDomain}/${key}?response-content-disposition=${encodeURIComponent(
    `attachment; filename=${filename}`
  )}`;
  const keyPairId = process.env.CLOUDFRONT_PUBLIC_KEY_ID || "";
  const dateLessThan = DateTime.now()
    .plus({ hours: process.env.EXPIRES_HOURS })
    .toJSDate()
    .toString();

  try {
    const signedUrl = awsCloudFront.getSignedUrl({
      url,
      keyPairId,
      dateLessThan,
      privateKey,
    }); //The URL Retorned by AWS comes with error in response-content-disposition param

    //FIX This URL ERROR
    const signedUrlParams = nodeUrl.parse(signedUrl, true).query;
    return res.send(
      `${url}&Expires=${signedUrlParams.Expires}&Signature=${signedUrlParams.Signature}&Key-Pair-Id=${signedUrlParams["Key-Pair-Id"]}`
    );
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Running in port ${port}`);
});
