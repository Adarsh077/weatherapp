var filestocopy = [];
var filestocopyAndroid = [
  {
    "resources/android/icon/drawable-mdpi-icon.png":
      "android/app/src/main/res/drawable-mdpi/ic_stat_notify.png",
  },
  {
    "resources/android/icon/drawable-hdpi-icon.png":
      "android/app/src/main/res/drawable-hdpi/ic_stat_notify.png",
  },
  {
    "resources/android/icon/drawable-xhdpi-icon.png":
      "android/app/src/main/res/drawable-xhdpi/ic_stat_notify.png",
  },
  {
    "resources/android/icon/drawable-xxhdpi-icon.png":
      "android/app/src/main/res/drawable-xxhdpi/ic_stat_notify.png",
  },
  {
    "resources/android/icon/drawable-xxxhdpi-icon.png":
      "android/app/src/main/res/drawable-xxxhdpi/ic_stat_notify.png",
  },
  {
    "resources/android/icon/icon.png": "android/app/src/main/res/icon.png",
  },
];

var fs = require("fs");
var path = require("path");
var rootdir = "./";
var androiddir = path.join(rootdir, "android");

if (fs.existsSync(androiddir)) {
  filestocopy = filestocopyAndroid;
  console.log("Android platform file recognized");
} else {
  console.log("Error: no Android or iOS platform file was recognized.");
  filestocopy = [];
}

console.log("~~~~ Start Copying Notification Status Icons");
filestocopy.forEach(function (obj) {
  Object.keys(obj).forEach(function (key) {
    var val = obj[key];
    var srcfile = path.join(rootdir, key);
    var destfile = path.join(rootdir, val);
    console.log("copying: " + srcfile);
    console.log("     to: " + destfile);
    var destdir = path.dirname(destfile);
    if (!fs.existsSync(destdir)) {
      fs.mkdirSync(destdir);
    }
    if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
      fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
    }
  });
});
console.log("~~~~ End Copying Notification Status Icons");
