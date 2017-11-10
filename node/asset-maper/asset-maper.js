const { createAssetMapings } = require('./create-asset-mappings');
const { folderToScan, targetFolderName } = require('./options');
const { strName, version } = require('./version');
const { counter } = require('./counter');
const colors = require('colors/safe');

const strTargetFolderName = colors.bold(colors.cyan(`'${targetFolderName}'`))
const strFolderToScan = colors.bold(colors.cyan(`'${folderToScan}*'`))

/* starting point */
function MapAssets() {
  console.log(`...${strName} version ${version}. Scanning for ${strTargetFolderName} folders in ${strFolderToScan}`)
  createAssetMapings(folderToScan).then((r) => {
    console.log(`...${strName} updated ${counter.filesUpdated} files. ${colors.blue('Done')} ${counter.filesUpdated === 0 ? colors.blue('- no changes detected') : ''}`)
  })
}

module.exports.MapAssets = MapAssets
