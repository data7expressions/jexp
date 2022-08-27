#!/usr/bin/env node
import { expressions as exp, Helper } from 'js-expressions'
import path from 'path'
const { program, Option } = require('commander')
const colorize = require('json-colorizer')
const yaml = require('js-yaml')

const run = async (query:string, source:string, options:any) => {
	try {
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
		const result = exp.eval(query, { _: data })
		const forceJson = options.output === 'json'
		const forceYaml = options.output === 'yaml'
		if (forceYaml || (!forceJson && extension && ['.yaml', 'yml'].includes(extension))) {
			console.log(yaml.dump(result))
		} else {
			const formatted = options.beautiful ? JSON.stringify(result, null, 2) : JSON.stringify(result)
			if (options.decorate) {
				console.log(colorize(formatted))
			} else {
				console.log(formatted)
			}
		}
	} catch (error:any) {
		console.error(error.stack)
	}
}

async function main () {
	program
		.argument('<query>')
		.argument('<source>')
		.addOption(new Option('-o, --output <format>', 'Force output').choices(['json', 'yaml']))
		.option('-b, --beautiful', 'Beautiful output', true)
		.option('-d, --decorate', 'Decorate output', false)
		.option('-q, --query-file <path>', 'query file')
		.action(async (query:string, source:any, options:any) => {
			await run(query, source, options)
		})
	await program.parseAsync(process.argv)
}
main()
