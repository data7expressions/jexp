import { Schema, IConstraint, IConstraintBuilder, FunctionConstraint, EvalError } from 'jemv'
import { Expressions } from 'js-expressions'
import { ExpressionSchema } from './../model'
export class ExpressionConstraintBuilder implements IConstraintBuilder {
	private expressions: Expressions
	constructor (expressions: Expressions) {
		this.expressions = expressions
	}

	public apply (rule: Schema):boolean {
		return (rule as ExpressionSchema).expression !== undefined
	}

	public build (schema:Schema, rule: Schema): IConstraint {
		const _rule = rule as ExpressionSchema
		if (_rule.expression === undefined) {
			throw new Error('Expression not define')
		}
		const expression = _rule.expression
		return new FunctionConstraint(
			(value:any, path:string) : EvalError[] => {
				const result = this.expressions.eval(expression, value)
				return result ? [] : [{ path: path, message: `does not meet the expression ${expression}` }]
			}
		)
	}
}
