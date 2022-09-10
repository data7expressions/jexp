import { ConstraintValidator, Constraint, Schema, ConstraintBuilder } from 'jemv'
import { Expressions } from 'js-expressions'
import { ExpressionConstraint, ExpressionSchema } from './../model'

export class ExpressionConstraintBuilder implements ConstraintBuilder {
	public build (property: Schema): Constraint[] {
		const constraints: ExpressionConstraint[] = []
		const _property = property as ExpressionSchema
		if (_property && _property.expression) {
			constraints.push({
				message: `Does not meet the expression ${_property.expression}`,
				expression: _property.expression
			})
		}
		return constraints
	}
}

export class ExpressionConstraintValidator implements ConstraintValidator {
	private expressions: Expressions
	constructor (expressions: Expressions) {
		this.expressions = expressions
	}

	public apply (constraint: Constraint): boolean {
		return 'expression' in (constraint as ExpressionConstraint)
	}

	public validate (constraint: Constraint, data: any): boolean {
		const expressionConstraint = constraint as ExpressionConstraint
		if (expressionConstraint !== undefined) {
			return this.expressions.eval(expressionConstraint.expression, data)
		} else {
			throw new Error('Undefined ExpressionConstraint')
		}
	}
}
