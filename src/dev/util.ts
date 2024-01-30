/* eslint-disable indent */
import { Helper } from './../lib'

export async function show (list:any[]) {
	const examples = []
	for (const item of list) {
		try {
			const result = await Helper.utils.exec(item.cmd, process.cwd())
			let expect:any
			if (typeof result === 'string') {
				expect = `'${result}'`
			} else if (Array.isArray(result)) {
				if (result.length === 0) {
					expect = '[]'
				} else {
					if (typeof result[0] === 'string') {
						expect = '[' + result.map(p => `'${p}'`).join(',') + ']'
					} else if (typeof result[0] === 'object') {
						expect = JSON.stringify(result)
					} else {
						expect = '[' + result.join(',') + ']'
					}
				}
			} else if (typeof result === 'object') {
				expect = JSON.stringify(result)
			} else if (result === null) {
				expect = 'null'
			} else if (result === undefined) {
				expect = 'undefined'
			} else {
				expect = result
			}
			expect = expect.substring(1)
			expect = expect.substring(0, expect.length - 2)
			examples.push(
`
**${item.desc}**:

\`\`\`sh
${item.cmd}
\`\`\`

*Result*:

\`\`\`json
${expect}
\`\`\``)
		} catch (error) {
			console.log(`command: ${item.cmd} error: ${error}`)
		}
	}

	// await new Promise(resolve => setTimeout(resolve, 2 * 1000))
	console.log('Examples:')
	console.log(examples.join('\n'))
}
