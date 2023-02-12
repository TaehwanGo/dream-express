const path = require("path");
const os = require("os");
const fs = require("fs");

// console.log(process.argv);

// 현재 이 파일이 있는 위치에서(/photo) node app test를 실행하면
/**
[
  '/opt/homebrew/Cellar/node/18.9.0/bin/node',
  '/Users/gotaehwan/projects/dream-express/07_Script/photo/app',
  'test'
]
 */
// 위와 같이 3번째 인자로 argument를 받을 수 있다

// 1. 사용자가 원하는 폴더의 이름을 입력받는다

const folder = process.argv[2];
const workingDir = path.join(os.homedir(), "Pictures", folder);
if (!folder | !fs.existsSync(workingDir)) {
  console.error("Please enter folder name in Pictures");
  return;
}

// 2. 해당 폴더 안에 video, duplicated, captured 폴더를 만든다
const videoDir = path.join(workingDir, "video");
const capturedDir = path.join(workingDir, "captured");
const duplicatedDir = path.join(workingDir, "duplicated");

// sync를 쓰는 이유 폴더를 만들고 파일을 처리해야 하므로
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

/**
 * 3. 폴더안에 있는 파일들을 다 돌면서 해당하는 mp4|mov는 video로 png|aae는 captured로,
   파일명이 중복되는 파일(IMG_1234, IMG_E1234)은 duplicated로 이동시킨다
 */
fs.promises.readdir(workingDir).then(processFiles).catch(console.log);

function processFiles(files) {
  files.forEach((file) => {
    if (isVideoFile(file)) {
      move(file, videoDir);
    } else if (isCapturedFile(file)) {
      move(file, capturedDir);
    } else if (isDuplicatedFile(files, file)) {
      move(file, duplicatedDir);
    }
  });
}

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isDuplicatedFile(files, file) {
  if (!file.startsWith("IMG_") || file.startsWith("IMG_E")) {
    return false;
  }
  const edited = `IMG_E${file.split("_")[1]}`;
  const found = files.find((f) => f.includes(edited));
  return !!found;
}

function move(file, targetDir) {
  console.info(`move ${file} to ${path.basename(targetDir)}`);
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);
  fs.promises.rename(oldPath, newPath).catch((error) => console.error(error));
}
