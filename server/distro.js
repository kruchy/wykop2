const cpx = require('cpx')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const innoSetupCompiler = require("innosetup-compiler")

const BUILD_DIR = 'build'

console.log('distro.js running... from ' + __dirname)

if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
}

cpx.copySync('./**/!(build|*.njsproj|*.sln|README.md|distro.js|*.iss)', BUILD_DIR)
rimraf.sync(path.join(BUILD_DIR, 'test'))
rimraf.sync(path.join(BUILD_DIR, 'bin'))
cpx.copySync(path.join('..', 'front', 'build') + '/**/*', path.join(BUILD_DIR, 'public'))

innoSetupCompiler("installer.iss", {
    gui: false,
    verbose: false
}, function (error) {
    if (error) console.error('Error compiling iss', error)
});