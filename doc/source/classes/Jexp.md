[jexp](../README.md) / Jexp

# Class: Jexp

## Table of contents

### Constructors

- [constructor](Jexp.md#constructor)

### Accessors

- [instance](Jexp.md#instance)

### Methods

- [eval](Jexp.md#eval)
- [validate](Jexp.md#validate)

## Constructors

### constructor

• **new Jexp**(): [`Jexp`](Jexp.md)

#### Returns

[`Jexp`](Jexp.md)

#### Defined in

[src/lib/manager/jexp.ts:10](https://github.com/data7expressions/jexp/blob/e6e31dd/src/lib/manager/jexp.ts#L10)

## Accessors

### instance

• `get` **instance**(): [`Jexp`](Jexp.md)

#### Returns

[`Jexp`](Jexp.md)

#### Defined in

[src/lib/manager/jexp.ts:24](https://github.com/data7expressions/jexp/blob/e6e31dd/src/lib/manager/jexp.ts#L24)

## Methods

### eval

▸ **eval**(`expression`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/manager/jexp.ts:31](https://github.com/data7expressions/jexp/blob/e6e31dd/src/lib/manager/jexp.ts#L31)

___

### validate

▸ **validate**(`schema`, `data`): `Promise`\<`ValidationResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `string` |
| `data` | `any` |

#### Returns

`Promise`\<`ValidationResult`\>

#### Defined in

[src/lib/manager/jexp.ts:35](https://github.com/data7expressions/jexp/blob/e6e31dd/src/lib/manager/jexp.ts#L35)
