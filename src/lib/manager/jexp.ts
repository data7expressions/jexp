import { expressions as exp, Expressions } from 'js-expressions'
import { jemv, Jemv, ValidationResult } from 'jemv'
import { ExpressionConstraintBuilder } from './schema'
import { JexpExtensionLib } from './expressions'

export class Jexp {
	private exp: Expressions
	private jemv: Jemv
	constructor () {
		this.exp = exp
		this.exp.config.addLibrary(new JexpExtensionLib())
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
