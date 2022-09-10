import { Constraint, Schema } from 'jemv'

export interface ExpressionSchema extends Schema {
	expression?: string
}

export interface ExpressionConstraint extends Constraint {
	expression: string
}
