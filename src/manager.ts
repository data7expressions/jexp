// import { Helper } from './helper'
// import path from 'path'
// const yaml = require('js-yaml')
// const Util = require('util')
// const exec = Util.promisify(require('child_process').exec)
// export class Manager {

// private escapeShell (cmd:string) {
// return cmd.replace(/(["'$`\\])/g, '\\$1')
// }

// private async exec (cmd:string, cwd:string = __dirname) {
// const { stdout, stderr } = await exec(this.escapeShell(cmd), { cwd: cwd })
// if (stderr && stderr.toLocaleLowerCase().indexOf('error') > -1) {
// throw new Error(`command: ${cmd}  error: ${stderr}`)
// }
// return stdout
// }

// public async getLocalPackage (name:string, workspace:string): Promise<string> {
// const exp = new RegExp(`${name}@(.*)\n`)
// const localNpmList = await this.exec('npm list --depth=0', workspace)
// const localMatches = localNpmList.match(exp)
// return (localMatches && localMatches[1] ? localMatches[1] : '').replace(/"invalid"/gi, '').trim()
// }

// public async getGlobalPackage (name:string): Promise<string> {
// const exp = new RegExp(`${name}@(.*)\n`)
// const globalNpmList = await this.exec('npm list -g --depth=0')
// const globalMatches = globalNpmList.match(exp)
// return (globalMatches && globalMatches[1] ? globalMatches[1] : '').replace(/"invalid"/gi, '').trim()
// }

// public async readData (data:any):Promise<any> {
// // read Data
// if (typeof data === 'string') {
// const _data = Helper.tryParse(data as string)
// if (_data !== null) {
// data = _data
// } else {
// try {
// data = await Helper.readFile(path.join(process.cwd(), data as string))
// data = JSON.parse(data as string)
// } catch (error) {
// throw new Error(`Error to read context: ${error}`)
// }
// }
// }
// return data
// }
// }
