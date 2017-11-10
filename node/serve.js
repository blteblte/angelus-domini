const { MapAssets } = require('./asset-maper/asset-maper');
const { spawn } = require('child_process');
const colors = require('colors/safe');
const os = require('os');

function getLocalIp(ipMatchArr) {
  const networkInterfaces = os.networkInterfaces();
  let matchingIps = Object.keys(networkInterfaces).reduce((arr, name) => {
    const matchingInterface = networkInterfaces[name].find(iface =>
      iface.family === 'IPv4' && ipMatchArr.find(match => iface.address.includes(match)));
      if (matchingInterface) arr.push(matchingInterface.address);
      return arr;
  }, []);

  if (matchingIps.length) {
    return matchingIps[0];
  }
  else {
    throw(`Error. Unable to find ip to use as public host: ipMatches=['${ipMatchArr.join("', '")}']`);
  }
}

async function launchDevServer(address) {
  const port = process.env.port || 4200;
  const publicHostname = address + ":" + port;
  console.log(`${lv()} ${colors.green('@ WEB Resorts')}: access your NG LIVE DEV server on \x1b[33m http://${publicHostname} \x1b[0m ${lv()}`);
  // showInfo();
  const spawnOptions = { stdio: 'inherit', shell: true }

  /* map assets before build */
  // await MapAssets()

  spawn(
      "ng serve"
    , [
          "--host 0.0.0.0"
        , `--public ${publicHostname}`
      ]
    , spawnOptions
  );
}

function lv() {
  return `${colors.red('▮▮▮')}${colors.white('▮▮')}${colors.red('▮▮▮')}`
}

function showInfo() {
  console.log(colors.gray('*** For better development experience install the following chrome extensions:'));
  console.log(colors.gray(' - Redux DevTools:', 'https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd'));
  console.log(colors.gray(' - Apollo Client Developer Tools:', 'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm'));
}

/* execute */
launchDevServer(getLocalIp(['192.168.1.', '192.168.0.', '10.211.55.']));
