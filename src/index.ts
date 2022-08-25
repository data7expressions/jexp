#!/usr/bin/env node
import { expressions as exp } from 'js-expressions'
import { Helper } from './helper'

const readFile = async (file:string):Promise<any> => {
	const content = await Helper.readFile(file)
	if (!content) {
		throw Error(`can not read file ${file}`)
	}
	const context = Helper.tryParse(content)
	if (context === null || content === undefined) {
		throw Error(`can not parse content of file ${file}`)
	}
	return context
}

export async function run () {
	try {
		if (process.argv.length !== 4) {
			console.error(`Error: 2 arguments were expected and 3 came ${process.argv.length - 2}`)
		}
		const execPath = process.argv[0]
		const currenPath = process.argv[1]
		const expression = process.argv[2]
		const source = process.argv[3]
		const data = await readFile(source)
		const result = exp.eval(expression, { _: data })
		console.log(result)
	} catch (error:any) {
		console.error(error.stack)
	}
}
run()
