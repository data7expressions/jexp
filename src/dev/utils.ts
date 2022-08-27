const CliTest = require('command-line-test')

export class Utils {
	public static runTest (...params:any[]): string {
		const command = './bin/jfq.js -p ' + params.join(' ')
		const cliTest = new CliTest()
		return cliTest.exec(command)
	}
}
