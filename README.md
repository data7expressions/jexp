# JEXP

Command line application that allows parser and evaluator of json/yaml applying expressions.

## Features

- json and yaml formats
- Constants, enums, number, string, datetime, variables, objects and array
- Arithmetic , assignment , comparison , logical and bitwise operators
- Number , string , datetime , array and nullable functions
- Conversion functions
- Arrow functions
- Group functions (distinct, first, last, min, max, sum and avg)
- Sets functions (union, intersection, difference and symmetric difference)
- Environment variables

## Global installation

it is necessary to install the package globally to be able to access the command line applications.

```sh
npm install jexp -g
```

## Usage

```sh
jexp <expression> <source> [options]
```

### Expression

> The expressions correspond to the package [js-expressions](https://www.npmjs.com/package/js-expressions)
> expression that is applied to the data source  
>
> The root of the data is accessed from **dot**

```sh
jexp '.' ./data/orders.json
```

From the **dot** we write the expressions

```sh
jexp '.details.article' ./data/orders.json
```

```sh
jexp '.details.first(p=> p.unitPrice * p.qty < 3 )' ./data/orders.json
```

### Source

Get data source from json file

```sh
jexp '.[0].details' ./data/orders.json
```

Get data source from yaml file

```sh
jexp '.min(p=> p.total)' ./data/orders.yaml
```

Get data source from json stringify

```sh
jexp 'concatenate(capitalize(.fruit.name)," ",.fruit.color)' '{"fruit":{"name":"apple","color":"green","price":1.20}}'
```

Get data source from pipeline command

```sh
curl -s https://raw.githubusercontent.com/FlavioLionelRita/jexp/main/data/orders.json | jexp '.number'
```

### Options

| Option            | Abbreviation | Description    | Options   |
|-------------------|--------------|----------------|-----------|
|--output <format>  |-o            |Force output    | json, yaml|
|--beautiful        |-b            |Beautiful output|           |

## Examples

file orders.js

```json
[
  {
    "number": "20001",
    "customer": { "firstName": "John", "lastName": "Murphy" },
    "orderTime": "2022-07-30T10:15:54",
    "details": [
      { "article": "Pear", "unitPrice": 1.78, "qty": 2 },
      { "article": "Banana", "unitPrice": 1.99, "qty": 1 },
      { "article": "White grape", "unitPrice": 2.03, "qty": 1 }
    ]
  },
  {
    "number": "20002",
    "customer": { "firstName": "Paul", "lastName": "Smith"  },
    "orderTime": "2022-07-30T12:12:43",
    "details": [
      { "article": "Apple", "unitPrice": 2.15, "qty": 1 },
      { "article": "Banana", "unitPrice": 1.99, "qty": 2 },
      { "article": "Pear", "unitPrice": 1.78, "qty": 1 }
    ]
  },
  {
    "number": "20003",
    "customer": { "firstName": "George", "lastName": "Williams" },
    "orderTime": "2022-07-30T14:43:11",
    "details": [
      { "article": "Apple", "unitPrice": 2.15, "qty": 1 },
      { "article": "Banana", "unitPrice": 1.99, "qty": 1 },
      { "article": "Pear", "unitPrice": 1.78, "qty": 1 },
      { "article": "White grape", "unitPrice": 2.03, "qty": 1 }
    ]
  }
]
```

**Return the entire content of the file**:

```sh
jexp '.' ./data/orders.json
```

*Result*:

```json
[{"number":"20001","customer":{"firstName":"John","lastName":"Murphy"},"orderTime":"2022-07-30T10:15:54","details":[{"article":"Pear","unitPrice":1.78,"qty":2},{"article":"Banana","unitPrice":1.99,"qty":1},{"article":"White grape","unitPrice":2.03,"qty":1}]},{"number":"20002","customer":{"firstName":"Paul","lastName":"Smith"},"orderTime":"2022-07-30T12:12:43","details":[{"article":"Apple","unitPrice":2.15,"qty":1},{"article":"Banana","unitPrice":1.99,"qty":2},{"article":"Pear","unitPrice":1.78,"qty":1}]},{"number":"20003","customer":{"firstName":"George","lastName":"Williams"},"orderTime":"2022-07-30T14:43:11","details":[{"article":"Apple","unitPrice":2.15,"qty":1},{"article":"Banana","unitPrice":1.99,"qty":1},{"article":"Pear","unitPrice":1.78,"qty":1},{"article":"White grape","unitPrice":2.03,"qty":1}]}]
```

**Returns the number property of the list**:

```sh
jexp '.number' ./data/orders.json
```

*Result*:

```json
["20001","20002","20003"]
```

**Concatenates two properties and capitalizes the first one**:

```sh
jexp 'concatenate(capitalize(.fruit.name)," ",.fruit.color)' '{"fruit":{"name":"apple","color":"green","price":1.20}}'
```

*Result*:

```json
"Apple green"
```

**Returns the first element of an array from the index in yaml format**:

```sh
jexp '.[0]' ./data/orders.json -o yaml
```

*Result*:

```yaml
number: '20001'
customer:
  firstName: John
  lastName: Murphy
orderTime: '2022-07-30T10:15:54'
details:
  - article: Pear
    unitPrice: 1.78
    qty: 2
  - article: Banana
    unitPrice: 1.99
    qty: 1
  - article: White grape
    unitPrice: 2.03
    qty: 1

```

**Returns the details property of the first element in beautiful format**:

```sh
jexp '.[0].details' ./data/orders.json -b
```

*Result*:

```json
[
  {
    "article": "Pear",
    "unitPrice": 1.78,
    "qty": 2
  },
  {
    "article": "Banana",
    "unitPrice": 1.99,
    "qty": 1
  },
  {
    "article": "White grape",
    "unitPrice": 2.03,
    "qty": 1
  }
]
```

**Returns the details property of the first element, as the file is yaml, it returns it in yaml format**:

```sh
jexp '.[0].details' ./data/orders.yaml
```

*Result*:

```yaml
- article: Pear
  unitPrice: 1.78
  qty: 2
- article: Banana
  unitPrice: 1.99
  qty: 1
- article: White grape
  unitPrice: 2.03
  qty: 1

```

**Returns the details property of the first element, although the file is yaml it forces the output in json format**:

```sh
jexp '.[0].details' ./data/orders.yaml -b -o json
```

*Result*:

```json
[
  {
    "article": "Pear",
    "unitPrice": 1.78,
    "qty": 2
  },
  {
    "article": "Banana",
    "unitPrice": 1.99,
    "qty": 1
  },
  {
    "article": "White grape",
    "unitPrice": 2.03,
    "qty": 1
  }
]
```

**Returns the details property of the listing**:

```sh
jexp '.details' ./data/orders.json
```

*Result*:

```json
[{"article":"Pear","unitPrice":1.78,"qty":2},{"article":"Banana","unitPrice":1.99,"qty":1},{"article":"White grape","unitPrice":2.03,"qty":1},{"article":"Apple","unitPrice":2.15,"qty":1},{"article":"Banana","unitPrice":1.99,"qty":2},{"article":"Pear","unitPrice":1.78,"qty":1},{"article":"Apple","unitPrice":2.15,"qty":1},{"article":"Banana","unitPrice":1.99,"qty":1},{"article":"Pear","unitPrice":1.78,"qty":1},{"article":"White grape","unitPrice":2.03,"qty":1}]
```

**Returns the article property of the list of details of each element of the list**:

```sh
jexp '.details.article' ./data/orders.json
```

*Result*:

```json
["Pear","Banana","White grape","Apple","Banana","Pear","Apple","Banana","Pear","White grape"]
```

**The order with the smallest total**:

```sh
jexp '.map(p=>{nro:p.number,total:p.details.sum(q=> q.unitPrice * q.qty)}).min(p=> p.total)' ./data/orders.json
```

*Result*:

```json
7.58
```

**Get the minimum of the article property from all the details**:

```sh
jexp '.details.min(p=> p.article )' ./data/orders.json
```

*Result*:

```json
"Apple"
```

**Get the maximum "unitPrice * p.qty" from all the details**:

```sh
jexp '.details.max(p=> p.unitPrice * p.qty )' ./data/orders.json
```

*Result*:

```json
3.98
```

**Get the middle value "unitPrice * p.qty" from all the details**:

```sh
jexp 'round(.details.avg(p=> p.unitPrice * p.qty),2)' ./data/orders.json
```

*Result*:

```json
2.35
```

**Gets the sum of the total property**:

```sh
jexp '.sum(p=> p.total )' ./data/orders.json
```

*Result*:

```json
0
```

**Get the sum "unitPrice * p.qty" of the details of item 1 of the list**:

```sh
jexp '.[1].details.sum(p=> p.unitPrice * p.qty )' ./data/orders.json
```

*Result*:

```json
7.91
```

**Get the number of details where "unitPrice * p.qty " is less than 3**:

```sh
jexp '.details.count(p=> p.unitPrice * p.qty < 3 )' ./data/orders.json
```

*Result*:

```json
8
```

**Get the first article property of all details where "unitPrice * p.qty" is less than 3**:

```sh
jexp '.details.first(p=> p.unitPrice * p.qty < 3 ).article' ./data/orders.json
```

*Result*:

```json
"Banana"
```

**Get the last article property of all details where "unitPrice * p.qty" is less than 3**:

```sh
jexp '.details.last(p=> p.unitPrice * p.qty < 3 ).article' ./data/orders.json
```

*Result*:

```json
"White grape"
```

**Get the first detail where "unitPrice * p.qty" is less than 3 in beautiful format**:

```sh
jexp '.details.first(p=> p.unitPrice * p.qty < 3 )' ./data/orders.json -b
```

*Result*:

```json
{
  "article": "Banana",
  "unitPrice": 1.99,
  "qty": 1
}
```

**Get the smallest article**:

```sh
jexp '.details.min(p=> p.article )' ./data/orders.json
```

*Result*:

```json
"Apple"
```

**Get the total of all the details**:

```sh
jexp '.details.max(p=> p.unitPrice * p.qty )' ./data/orders.json
```

*Result*:

```json
3.98
```

**Average value of the price of the items purchased in the order 20003**:

```sh
jexp 'round(.filter(p=> p.number == "20003").details.avg(p=> p.unitPrice),2)' ./data/orders.json
```

*Result*:

```json
2
```

**Get the total of the details of order 1**:

```sh
jexp '.[1].details.sum(p=> p.unitPrice * p.qty )' ./data/orders.json
```

*Result*:

```json
7.91
```

**Gets the number of details where the subtotal is less than 3**:

```sh
jexp '.details.count(p=> p.unitPrice * p.qty < 3 )' ./data/orders.json
```

*Result*:

```json
8
```

**Get the article of the first detail where the subtotal is less than 3**:

```sh
jexp '.details.first(p=> p.unitPrice * p.qty < 3 ).article' ./data/orders.json
```

*Result*:

```json
"Banana"
```

**Get the article of the last detail where the subtotal is less than 3**:

```sh
jexp '.details.last(p=> p.unitPrice * p.qty < 3 ).article' ./data/orders.json
```

*Result*:

```json
"White grape"
```

**Get the first detail where the subtotal is less than 3**:

```sh
jexp '.details.first(p=> p.unitPrice * p.qty < 3 )' ./data/orders.json
```

*Result*:

```json
{"article":"Banana","unitPrice":1.99,"qty":1}
```

**Calculate the total for each order**:

```sh
jexp '.each(p=>p.total=p.details.sum(q=>q.qty*q.unitPrice)).map(p=>{nro:p.number,total:p.total})' ./data/orders.json
```

*Result*:

```json
[{"nro":"20001","total":7.58},{"nro":"20002","total":7.91},{"nro":"20003","total":7.949999999999999}]
```

**Calculate the subtotal for each order**:

```sh
jexp '.details.foreach(p=>p.subtotal=p.qty*p.unitPrice).subtotal' ./data/orders.json
```

*Result*:

```json
[3.56,1.99,2.03,2.15,3.98,1.78,2.15,1.99,1.78,2.03]
```

**calculates the total of all the details**:

```sh
jexp '.details.foreach(p=>total=nvl(total,0)+p.qty*p.unitPrice);total' ./data/orders.json
```

*Result*:

```json
23.44
```

**Get the list of items without repeating**:

```sh
jexp '.details.distinct(p=>p.article)' ./data/orders.json -b
```

*Result*:

```json
[
  "Pear",
  "Banana",
  "White grape",
  "Apple"
]
```

**Get the total and amount of each item**:

```sh
jexp '.details.map(p=>{article:p.article,count:count(1),total:sum(p.qty * p.unitPrice)})' ./data/orders.json -b
```

*Result*:

```json
[
  {
    "article": "Pear",
    "count": 3,
    "total": 7.12
  },
  {
    "article": "Banana",
    "count": 3,
    "total": 7.96
  },
  {
    "article": "White grape",
    "count": 2,
    "total": 4.06
  },
  {
    "article": "Apple",
    "count": 2,
    "total": 4.3
  }
]
```

**Get the total of the first order**:

```sh
jexp '{total:.[0].details.sum(p=>p.qty * p.unitPrice)}' ./data/orders.json
```

*Result*:

```json
{"total":7.58}
```

**Get the total of the last order**:

```sh
jexp '{total:round(.[.length()-1].details.sum(p=>p.qty * p.unitPrice),2)}' ./data/orders.json -b
```

*Result*:

```json
{
  "total": 7.95
}
```

**List the orders with their totals**:

```sh
jexp '.map(p=>{nro:p.number,total:round(p.details.sum(q=>q.qty * q.unitPrice),2)})' ./data/orders.json -b
```

*Result*:

```json
[
  {
    "nro": "20001",
    "total": 7.6
  },
  {
    "nro": "20002",
    "total": 7.9
  },
  {
    "nro": "20003",
    "total": 7.95
  }
]
```

**All articles that are in orders 20001 and 20003**:

```sh
jexp '.[0].details.article.union(.[1].details.article)' ./data/orders.json
```

*Result*:

```json
["Pear","Banana","White grape","Apple"]
```

**The articles in common between order 20001 and 20002**:

```sh
jexp '.[0].details.article.intersection(.[1].details.article)' ./data/orders.json
```

*Result*:

```json
["Banana","Pear"]
```

**Articles that are in order 20001 and are not in order 20002**:

```sh
jexp '.[0].details.article.difference(.[1].details.article)' ./data/orders.json
```

*Result*:

```json
["White grape"]
```

**Articles of orders 20001 and 20003 that are not shared**:

```sh
jexp '.[0].details.article.symmetricDifference(.[1].details.article)' ./data/orders.json
```

*Result*:

```json
["White grape","Apple"]
```

**Get the sum "unitPrice * p.qty" of the details of item 1 of the list using pipeline**:

```sh
curl -s https://raw.githubusercontent.com/FlavioLionelRita/jexp/main/data/orders.json | jexp '.details.sum(p=> p.unitPrice * p.qty )'
```

*Result*:

```json
23.44
```

## js-expression

> [Js-expression](https://www.npmjs.com/package/js-expressions) is an extensible expression evaluator and parser.
>
> Besides the operators, functions, variables, objects and arrays that are supported.

### Documentation

- [Arithmetic](https://github.com/FlavioLionelRita/js-expressions/wiki/Arithmetic)
- [Comparison](https://github.com/FlavioLionelRita/js-expressions/wiki/Comparison)
- [Logical](https://github.com/FlavioLionelRita/js-expressions/wiki/Logical)
- [Bitwise](https://github.com/FlavioLionelRita/js-expressions/wiki/Bitwise)
- [Numeric](https://github.com/FlavioLionelRita/js-expressions/wiki/Numeric)
- [String](https://github.com/FlavioLionelRita/js-expressions/wiki/String)
- [Datetime](https://github.com/FlavioLionelRita/js-expressions/wiki/Datetime)
- [Nullable](https://github.com/FlavioLionelRita/js-expressions/wiki/Nullable)
- [Conversion](https://github.com/FlavioLionelRita/js-expressions/wiki/Conversion)
- [Assignment](https://github.com/FlavioLionelRita/js-expressions/wiki/Assignment)
- [Array](https://github.com/FlavioLionelRita/js-expressions/wiki/Array)
- [Arrow](https://github.com/FlavioLionelRita/js-expressions/wiki/Arrow)
- [Group](https://github.com/FlavioLionelRita/js-expressions/wiki/Group)
- [Sets](https://github.com/FlavioLionelRita/js-expressions/wiki/Sets)
- [Control flows](https://github.com/FlavioLionelRita/js-expressions/wiki/Flows)
- [Extend](https://github.com/FlavioLionelRita/js-expressions/wiki/Extend)
