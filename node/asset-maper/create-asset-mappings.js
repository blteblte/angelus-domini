const { getAssetsFileContents } = require('./get-assets-file-contents');
const { targetFolderName, supportedExtensions } = require('./options');
const { createAssetScss } = require('./create-asset-scss.js');
const { updateComponent } = require('./update-component');
const { counter } = require('./counter');
const { strName } = require('./version');
const toPascalCase = require('to-pascal-case');
const fs = require('fs');

/**
 * Create asset mapings for supported file extensions in 'assets' folders
 * @param {*} path - starting path to recursively search for 'assets' directories
 * @param {*} isAssetsFolder - recursion param explicitly noting that iteration
 * is inside the 'assets' folder
 */
async function createAssetMapings(path, isAssetsFolder = false) {
  const files = await fs.readdirSync(path)
  if (files !== undefined) {
    let assets = []

    for (let file of files) {
      const workingPath = `${path}${file}`
      if (await fs.lstatSync(workingPath).isDirectory()) {
        await createAssetMapings(`${workingPath}/`, file.toLowerCase() === targetFolderName)
      }
      else if (isAssetsFolder) {
        if (await fs.lstatSync(workingPath).isFile()) {
          supportedExtensions.forEach(ext => {
            if (file.toLowerCase().includes(ext)) {
              assets.push(file)
            }
          })
        }
      }
    }

    if (assets.length) {
      const foldersArr = path.split('/')
      const name = foldersArr[foldersArr.length - 3]
      const assetsClassName = toPascalCase(name) + 'Assets'
      const assetsFileName = `_${name}-assets.ts`
      const fullPath = path + assetsFileName

      const data = getAssetsFileContents(assetsClassName, assets)
      let existingFileContents = ''
      try { existingFileContents = await fs.readFileSync(fullPath).toString() } catch(ex) { }

      if (existingFileContents !== data) {
        await fs.writeFileSync(fullPath, data)
        console.log(`...${strName} updated file:`, fullPath)
        counter.filesUpdated++;
        await updateComponent(assetsClassName, name, path)
        //await createAssetScss(name, path, assets)
      }
    }
  }
}

module.exports.createAssetMapings = createAssetMapings
