const fs = require('fs')
const path = require('path')

const isBinary = require('isbinaryfile')

async function generate (dir, files, base = '', rootOptions = {}) {
  const glob = require('glob')

  glob.sync('**/*', {
    cwd: dir,
    nodir: true
  }).forEach(rawPath => {
    const sourcePath = path.resolve(dir, rawPath)
    const filename = path.join(base, rawPath)

    if (isBinary.sync(sourcePath)) {
      files[filename] = fs.readFileSync(sourcePath) // return buffer
    } else {
      let content = fs.readFileSync(sourcePath, 'utf-8')
      if (path.basename(filename) === 'manifest.json') {
        content = content.replace('{{name}}', rootOptions.projectName || '')
      }
      if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
        files[`.${filename.slice(1)}`] = content
      } else if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
        files[`${filename.slice(1)}`] = content
      } else {
        files[filename] = content
      }
    }
  })
}

module.exports = (api, options, rootOptions) => {
  api.extendPackage(pkg => {
    return {
      dependencies: {
        'regenerator-runtime': '^0.12.1',// 锁定版本，避免高版本在小程序中出错
        '@dcloudio/uni-helper-json': '*',
        'eslint-loader': '^4.0.2',
        'node-sass': '^4.11.0',
        'sass-loader': '^7.1.0'
      },
      devDependencies: {
        'postcss-comment': '^2.0.0',
        '@dcloudio/types': '*',
        'miniprogram-api-typings': '*',
        'mini-types': '*',
        'prettier': '^1.19.1',
        'eslint': '^5.16.0',
        'eslint-plugin-html': '^5.0.0',
        'eslint-plugin-node': '^10.0.0',
        'eslint-plugin-typescript': '^0.14.0',
        'eslint-plugin-vue': '^5.2.3',
        '@typescript-eslint/parser': '^1.10.2',
        '@vue/eslint-config-standard': '^4.0.0',
        '@vue/cli-plugin-eslint': '^4.0.4',
        '@typescript-eslint/eslint-plugin': '2.33.0'
      }
    }
  })
  if (options.template === 'default-ts') { // 启用 typescript
    api.extendPackage(pkg => {
      return {
        dependencies: {
          'vue-class-component': '^6.3.2',
          'vue-property-decorator': '^8.0.0'
        },
        devDependencies: {
          '@babel/plugin-syntax-typescript': '^7.2.0',
          '@vue/cli-plugin-typescript': '*',
          'typescript': api.hasPlugin('eslint') ? '~3.1.1' : '^3.0.0'
        }
      }
    })
  }

  api.render(async function (files) {
    Object.keys(files).forEach(name => {
      delete files[name]
    })

    const template = options.repo || options.template
    const base = 'src'

    await generate(path.resolve(__dirname, './template/common'), files)
    await generate(path.resolve(__dirname, './template/default-ts'), files, base, rootOptions)

    // if (template === 'default') {
    //   await generate(path.resolve(__dirname, './template/default'), files, base, rootOptions)
    // } else if (template === 'default-ts') {
    //   await generate(path.resolve(__dirname, './template/default-ts'), files, base, rootOptions)
    // } else {
    //   const ora = require('ora')
    //   const home = require('user-home')
    //   const download = require('download-git-repo')

    //   const spinner = ora('模板下载中...')
    //   spinner.start()

    //   const tmp = path.join(home, '.uni-app/templates', template.replace(/[/:]/g, '-'), 'src')

    //   if (fs.existsSync(tmp)) {
    //     try {
    //       require('rimraf').sync(tmp)
    //     } catch (e) {
    //       console.error(e)
    //     }
    //   }

    //   await new Promise((resolve, reject) => {
    //     download(template, tmp, err => {
    //       spinner.stop()
    //       if (err) {
    //         return reject(err)
    //       }
    //       resolve()
    //     })
    //   })

    //   await generate(tmp, files, base)
    // }
  })
}
