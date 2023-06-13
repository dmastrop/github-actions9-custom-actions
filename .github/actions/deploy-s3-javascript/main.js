// this has the basic logic of the custom action javascript
// import these three packages. These will give us access to various features and commands
// that we can use in our javascript code.
// https://github.com/actions/toolkit
// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
const core = require('@actions/core');

// const github = require('@actions/github');
// we are not using actions/github, but this can be used with the github REST API via
// github.getOctokit() method and github.context

const exec = require('@actions/exec');

function run() {
  
  // 1) Get some input values. We need information about the deploymen target.
  // The artifacts (dist-files) are uploaded right now by the build job to GitHub 
  // (they show up as artifacts on the bottom of the job run results in the actions tab).  
  // We want to upload these files (dist-files) now to the s3 bucket that we just created.
  // we need to supply input information about the s3 bucket so that this custom action js can
  // upload the files to the s3 bucket

  // we can hardcode the s3 but we need to generalize it so that it dynamic.
  // so in actions.yml we will add the specific inputs that will be supplied to the main.js

  // now to get these values that are in the actions.yml file (s3 bucket name, region and the uploaded file name)
  // we can use the actions core that was added above as a dependency.
  // core has a notice method but also a getInput method


  //const bucket = core.getInput('bucket', { required: true });
  const bucket = core.getInput('my-s3-bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  // note that while region is not required in action.yml, we do require the value itself of this code.
  // there will always be a region whether it is default or not, and this is needed for this code to work.
  const distFolder = core.getInput('dist-folder', { required: true });



  // 2) Upload files. Now that we have the s3 bucket and files defined (above) we can use them to upload to s3
  // to upload the files we can use the AWS SDK for JS.  These are JS methods provided by AWS for things like uploading.
  //We will use the exec function that was installed as a dependency (see above)

  const s3Uri = `s3://${bucket}`;
  // this is our s3 bucket path

  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`); // these are back ticks not single quotes
  //exec will call an exec method and this method needs command.  The ubuntu runner images have aws CLI 
  // pre-installed (i have it locally on mac as well). So we can use aws to  synchronize our local folder 
  // uploaded onto github runner by the build script) with our s3 bucket
  // note disFolder, bucketRegion, and bucket are defined above
  // exec.exec will essentially execute this aws command on the shell of the gitlab runner
  // NOTE: the problem with the exec.exec by default will fail. There is no permission to write.
  // need to generate a security credential access key (access key ID and secret access key)
  // then add these to the secrets in the git repo and pull them in the deploy job in the main deploy.yml script
  // main.js will have access to these keys because the step in the deploy.yml calling this custom action js
  // has these keys defined. (see the deploy.yml file)


  //test1: send a message to github actions and its log file.
  core.notice('Hello from my custom JavaScript Action!');

  //
  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  // note that these are back ticks and not single quotes. We can build the url as above
  // for example, my url is: http://github-actions-custom-action-js.s3-website-us-west-1.amazonaws.com/

  core.setOutput('my-website-url', websiteUrl); // echo "website-url=..." >> $GITHUB_OUTPUT
  // note the first string is my-website-url name from action.yml and second string is websiteUrl javascript variable.
  // this sets the value of my-website-url to websiteURL, and action.yml can pass it to deploy.yml
}

run();