const claudReleasesPath = 'https://storage.googleapis.com/amperka-boards/releases';
const localReleasesPath = '~/releases';

const https = require('https');
const fs = require('fs');
const sha256File = require('sha256-file');
const beautify = require('json-beautify')

function loadFile(ext, cb) {
  var filename =
      '/tmp/tmp' + (Math.random() * 999999 + 10000).toString().substring(0, 5);
  const file = fs.createWriteStream(filename);
  const request = https.get(ext, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(function() {
        cb(filename)
      });
    });
  });
}

var Flag = function() {
  var cnt = 0;
  var cb = {};
  function Flag() {}
  function init(callback) {
    cb = callback;
  };
  var set = function() {
    cnt++;
  };
  var release = function() {
    cnt--;
    if (cnt === 0) cb();
  };
  return Object.freeze({set: set, release: release, init: init});
};

var flag = new Flag();
var config = {};

var amperkaAvr = {
  name: 'AmperkaAVR',
  maintainer: 'Amperka LLC',
  websiteURL: 'http://amperka.com',
  email: 'dev@amperka.com',
  platforms: [],
  tools: []
};

var amperkaArm = {
  name: 'AmperkaARM',
  maintainer: 'Amperka LLC',
  websiteURL: 'http://amperka.com',
  email: 'dev@amperka.com',
  platforms: [],
  tools: []
};

var allLoaded = function() {
  config.packages = [];
  config.packages.push(amperkaAvr);
  config.packages.push(amperkaArm);

  fs.writeFileSync(
      '../package_amperka_index.json', beautify(config, null, 2, 80));
}

flag.init(allLoaded);

var temp = JSON.parse(fs.readFileSync('./AmperkaAVR/platforms.json'));
temp.forEach(function(o) {
  flag.set();
  o.architecture = 'avr';
  o.archiveFileName = '/' + o.name + '-' + o.version + '.tar.bz2';
  o.url = claudReleasesPath + '/all' + o.archiveFileName;
  o.category = 'Contributed';
  o.help = {'online': 'https://github.com/amperka/amperka-boards'};
  loadFile(o.url, function(filename) {
    var stats = fs.statSync(filename);
    if (stats) {
      o.size = stats['size'].toString();
      o.checksum =
          'SHA-256:' + sha256File(filename).toString().toLocaleLowerCase();
      amperkaAvr.platforms.push(o);
      flag.release();
    } else {
      console.log('Core: ' + o.name + ' ' + o.version + ' not installed!');
      process.exit(-1);
    }
  });
});

function toolsArm() {
  var tools = JSON.parse(fs.readFileSync('./AmperkaARM/tools.json'));
  tools.forEach(function(tool) {
    tool.systems.forEach(function(target) {
      flag.set();
      var prefix = target.url[0];
      var extension = target.url[1];
      target.url = '';
      target.archiveFileName = '/' + tool.name + '-' + tool.version + extension;
      target.url = claudReleasesPath + '/' + prefix + target.archiveFileName;
      loadFile(target.url, function(filename) {
        var stats = fs.statSync(filename);
        if (stats) {
          target.size = stats['size'].toString();
          target.checksum =
              'SHA-256:' + sha256File(filename).toString().toLocaleLowerCase();
          flag.release();
        } else {
          console.log('Tool: ' + o.name + ' ' + o.version + ' not installed!');
          process.exit(-1);
        }
      });
    });
  });
  return tools;
}

var temp = JSON.parse(fs.readFileSync('./AmperkaARM/platforms.json'));
temp.forEach(function(o) {
  flag.set();
  o.architecture = 'stm32';
  o.archiveFileName = '/' + o.name + '-' + o.version + '.tar.bz2';
  o.url = claudReleasesPath + '/all' + o.archiveFileName;
  o.category = 'Contributed';
  o.help = {'online': 'https://github.com/amperka/amperka-boards'};
  loadFile(o.url, function(filename) {
    var stats = fs.statSync(filename);
    if (stats) {
      o.size = stats['size'].toString();
      o.checksum =
          'SHA-256:' + sha256File(filename).toString().toLocaleLowerCase();
      amperkaArm.platforms.push(o);
      amperkaArm.tools = toolsArm();
      flag.release();
    } else {
      console.log('Core: ' + o.name + ' ' + o.version + ' not installed!');
      process.exit(-1);
    }
  });
});
