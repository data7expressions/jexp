#!/usr/bin/env node
import { expressions as exp, Helper } from 'js-expressions'
import path from 'path'
const yaml = require('js-yaml')

export async function run () {
	try {
		if (process.argv.length !== 4) {
			throw new Error(`Error: 2 arguments were expected and 3 came ${process.argv.length - 2}`)
		}
		const expression = process.argv[2]
		const source = process.argv[3].trim()
		let data:any = {}
		let extension = ''
		if ((source.startsWith('[') || source.startsWith('{'))) {
			data = Helper.tryParse(source)
		} else {
			extension = path.extname(source)
			if (!['.json', '.yaml', 'yml'].includes(extension)) {
				throw Error(`extension ${extension} not supported `)
			}
			const content = await Helper.readFile(source)
			if (!content) {
				throw Error(`can not read file ${source}`)
			}
			if (extension === 'json') {
				data = Helper.tryParse(content)
			} else {
				data = yaml.load(content)
			}
		}
		if (data === null || data === undefined) {
			throw Error(`can not parse content of ${source}`)
		}
		const result = exp.eval(expression, { _: data })
		if (extension && ['.yaml', 'yml'].includes(extension)) {
			console.log(yaml.dump(result))
		} else {
			console.log(JSON.stringify(result, null, 2))
		}
	} catch (error:any) {
		console.error(error.stack)
	}
}
run()
