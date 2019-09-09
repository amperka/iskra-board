const releasesPath = '~/releases';

const fs = require('fs');
const child_process = require('child_process');

if (process.argv.length <= 2) {
  console.log('Usage: nodejs ./build cmd');
  console.log('cmd can be: { major | minor | patch }');
  process.exit(-1);
}

var version = fs.readFileSync('./current.version').toString().split('.');
var config = JSON.parse(fs.readFileSync('./config.json'));

switch (process.argv[2]) {
  case 'major':
    version[0]++;
    version[1] = 0;
    version[2] = 0;
    break;
  case 'minor':
    version[1]++;
    version[2] = 0;
    break;
  case 'patch':
    version[2]++;
    break;
  default:
    console.log('Usage: nodejs ./build cmd');
    console.log('cmd can be: { major | minor | patch }');
    process.exit(-1);
    break;
}

config.targets.forEach(function(target) {
  console.log('Target: ' + target);
  child_process.exec(
      'tar -cjpf ' + releasesPath + '/' + target + '/uploader-' +
          version.join('.') + '.tar.bz2 '+target+'/*',
      function(error, stdout, stderr) {
        if (!error) {
          console.log(stdout);
          console.log(
              'Done: ' + releasesPath + '/' + target + '/uploader-' +
              version.join('.') + '.tar.bz2');
        } else
          console.log(stderr);

        fs.writeFileSync('./current.version', version.join('.'));
      });
});
