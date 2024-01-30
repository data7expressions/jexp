[jexp](../README.md) / ExpressionConstraintBuilder

# Class: ExpressionConstraintBuilder

## Implements

- `IConstraintBuilder`

## Table of contents

### Constructors

- [constructor](ExpressionConstraintBuilder.md#constructor)

### Methods

- [apply](ExpressionConstraintBuilder.md#apply)
- [build](ExpressionConstraintBuilder.md#build)

## Constructors

### constructor

• **new ExpressionConstraintBuilder**(`expressions`): [`ExpressionConstraintBuilder`](ExpressionConstraintBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressions` | `Expressions` |

#### Returns

[`ExpressionConstraintBuilder`](ExpressionConstraintBuilder.md)

#### Defined in

[src/lib/manager/schema.ts:6](https://github.com/data7expressions/jexp/blob/e6e31dd/src/lib/manager/schema.ts#L6)

## Methods

### apply

▸ **apply**(`rule`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rule` | `Schema` |

#### Returns

`boolean`

#### Implementation of

IConstraintBuilder.apply

#### Defined in

[src/lib/manager/schema.ts:10](https://github.com/data7expressions/jexp/blob/e6e31dd/src/lib/manager/schema.ts#L10)

___

### build

▸ **build**(`schema`, `rule`): `IConstraint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `Schema` |
| `rule` | `Schema` |

#### Returns

`IConstraint`

#### Implementation of

IConstraintBuilder.build

#### Defined in

[src/lib/manager/schema.ts:14](https://github.com/data7expressions/jexp/blob/e6e31dd/src/lib/manager/schema.ts#L14)
