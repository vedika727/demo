/**
 * @author Arun Thakur
 * @description web.config added for environmemnt setup
 */

var chalk = require("chalk"); // importing chalk module
var fs = require("fs"); // importing fs module
var path = require("path"); // importing path module
var useDefaultConfig = require("@ionic/app-scripts/config/webpack.config.js"); // importing webpack.config.js from ionic

var env = process.env.MY_ENV; // conatins the environment variabe
var platform =process.env.PLATFORM; //Reading platform flag
const fse = require('fs-extra');
//Setting destination path based on platform
const file = (platform == 'ios' ? './platforms/ios/Podfile' : './google-services.json');


//checking the flag alias and initiating the @app/env
if (env !== "prod" && env !== "dev") {
  // Default to dev config
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = {
    "@app/env": path.resolve(environmentPath(env))
  };
}else{
  useDefaultConfig[env].resolve.alias = {
    "@app/env": path.resolve(environmentPath(env))
  };
}

/**
 * @description : function for injecting environment flag based on that api url will change
 */
function environmentPath(env) {
  if (env == "undefined" || env == undefined) {
    env = "dev"; // setting up default configuration if there is no flag
  } else { 
      console.log(" flag :: ", env);
      console.log(" platform ::", platform);
      // Checking and deleting existing file
      if (fse.existsSync(file)){
        fse.remove(file).then(() =>{
            copyGoogleJson(env);// copying
          })
          .catch(err => console.error(err))
        } else {
          copyGoogleJson(env);//copying
        } 
  }
  var filePath =
    "./src/environments/environment" +
    (env === "prod" ? "" : "." + env) +
    ".ts";
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red("\n" + filePath + " does not exist!"));
  } else {
    return filePath;
  }
}

function copyGoogleJson(env){
  //setting source path based on platform
  const temp = "./src/environments/"+env+"/"+platform+"/";
  fs.readdirSync(temp).forEach(fileName => {
     let dest = './'+fileName ;
     if(platform=='ios'){
       if(fileName=='Podfile'){
        dest = './platforms/'+platform+'/'+fileName ;
       }
     }
    const source = "./src/environments/"+env+"/"+platform+"/"+fileName ;
    console.log(source);
    fse.copy(source, dest)
    .then(() => console.log('success!'))
    .catch(err => console.error("Error :: ",err));
  })
}

module.exports = function() {
  return useDefaultConfig; // exporting default config setup for environment
};
