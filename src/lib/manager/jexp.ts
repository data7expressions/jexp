/* eslint-disable no-use-before-define */
import { expressions as exp, IExpressions } from '3xpr'
import { jemv, Jemv, ValidationResult } from 'jemv'
import { ExpressionConstraintBuilder } from './schema'
const CryptoJS = require('crypto-js')

export class Jexp {
	private exp: IExpressions
	private jemv: Jemv
	constructor () {
		this.exp = exp
		this.exp.addFunction('toBase64', (value: string):string => CryptoJS.enc.Base64.parse(value))
		this.exp.addFunction('getBase64', (value: string): string => CryptoJS.enc.Base64.stringify(value))
		this.exp.addFunction('encrypt', (value: string, key:string):string => CryptoJS.AES.encrypt(value, key).toString())
		this.exp.addFunction('decrypt', (value: string, key:string):string => {
			const bytes = CryptoJS.AES.decrypt(value, key)
			return bytes.toString(CryptoJS.enc.Utf8)
		})
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
