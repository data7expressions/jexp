#!/usr/bin/env node
import { expressions as exp } from 'js-expressions'
import { Helper } from './helper'
import path from 'path'
const yaml = require('js-yaml')

const readFile = async (file:string):Promise<any> => {
	const extension = path.extname(file)
	if (!['.json', '.yaml', 'yml'].includes(extension)) {
		throw Error(`extension ${extension} not supported `)
	}
	const content = await Helper.readFile(file)
	if (!content) {
		throw Error(`can not read file ${file}`)
	}
	if (extension === 'json') {
		return Helper.tryParse(content)
	} else {
		return yaml.load(content)
	}
}

export async function run () {
	try {
		if (process.argv.length !== 4) {
			console.error(`Error: 2 arguments were expected and 3 came ${process.argv.length - 2}`)
		}
		const expression = process.argv[2]
		const source = process.argv[3].trim()

		const data = (source.startsWith('[') || source.startsWith('{')) ? Helper.tryParse(source) : await readFile(source)
		if (data === null || data === undefined) {
			throw Error(`can not parse content of ${source}`)
		}
		const result = exp.eval(expression, { _: data })
		console.log(result)
	} catch (error:any) {
		console.error(error.stack)
	}
}
run()
