/*
  Work in progress...
   - non functional -
   ... should use webpack to get asset urls same way they are required in angular
 */


const fs = require('fs');

//TODO:
async function createAssetScss(name, path, assets) {
  const scssContents = assets.reduce((contents, asset) => {
    //------------------------------------------------------ :: this WONT WORK!.. hmm
    const line = `\\n\$img-${asset.replace(/\s|\./g, '-')} = '${require(asset)}';`
    return contents += line
  }, '/* @autogenerated */');
  await fs.writeFileSync(`${path}_${name}-assets.scss`)
}

async function importInParentScss() {

}

module.exports.createAssetScss = createAssetScss
