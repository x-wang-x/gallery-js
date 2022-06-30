const testFolder = "E:/LIST";
const fs = require("fs");
const path = require("path");

const files = [];
// function read(source, extension = [], type = 0, isRecursive = false) {
//   console.log(extension.length)
//   try {
//     fileObjs = fs.readdirSync(source, { withFileTypes: true });
//     fileObjs.forEach((file) => {
//       const res = path.resolve(source, file.name);
//       if (isRecursive) {
//         //recursive scanning
//         file.isDirectory() ? read(res,extension) : files.push(res);
//       } else {
//         if (type == 0) {
//           // console.log(path.extname(res))
//           if (file.isFile()) {
//             // check is path is file
//             if (extension.length !== 0) {
//               //check is user using extension sorting
//               if (extension.includes(path.extname(res))) {
//                 files.push(res);
//               }
//             }
//           }
//         } else {
//           file.isDirectory() && files.push(res);
//         }
//       }
//     });
//     return files.length!=0 ? files : null;
//   } catch (e) {
//     console.log(e);
//     return null;
//   } //return null when error
// }
function read(source, extension = [], type, isRecursive = false) {
  try {
    fileObjs = fs.readdirSync(source, { withFileTypes: true });
    fileObjs.forEach((file) => {
      const res = path.resolve(source, file.name);
      if (type == 0) {
        //show onlyfiles in current directory
        if (file.isFile()) {
          // check is path is file
          if (extension.length !== 0) {
            //check is user using extension sorting
            if (extension.includes(path.extname(res))) {
              files.push(res);
            }
          } else {
            //if not using sorting, show all
            files.push(res);
          }
        }
      } else if (type == 1) {
        //show onlyfiles in recusrive mode
        if (extension.length !== 0) {
          //check is user using extension sorting
          if (extension.includes(path.extname(res))) {
            //check value is available in array extension
            files.push(res);
          }
        } else {
          files.push(res); // show all if not using sorting
        }
        if (file.isDirectory()) {
          //if directory , scan in it
          read(res, extension, 1);
        }
      } else if (type == 2) {
        //show only dir in current directory
        file.isDirectory() && files.push(res);
      }
      else if (type == 3) {
        //show only dir in recusrsive directory
        file.isDirectory() && read(res,[],2);
      } else {
        //show all files and folder in recursive
        file.isDirectory() ? read(res) : files.push(res);
      }
    });
    return files.length != 0 ? files : null;
  } catch (e) {
    console.log(e);
    return null;
  } //return null when error
}
console.log(read(testFolder, [".mp4"], 3));
