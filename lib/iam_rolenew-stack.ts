import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IamRolenewStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  //we are going to crate permission Policy
   const describeAcmCertificates = new iam.PolicyDocument({
    statements: [
      new iam.PolicyStatement({
        resources: ['arn:aws:acm:*:*:certificate/*'],
        actions: ['acm:DescribeCertificate'],
      }),

    ],

   });

   // We are creating Role

   const role = new iam.Role(this, 'example-iam-role', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
      description: 'Example Iam role...',
      inlinePolicies: {

        DescribeACMCerts: describeAcmCertificates,
      },
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'AmazonAPIGatewayInvokeFullAccess',
        ),
      ],
});
   

  }
}
