/* eslint-disable no-use-before-define */
import { expressions as exp, Expressions } from '3xpr'
import { jemv, Jemv, ValidationResult } from 'jemv'
import { ExpressionConstraintBuilder } from './schema'
const CryptoJS = require('crypto-js')

export class Jexp {
	private exp: Expressions
	private jemv: Jemv
	constructor () {
		this.exp = exp
		this.exp.addFunction('toBase64', (value: string):string => CryptoJS.enc.Base64.parse(value), { description: 'Converts a string to a Base64 object' })
		this.exp.addFunction('getBase64', (value: string): string => CryptoJS.enc.Base64.stringify(value), { description: 'Converts a Base64 object to a string' })
		this.exp.addFunction('encrypt', (value: string, key:string):string => CryptoJS.AES.encrypt(value, key).toString(), { description: 'Encrypts a string using AES' })
		this.exp.addFunction('decrypt', (value: string, key:string):string => {
			const bytes = CryptoJS.AES.decrypt(value, key)
			return bytes.toString(CryptoJS.enc.Utf8)
		}, { description: 'Decrypts a string using AES' })
		this.jemv = jemv
		this.jemv.addConstraintBuilder(new ExpressionConstraintBuilder(this.exp))
	}

	private static _instance: Jexp
	public static get instance (): Jexp {
		if (!this._instance) {
			this._instance = new Jexp()
		}
		return this._instance
	}

	public async eval (expression:string, data:any) : Promise<any> {
		return this.exp.eval(expression, { '.': data })
	}

	public async validate (schema:string, data:any) : Promise<ValidationResult> {
		return this.jemv.validate(schema, data)
	}
}
