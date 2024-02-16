[jexp](../README.md) / ExpressionSchema

# Interface: ExpressionSchema

## Hierarchy

- `Schema`

  ↳ **`ExpressionSchema`**

## Table of contents

### Properties

- [$anchor](ExpressionSchema.md#$anchor)
- [$defs](ExpressionSchema.md#$defs)
- [$extends](ExpressionSchema.md#$extends)
- [$id](ExpressionSchema.md#$id)
- [$ref](ExpressionSchema.md#$ref)
- [$schema](ExpressionSchema.md#$schema)
- [additionalItems](ExpressionSchema.md#additionalitems)
- [additionalProperties](ExpressionSchema.md#additionalproperties)
- [allOf](ExpressionSchema.md#allof)
- [anyOf](ExpressionSchema.md#anyof)
- [const](ExpressionSchema.md#const)
- [contains](ExpressionSchema.md#contains)
- [contentEncoding](ExpressionSchema.md#contentencoding)
- [contentMediaType](ExpressionSchema.md#contentmediatype)
- [contentSchema](ExpressionSchema.md#contentschema)
- [dependencies](ExpressionSchema.md#dependencies)
- [dependentRequired](ExpressionSchema.md#dependentrequired)
- [dependentSchemas](ExpressionSchema.md#dependentschemas)
- [else](ExpressionSchema.md#else)
- [enum](ExpressionSchema.md#enum)
- [exclusiveMaximum](ExpressionSchema.md#exclusivemaximum)
- [exclusiveMinimum](ExpressionSchema.md#exclusiveminimum)
- [expression](ExpressionSchema.md#expression)
- [format](ExpressionSchema.md#format)
- [if](ExpressionSchema.md#if)
- [items](ExpressionSchema.md#items)
- [maxContains](ExpressionSchema.md#maxcontains)
- [maxItems](ExpressionSchema.md#maxitems)
- [maxLength](ExpressionSchema.md#maxlength)
- [maxProperties](ExpressionSchema.md#maxproperties)
- [maximum](ExpressionSchema.md#maximum)
- [minContains](ExpressionSchema.md#mincontains)
- [minItems](ExpressionSchema.md#minitems)
- [minLength](ExpressionSchema.md#minlength)
- [minProperties](ExpressionSchema.md#minproperties)
- [minimum](ExpressionSchema.md#minimum)
- [multipleOf](ExpressionSchema.md#multipleof)
- [name](ExpressionSchema.md#name)
- [not](ExpressionSchema.md#not)
- [oneOf](ExpressionSchema.md#oneof)
- [pattern](ExpressionSchema.md#pattern)
- [patternProperties](ExpressionSchema.md#patternproperties)
- [prefixItems](ExpressionSchema.md#prefixitems)
- [properties](ExpressionSchema.md#properties)
- [propertyNames](ExpressionSchema.md#propertynames)
- [required](ExpressionSchema.md#required)
- [then](ExpressionSchema.md#then)
- [title](ExpressionSchema.md#title)
- [type](ExpressionSchema.md#type)
- [unevaluatedItems](ExpressionSchema.md#unevaluateditems)
- [unevaluatedProperties](ExpressionSchema.md#unevaluatedproperties)
- [uniqueItems](ExpressionSchema.md#uniqueitems)

## Properties

### $anchor

• `Optional` **$anchor**: `string`

#### Inherited from

Schema.$anchor

#### Defined in

node_modules/schema-manager/model/schema.d.ts:3

___

### $defs

• **$defs**: `any`

#### Inherited from

Schema.$defs

#### Defined in

node_modules/schema-manager/model/schema.d.ts:6

___

### $extends

• `Optional` **$extends**: `string`

#### Inherited from

Schema.$extends

#### Defined in

node_modules/schema-manager/model/schema.d.ts:5

___

### $id

• `Optional` **$id**: `string`

#### Inherited from

Schema.$id

#### Defined in

node_modules/schema-manager/model/schema.d.ts:2

___

### $ref

• `Optional` **$ref**: `string`

#### Inherited from

Schema.$ref

#### Defined in

node_modules/schema-manager/model/schema.d.ts:7

___

### $schema

• `Optional` **$schema**: `string`

#### Inherited from

Schema.$schema

#### Defined in

node_modules/schema-manager/model/schema.d.ts:4

___

### additionalItems

• `Optional` **additionalItems**: `any`

#### Inherited from

Schema.additionalItems

#### Defined in

node_modules/jemv/model/schema.d.ts:65

___

### additionalProperties

• `Optional` **additionalProperties**: `any`

#### Inherited from

Schema.additionalProperties

#### Defined in

node_modules/jemv/model/schema.d.ts:52

___

### allOf

• `Optional` **allOf**: `Schema`[]

#### Inherited from

Schema.allOf

#### Defined in

node_modules/jemv/model/schema.d.ts:67

___

### anyOf

• `Optional` **anyOf**: `Schema`[]

#### Inherited from

Schema.anyOf

#### Defined in

node_modules/jemv/model/schema.d.ts:68

___

### const

• `Optional` **const**: `any`

#### Inherited from

Schema.const

#### Defined in

node_modules/jemv/model/schema.d.ts:63

___

### contains

• `Optional` **contains**: `Boolean` \| `Schema`

#### Inherited from

Schema.contains

#### Defined in

node_modules/jemv/model/schema.d.ts:60

___

### contentEncoding

• `Optional` **contentEncoding**: `string`

#### Inherited from

Schema.contentEncoding

#### Defined in

node_modules/jemv/model/schema.d.ts:44

___

### contentMediaType

• `Optional` **contentMediaType**: `string`

#### Inherited from

Schema.contentMediaType

#### Defined in

node_modules/jemv/model/schema.d.ts:45

___

### contentSchema

• `Optional` **contentSchema**: `ContentSchema`

#### Inherited from

Schema.contentSchema

#### Defined in

node_modules/jemv/model/schema.d.ts:46

___

### dependencies

• `Optional` **dependencies**: `any`

#### Inherited from

Schema.dependencies

#### Defined in

node_modules/jemv/model/schema.d.ts:55

___

### dependentRequired

• `Optional` **dependentRequired**: `any`

#### Inherited from

Schema.dependentRequired

#### Defined in

node_modules/jemv/model/schema.d.ts:54

___

### dependentSchemas

• `Optional` **dependentSchemas**: `any`

#### Inherited from

Schema.dependentSchemas

#### Defined in

node_modules/jemv/model/schema.d.ts:56

___

### else

• `Optional` **else**: `Schema`

#### Inherited from

Schema.else

#### Defined in

node_modules/jemv/model/schema.d.ts:73

___

### enum

• `Optional` **enum**: `string`[]

#### Inherited from

Schema.enum

#### Defined in

node_modules/jemv/model/schema.d.ts:34

___

### exclusiveMaximum

• `Optional` **exclusiveMaximum**: `number`

#### Inherited from

Schema.exclusiveMaximum

#### Defined in

node_modules/jemv/model/schema.d.ts:37

___

### exclusiveMinimum

• `Optional` **exclusiveMinimum**: `number`

#### Inherited from

Schema.exclusiveMinimum

#### Defined in

node_modules/jemv/model/schema.d.ts:38

___

### expression

• `Optional` **expression**: `string`

#### Defined in

[src/lib/model/schema.ts:4](https://github.com/data7expressions/jexp/blob/634e26e/src/lib/model/schema.ts#L4)

___

### format

• `Optional` **format**: `string`

#### Inherited from

Schema.format

#### Defined in

node_modules/jemv/model/schema.d.ts:42

___

### if

• `Optional` **if**: `Schema`

#### Inherited from

Schema.if

#### Defined in

node_modules/jemv/model/schema.d.ts:71

___

### items

• `Optional` **items**: `Schema`

#### Inherited from

Schema.items

#### Defined in

node_modules/jemv/model/schema.d.ts:32

___

### maxContains

• `Optional` **maxContains**: `number`

#### Inherited from

Schema.maxContains

#### Defined in

node_modules/jemv/model/schema.d.ts:61

___

### maxItems

• `Optional` **maxItems**: `number`

#### Inherited from

Schema.maxItems

#### Defined in

node_modules/jemv/model/schema.d.ts:57

___

### maxLength

• `Optional` **maxLength**: `number`

#### Inherited from

Schema.maxLength

#### Defined in

node_modules/jemv/model/schema.d.ts:40

___

### maxProperties

• `Optional` **maxProperties**: `number`

#### Inherited from

Schema.maxProperties

#### Defined in

node_modules/jemv/model/schema.d.ts:48

___

### maximum

• `Optional` **maximum**: `number`

#### Inherited from

Schema.maximum

#### Defined in

node_modules/jemv/model/schema.d.ts:36

___

### minContains

• `Optional` **minContains**: `number`

#### Inherited from

Schema.minContains

#### Defined in

node_modules/jemv/model/schema.d.ts:62

___

### minItems

• `Optional` **minItems**: `number`

#### Inherited from

Schema.minItems

#### Defined in

node_modules/jemv/model/schema.d.ts:58

___

### minLength

• `Optional` **minLength**: `number`

#### Inherited from

Schema.minLength

#### Defined in

node_modules/jemv/model/schema.d.ts:41

___

### minProperties

• `Optional` **minProperties**: `number`

#### Inherited from

Schema.minProperties

#### Defined in

node_modules/jemv/model/schema.d.ts:49

___

### minimum

• `Optional` **minimum**: `number`

#### Inherited from

Schema.minimum

#### Defined in

node_modules/jemv/model/schema.d.ts:35

___

### multipleOf

• **multipleOf**: `number`

#### Inherited from

Schema.multipleOf

#### Defined in

node_modules/jemv/model/schema.d.ts:39

___

### name

• `Optional` **name**: `string`

#### Inherited from

Schema.name

#### Defined in

node_modules/jemv/model/schema.d.ts:30

___

### not

• `Optional` **not**: `Schema`

#### Inherited from

Schema.not

#### Defined in

node_modules/jemv/model/schema.d.ts:70

___

### oneOf

• `Optional` **oneOf**: `Schema`[]

#### Inherited from

Schema.oneOf

#### Defined in

node_modules/jemv/model/schema.d.ts:69

___

### pattern

• `Optional` **pattern**: `string`

#### Inherited from

Schema.pattern

#### Defined in

node_modules/jemv/model/schema.d.ts:43

___

### patternProperties

• `Optional` **patternProperties**: `any`

#### Inherited from

Schema.patternProperties

#### Defined in

node_modules/jemv/model/schema.d.ts:51

___

### prefixItems

• `Optional` **prefixItems**: `any`

#### Inherited from

Schema.prefixItems

#### Defined in

node_modules/jemv/model/schema.d.ts:64

___

### properties

• `Optional` **properties**: `any`

#### Inherited from

Schema.properties

#### Defined in

node_modules/jemv/model/schema.d.ts:31

___

### propertyNames

• `Optional` **propertyNames**: `PropertyNames`

#### Inherited from

Schema.propertyNames

#### Defined in

node_modules/jemv/model/schema.d.ts:50

___

### required

• `Optional` **required**: `string`[]

#### Inherited from

Schema.required

#### Defined in

node_modules/jemv/model/schema.d.ts:47

___

### then

• `Optional` **then**: `Schema`

#### Inherited from

Schema.then

#### Defined in

node_modules/jemv/model/schema.d.ts:72

___

### title

• `Optional` **title**: `string`

#### Inherited from

Schema.title

#### Defined in

node_modules/jemv/model/schema.d.ts:29

___

### type

• `Optional` **type**: `PropertyType` \| `PropertyType`[]

#### Inherited from

Schema.type

#### Defined in

node_modules/jemv/model/schema.d.ts:33

___

### unevaluatedItems

• `Optional` **unevaluatedItems**: `any`

#### Inherited from

Schema.unevaluatedItems

#### Defined in

node_modules/jemv/model/schema.d.ts:66

___

### unevaluatedProperties

• `Optional` **unevaluatedProperties**: `any`

#### Inherited from

Schema.unevaluatedProperties

#### Defined in

node_modules/jemv/model/schema.d.ts:53

___

### uniqueItems

• `Optional` **uniqueItems**: `boolean`

#### Inherited from

Schema.uniqueItems

#### Defined in

node_modules/jemv/model/schema.d.ts:59
