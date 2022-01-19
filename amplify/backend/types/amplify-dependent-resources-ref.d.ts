export type AmplifyDependentResourcesAttributes = {
    "function": {
        "myuploadfunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "myapigateway": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}