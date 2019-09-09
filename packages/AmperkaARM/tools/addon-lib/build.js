const releasesPath = '~/releases';

const fs = require('fs');
const child_process = require('child_process');

if (process.argv.length <= 2) {
  console.log('Usage: nodejs ./build cmd');
  console.log('cmd can be: { major | minor | patch }');
  process.exit(-1);
}

var version = fs.readFileSync('./current.version').toString().split('.');

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

child_process.exec(
    'tar -cjpf ' + releasesPath + '/all/addon-lib-' + version.join('.') +
        '.tar.bz2 addon-lib/*',
    function(error, stdout, stderr) {
        if(!error) {
            console.log(stdout);
            console.log(
                'Done: ' + releasesPath + '/all/addon-lib-' + version.join('.') +
                '.tar.bz2');
        }
        else
            console.log(stderr);

      fs.writeFileSync('./current.version', version.join('.'));
    });
