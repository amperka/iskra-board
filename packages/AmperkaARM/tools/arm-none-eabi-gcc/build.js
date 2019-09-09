/* !!!! должен быть установлен github lfs: https://git-lfs.github.com/  !!!!! */

const releasesPath = '/home/yury/projects/amperka-boards/releases';

const https = require('https');
const fs = require('fs');
const child_process = require('child_process');

if (process.argv.length <= 2) {
  console.log('Usage: nodejs ./build {version as XX.XX.XX}');
  process.exit(-1);
}

var config = JSON.parse(fs.readFileSync('./' + process.argv[2] + '.json'));

config.forEach(function(cfg) {
  switch (cfg.method) {
    case 'repac-tgz-from-github-releases':
      var linkFile = fs.createWriteStream(
          '/tmp/' + process.argv[2] + '.' + cfg.target + '.html');
      var file = fs.createWriteStream(
          '/tmp/' + process.argv[2] + '.' + cfg.target + '.tar.gz');
      var request = https.get(cfg['remote-url'], function(linkResponse) {
        linkResponse.pipe(linkFile);
        linkFile.on('finish', function() {
          fs.readFile(
              '/tmp/' + process.argv[2] + '.' + cfg.target + '.html',
              function(err, data) {
                if (!err) {
                  var m = data.toString().match(/\<a href\=\"(.+)"\>/);
                  console.log('Real path: ' + m[1]);
                  var request = https.get(m[1], function(response) {
                    response.pipe(file);
                    file.on('finish', function() {
                      file.close(function() {
                        child_process.exec(
                            'gunzip -c < /tmp/' + process.argv[2] + '.' +
                                cfg.target + '.tar.gz | bzip2 -c > ' +
                                releasesPath + '/' + cfg.target + '/' +
                                cfg['storage-name'],
                            function(error, stdout, stderr) {
                              console.log(
                                  'Done: ' + releasesPath + '/' + cfg.target +
                                  '/' + cfg['storage-name']);
                            });
                      });
                    });
                  });
                }
              });
        });
      });
      break;
    case 'rename-from-github-releases':
      var linkFile = fs.createWriteStream(
          '/tmp/' + process.argv[2] + '.' + cfg.target + '.html');
      var file = fs.createWriteStream(
          '/tmp/' + process.argv[2] + '.' + cfg.target + '.tar.bz2');
      var request = https.get(cfg['remote-url'], function(linkResponse) {
        linkResponse.pipe(linkFile);
        linkFile.on('finish', function() {
          fs.readFile(
              '/tmp/' + process.argv[2] + '.' + cfg.target + '.html',
              function(err, data) {
                if (!err) {
                  var m = data.toString().match(/\<a href\=\"(.+)"\>/);
                  console.log('Real path: ' + m[1]);
                  var request = https.get(m[1], function(response) {
                    response.pipe(file);
                    file.on('finish', function() {
                      file.close(function() {
                        child_process.exec(
                            'cp /tmp/' + process.argv[2] + '.' + cfg.target +
                                '.tar.bz2 ' + releasesPath + '/' + cfg.target +
                                '/' + cfg['storage-name'],
                            function(error, stdout, stderr) {
                              console.log(
                                  'Done: ' + releasesPath + '/' + cfg.target +
                                  '/' + cfg['storage-name']);
                            });
                      });
                    });
                  });
                }
              });
        });
      });
      break;
    case 'repac-from-github-lfs':
      child_process.exec(
          'mkdir /tmp/cmsis; cd /tmp/cmsis; git lfs clone ' +
              cfg['remote-url'] + ';tar -cjpf ' + releasesPath + '/' +
              cfg.target + '/' + cfg['storage-name'] + ' CMSIS_5/*',
          function(error, stdout, stderr) {
            console.log(
                'Done: ' + releasesPath + '/' + cfg.target + '/' +
                cfg['storage-name']);
          });
      break;
    default:
      break;
  }
});
