/* !!!! должен быть установлен github lfs: https://git-lfs.github.com/  !!!!! */

const releasesPath = '~/releases';

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
                              if(error)
                                console.log(stdout+stderr);
                              else 
                                {
                                  console.log(stdout);
                                  console.log(
                                  'Done: ' + releasesPath + '/' + cfg.target +
                                  '/' + cfg['storage-name']);
                                }
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
                                '/' + cfg['storage-name'] + '; ' +
                            'rm -f /tmp/' + process.argv[2] + '.' + cfg.target + '.tar.bz2 ;' +
                            'rm -f /tmp/' + process.argv[2] + '.' + cfg.target + '.html ;'
                            ,
                            function(error, stdout, stderr) {
                              if(error)
                                console.log(stdout+stderr);
                              else 
                                {
                                  console.log(stdout);
                                  console.log(
                                  'Done: ' + releasesPath + '/' + cfg.target +
                                  '/' + cfg['storage-name']);
                                }
                            }
                        );
                      });
                    });
                  });
                }
              });
        });
      });
      break;
      case 'repack-from-github-releases':
        var linkFile = fs.createWriteStream(
            '/tmp/' + process.argv[2] + '.' + cfg.target + '.html');
        var file = fs.createWriteStream(
            '/tmp/arm-gcc.zip');
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
                              'cd /tmp ; ' +
                              'mkdir -p /tmp/arm-none-eabi-gcc ; '+
                              'echo mkdir done ;' +
                              'unzip -uo /tmp/arm-gcc.zip -d /tmp/arm-none-eabi-gcc ; ' +
                              'echo unzip done ;' +
                              'tar -cjpf ' + releasesPath + '/' + cfg.target + '/' + cfg['storage-name'] + ' arm-none-eabi-gcc/* ; ' +
                              'echo tar done ;' +
                              'rm -f /tmp/arm-gcc.zip ; ' +
                              'echo rm done ;' +
                              'rm -Rf /tmp/arm-none-eabi-gcc ;' +
                              'echo rmdir done ;'
                              ,                       
                              function(error, stdout, stderr) {
                                if(error)
                                  console.log(stdout+stderr);
                                else 
                                  {
                                    console.log(stdout);
                                    console.log(
                                      'Done: ' + releasesPath + '/' + cfg.target +
                                      '/' + cfg['storage-name']);
                                  }
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
          'mkdir /tmp/cmsis ; ' +
          'cd /tmp/cmsis ; ' +
          'git lfs clone ' + cfg['remote-url'] + ' ; '+
          'tar -cjpf ' + releasesPath + '/' + cfg.target + '/' + cfg['storage-name'] + ' CMSIS_5/* ;' +
          'rm -Rf /tmp/cmsis'
          ,
          function(error, stdout, stderr) {
            if(error)
              console.log(stdout+stderr);
            else 
              {
                console.log(stdout);
                console.log(
                'Done: ' + releasesPath + '/' + cfg.target + '/' +
                cfg['storage-name']);
              }
          });
      break;
    default:
      break;
  }
});
