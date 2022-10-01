#!/usr/bin/env node
import { jexp, SourceInfo } from './'
import { Helper } from './manager'
import path from 'path'
const { program, Option } = require('commander')
const yaml = require('js-yaml')

const to = (result:any, options?:any, extension?:string) : any => {
	const forceJson = options ? options.output === 'json' : undefined
	const forceYaml = options ? options.output === 'yaml' : undefined
	const beautiful = options && options.beautiful !== undefined ? options.beautiful : false
	if (forceYaml || (!forceJson && extension && ['.yaml', 'yml'].includes(extension))) {
		return yaml.dump(result)
	} else {
		const formatted = beautiful ? JSON.stringify(result, null, 2) : JSON.stringify(result)
		return formatted
	}
}

const getSource = async (source:any) : Promise<SourceInfo> => {
	if (typeof source !== 'string') {
		if (typeof source === 'object') {
			return { data: source }
		}
		throw new Error('invalid source')
	}

	const info:SourceInfo = { data: {} }
	if ((source.startsWith('[') || source.startsWith('{'))) {
		info.data = Helper.utils.tryParse(source)
	} else {
		info.extension = path.extname(source)
		if (!['.json', '.yaml', 'yml'].includes(info.extension)) {
			throw Error(`extension ${info.extension} not supported `)
		}
		const content = await Helper.fs.read(source)
		if (!content) {
			throw Error(`can not read file ${source}`)
		}
		if (info.extension === 'json') {
			info.data = Helper.utils.tryParse(content)
		} else {
			info.data = yaml.load(content)
		}
	}
	if (info.data === null || info.data === undefined) {
		throw Error(`can not parse content of ${source}`)
	}
	return info
}

const getInput = async () => {
	// https://wellingguzman.com/notes/node-pipe-input
	return new Promise(function (resolve, reject) {
		const stdin = process.stdin
		let data = ''
		stdin.setEncoding('utf8')
		stdin.on('data', function (chunk) {
			data += chunk
		})
		stdin.on('end', function () {
			resolve(data)
		})
		stdin.on('error', reject)
	})
}

async function main () {
	program
		.name('eval')
		.command('eval <expression> [source]')
		.addOption(new Option('-o, --output <format>', 'Force output').choices(['json', 'yaml']))
		.option('-b, --beautiful', 'Beautiful output', false)
		.option('-q, --query-file <path>', 'query file')
		.action(async (expression:string, source:any, options:any) => {
			try {
				const _source = (source !== undefined) ? source : await getInput() as any
				const sourceInfo = await getSource(_source)
				const result = await jexp.eval(expression, sourceInfo.data)
				const output = to(result, options, sourceInfo.extension)
				console.log(output)
			} catch (error:any) {
				console.error(error.message)
			}
		})
	program
		.name('validate')
		.command('validate <schema> [source]')
		.addOption(new Option('-o, --output <format>', 'Force output').choices(['json', 'yaml']))
		.option('-b, --beautiful', 'Beautiful output', false)
		.action(async (schema:string, source:any, options:any) => {
			try {
				const _source = (source !== undefined) ? source : await getInput() as any
				const sourceInfo = await getSource(_source)
				const result = await jexp.validate(schema, sourceInfo.data)
				const output = to(result, options, sourceInfo.extension)
				console.log(output)
			} catch (error:any) {
				console.error(error.message)
			}
		})
	await program.parseAsync(process.argv)
}
main()
