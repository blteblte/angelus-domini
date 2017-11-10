const { createAssetMapings } = require('./create-asset-mappings');
const { folderToScan, targetFolderName } = require('./options');
const { strName, version } = require('./version');
const { counter } = require('./counter');
const colors = require('colors/safe');

const strTargetFolderName = colors.bold(colors.cyan(`'${targetFolderName}'`))
const strFolderToScan = colors.bold(colors.cyan(`'${folderToScan}*'`))

/* starting point */
async function MapAssets() {
  const resetColor = '\x1b[0m'
  console.log(`${resetColor}...${strName} version ${version}. Scanning for ${strTargetFolderName} folders in ${strFolderToScan}${resetColor}`)
  await createAssetMapings(folderToScan)
  const strUpdateResult = counter.filesUpdated === 0 ? colors.blue('- no changes detected') : ''
  console.log(`${resetColor}...${strName} updated ${counter.filesUpdated} files. ${colors.blue('Done')} ${strUpdateResult}${resetColor}\n`)
}

module.exports = { MapAssets }
