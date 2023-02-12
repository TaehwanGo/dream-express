const path = require("path");

console.log(__dirname);
// /Users/gotaehwan/projects/dream-express/04_Node-Modules/9-path
console.log(__filename);
// /Users/gotaehwan/projects/dream-express/04_Node-Modules/9-path/app.js
// Windows라면 => C:\Users\gotaehwan\projects\dream-express\04_Node-Modules\9-path\app.js

console.log(path.sep); // 경로 구분자
console.log(path.delimiter); // 환경 변수 구분자

// basename : file 이름만 읽어옴
console.log(path.basename(__filename));
console.log(path.basename(__filename, ".js"));

// dirname
console.log(path.dirname(__filename));

// extension - 확장자
console.log(path.extname(__filename));

// parse
const parsed = path.parse(__filename);
console.log(parsed); // json 형태로 나옴
parsed.root;
parsed.dir;

const str = path.format(parsed);
console.log(str);

// isAbsolute
console.log("isAbsolute?", path.isAbsolute(__dirname));
console.log("isAbsolute?", path.isAbsolute("../"));

// normalize - 경로를 정상적인 형태로 만들어줌
console.log(path.normalize("/foo/bar//baz/asdf/..")); // /foo/bar/baz

// join
console.log(__dirname + path.sep + "images"); // '/images'는 Windows에서는 '\\images'가 필요하기 때문에 path.sep를 사용해야 함
console.log(path.join(__dirname, "images")); // 간단하게 path.join으로 합칠 수 있음
