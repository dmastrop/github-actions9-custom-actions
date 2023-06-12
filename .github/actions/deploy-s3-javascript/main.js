// this has the basic logic of the custom action javascript
// import these three packages. These will give us access to various features and commands
// that we can use in our javascript code.
// https://github.com/actions/toolkit
// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    //send a message to github actions and its log file.
  core.notice('Hello from my custom JavaScript Action!');
  // 1) Get some input values
  
  //const bucket = core.getInput('bucket', { required: true });
  //const bucketRegion = core.getInput('bucket-region', { required: true });
  //const distFolder = core.getInput('dist-folder', { required: true });

  // 2) Upload files
  //const s3Uri = `s3://${bucket}`;
  //exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);
//
  //const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  //core.setOutput('website-url', websiteUrl); // echo "website-url=..." >> $GITHUB_OUTPUT
}

run();