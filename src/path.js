const testFolder = "E:/LIST";
const fs = require("fs");
const path = require("path");

const files = [];
function read(source, extension = [], type = 0, isRecursive = false) {
  console.log(extension.length)
  try {
    fileObjs = fs.readdirSync(source, { withFileTypes: true });
    fileObjs.forEach((file) => {
      const res = path.resolve(source, file.name);
      if (isRecursive) {
        //recursive scanning
        file.isDirectory() ? read(res,extension) : files.push(res);
      } else {
        if (type == 0) {
          // console.log(path.extname(res))
          if (file.isFile()) {
            // check is path is file
            if (extension.length !== 0) {
              //check is user using extension sorting
              if (extension.includes(path.extname(res))) {
                files.push(res);
              }
            }
          }
        } else {
          file.isDirectory() && files.push(res);
        }
      }
    });
    return files.length!=0 ? files : null;
  } catch (e) {
    console.log(e);
    return null;
  } //return null when error
}

console.log(read(testFolder,[".mp4",".zip"],0,true));
