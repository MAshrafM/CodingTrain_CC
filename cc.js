const fs = require('fs')

let path = __dirname + '/public/CC';

fs.readdirAsync = function(dirname){
  return new Promise(function(resolve, reject){
    fs.readdir(dirname, function(err, filenames){
      if(err)
        reject(err);
      else
        resolve(filenames);
    });
  });
};

function getChallenges(){
  return fs.readdirAsync(path).then(function(folders){
    return folders.map((f) => {
      let cc = f.split('_');
      return {
        id: cc[0],
        title: cc[1]
      };
    });
  }).catch((err) => console.log(err));
}

module.exports.getChallenges = getChallenges;