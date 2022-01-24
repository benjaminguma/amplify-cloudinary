/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	CLOUDINARY_API_SECRET
Amplify Params - DO NOT EDIT */

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

var cors = require('cors');
const multer = require('multer');

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(awsServerlessExpressMiddleware.eventContext());

const Cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage();
const upload = multer({ storage });

const cldConfig = {
	cloud_name: 'dqydioa16',
	api_key: '421711163816247',
	api_secret: process.env.CLOUDINARY_API_SECRET,
};

Cloudinary.config(cldConfig);

app.post('/upload', upload.single('file'), async (req, res, next) => {
	let file, b64Img;
	try {
		file = req.file;
		console.log({ file });
		b64Img = `data:${file.mimetype};base64,` + Buffer.from(file.buffer).toString('base64');

		const cldRes = await Cloudinary.uploader.upload(b64Img, {
			resource_type: 'auto',
		});
		return res.json({ ...cldRes });
	} catch (error) {
		return res.json({ error: error.message });
	}
});

app.listen(3001, function () {
	console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
