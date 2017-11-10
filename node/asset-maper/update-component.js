const { targetFolderName } = require('./options');
const toPascalCase = require('to-pascal-case');
const { counter } = require('./counter');
const { strName } = require('./version');
const colors = require('colors/safe');
const fs = require('fs');

/**
 * Update parent component class file
 * @param {*} mappingClassName - asset class name mapped
 * @param {*} name - component name
 * @param {*} path - component assets folder path
 */
async function updateComponent(mappingClassName, name, path){
  const workingPath = path.replace(`${targetFolderName}/`, '')
  const componentPath = `${workingPath}${name}.component.ts`
  let componentContents
  let originalContents
  try {
    componentContents = await fs.readFileSync(componentPath).toString()
    originalContents = componentContents
  }
  catch(ex) {
    console.log(`...failed to read file '${componentPath}'`)
  }

  if (componentContents) {

    /* insert the es6 import statement at the top of the file */
    const impPat = new RegExp(`import[\\s\\n]*{[\\s\\n\\w,]*}[\\s\\n]*from[\\s\\n]*['|"]./${targetFolderName}/_${name}-assets['|"];*`)
    if (!impPat.test(componentContents)) {
      componentContents =
        `import { ${mappingClassName} } from './assets/_${name}-assets';\n${componentContents}`
    }

    /* extend class from generated Assets class */
    const extPat = new RegExp(`(class[\\s\\n]+${toPascalCase(name)}Component)(?!([\\s\\n]*extends[\\s\\n]+${mappingClassName}))`)
    componentContents = componentContents.replace(
      extPat,
      `$1 extends ${mappingClassName}`
    )

    /* insert constructor if not exist */
    componentContents = componentContents.replace(
      /(class[\w\s]*{)(?!([\s\n]*constructor(?!\w)))/,
      '$1\n  constructor() { super() }\n'
    )

    /* insert super in the constructor */
    componentContents = componentContents.replace(
      /(constructor[\s\n]*\(([,:\s\n\w\d]*)\)[\s\n]*{)(?!([\s\n]*super))/,
      '$1 super();'
    )

    try {
      if (componentContents !== originalContents) {
        //console.log(colors.red('not equal to original file'))
        await fs.writeFileSync(componentPath, componentContents)
        console.log(`...${strName} updated file:`, componentPath)
        counter.filesUpdated++;
      }
    }
    catch(ex) {
      console.log(colors.red(ex))
    }
  }
}

module.exports.updateComponent = updateComponent
