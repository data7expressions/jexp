# JEXP

Command line application that allows parser and evaluator of json/yaml applying expressions.

## Features

- Constants, enums, variables, objects and arrays
- Arithmetic, assignment, comparison, Logical and bitwise operators
- Functions and arrow functions
- distinct and group by
- Environment variables
- json and yaml

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

The expressions correspond to the package [js-expressions](https://www.npmjs.com/package/js-expressions)

expression that is applied to the data source  

the root of the data is accessed from **dot**

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
|--decorate         |-d            |Decorate output |           |

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
  }
]
```

Return the entire content of the file

```sh
jexp '.' ./data/orders.json
```

Result:

```json
[{"number":"20001","customer":{"firstName":"John","lastName":"Murphy"},"orderTime":"2022-07-30T10:15:54","details":[{"article":"Pear","unitPrice":1.78,"qty":2},{"article":"Banana","unitPrice":1.99,"qty":1},{"article":"White grape","unitPrice":2.03,"qty":1}]},{"number":"20002","customer":{"firstName":"Paul","lastName":"Smith"},"orderTime":"2022-07-30T12:12:43","details":[{"article":"Apple","unitPrice":2.15,"qty":1},{"article":"Banana","unitPrice":1.99,"qty":2},{"article":"Pear","unitPrice":1.78,"qty":1}]}]
```

Returns the number property of the list

```sh
jexp '.number' ./data/orders.json
```

Result:

```json
["20001","20002"]
```

Concatenates two properties and capitalizes the first one

```sh
jexp 'concatenate(capitalize(.fruit.name)," ",.fruit.color)' '{"fruit":{"name":"apple","color":"green","price":1.20}}'
```

Result:

```json
"Apple green"
```

Returns the first element of an array from the index in yaml format

```sh
jexp '.[0]' ./data/orders.json -o yaml
```

Result:

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

Returns the details property of the first element in beautiful format

```sh
jexp '.[0].details' ./data/orders.json -b
```

Result:

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

Returns the details property of the listing

```sh
jexp '.details' ./data/orders.json
```

Result:

```json
[{"article":"Pear","unitPrice":1.78,"qty":2},{"article":"Banana","unitPrice":1.99,"qty":1},{"article":"White grape","unitPrice":2.03,"qty":1},{"article":"Apple","unitPrice":2.15,"qty":1},{"article":"Banana","unitPrice":1.99,"qty":2},{"article":"Pear","unitPrice":1.78,"qty":1}]
```

Returns the article property of the list of details of each element of the list

```sh
jexp '.details.article' ./data/orders.json
```

Result:

```json
["Pear","Banana","White grape","Apple","Banana","Pear"]
```

Get the minimum of the total property

```sh
jexp '.min(p=> p.total)' ./data/orders.json
```

Result:

```json
null
```

Get the minimum of the article property from all the details

```sh
jexp '.details.min(p=> p.article )' ./data/orders.json
```

Result:

```json
"Apple"
```

Get the maximum "unitPrice * p.qty" from all the details

```sh
jexp '.details.max(p=> p.unitPrice * p.qty )' ./data/orders.json
```

Result:

```json
3.98
```

Get the middle value "unitPrice * p.qty" from all the details

```sh
jexp '.details.avg(p=> p.unitPrice * p.qty )' ./data/orders.json
```

Result:

```json
2.5816666666666666
```

Gets the sum of the total property

```sh
jexp '.sum(p=> p.total )' ./data/orders.json
```

Result:

```json
0
```

Get the sum "unitPrice * p.qty" of the details of item 1 of the list

```sh
jexp '.[1].details.sum(p=> p.unitPrice * p.qty )' ./data/orders.json
```

Result:

```json
7.91
```

Get the number of details where "unitPrice * p.qty " is less than 3

```sh
jexp '.details.count(p=> p.unitPrice * p.qty < 3 )' ./data/orders.json
```

Result:

```json
4
```

Get the first article property of all details where "unitPrice * p.qty" is less than 3

```sh
jexp '.details.first(p=> p.unitPrice * p.qty < 3 ).article' ./data/orders.json
```

Result:

```json
"Banana"
```

Get the last article property of all details where "unitPrice * p.qty" is less than 3

```sh
jexp '.details.last(p=> p.unitPrice * p.qty < 3 ).article' ./data/orders.json
```

Result:

```json
"Pear"
```

Get the first detail where "unitPrice * p.qty" is less than 3 in beautiful format

```sh
jexp '.details.first(p=> p.unitPrice * p.qty < 3 )' ./data/orders.json -b
```

Result:

```json
{
  "article": "Banana",
  "unitPrice": 1.99,
  "qty": 1
}
```

Get the sum "unitPrice * p.qty" of the details of item 1 of the list using pipeline

```sh
curl -s https://raw.githubusercontent.com/FlavioLionelRita/jexp/main/data/orders.json | jexp '.details.sum(p=> p.unitPrice * p.qty )'
```

Result:

```json
15.49
```

Get the smallest article

```sh
jexp '.details.min(p=> p.article )' ./data/orders.json
```

Result:

```json
"Apple"
```

Get the total of all the details

```sh
jexp '.details.max(p=> p.unitPrice * p.qty )' ./data/orders.json
```

Result:

```json
3.98
```

Get the mean value of all details

```sh
jexp '.details.avg(p=> p.unitPrice * p.qty )' ./data/orders.json
```

Result:

```json
2.5816666666666666
```

Get the total of the details of order 1

```sh
jexp '.[1].details.sum(p=> p.unitPrice * p.qty )' ./data/orders.json
```

Result:

```json
7.91
```

Gets the number of details where the subtotal is less than 3

```sh
jexp '.details.count(p=> p.unitPrice * p.qty < 3 )' ./data/orders.json
```

Result:

```json
4
```

Get the article of the first detail where the subtotal is less than 3

```sh
jexp '.details.first(p=> p.unitPrice * p.qty < 3 ).article' ./data/orders.json
```

Result:

```json
"Banana"
```

Get the article of the last detail where the subtotal is less than 3

```sh
jexp '.details.last(p=> p.unitPrice * p.qty < 3 ).article' ./data/orders.json
```

Result:

```json
"Pear"
```

Get the first detail where the subtotal is less than 3

```sh
jexp '.details.first(p=> p.unitPrice * p.qty < 3 )' ./data/orders.json
```

Result:

```json
{"article":"Banana","unitPrice":1.99,"qty":1}
```

Calculate the total for each order

```sh
jexp '.each(p=>p.total=p.details.sum(q=>q.qty*q.unitPrice)).map(p=>{nro:p.number,total:p.total})' ./data/orders.json
```

Result:

```json
[{"nro":"20001","total":7.58},{"nro":"20002","total":7.91}]
```

Calculate the subtotal for each order

```sh
jexp '.details.foreach(p=>p.subtotal=p.qty*p.unitPrice).subtotal' ./data/orders.json
```

Result:

```json
[3.56,1.99,2.03,2.15,3.98,1.78]
```

calculates the total of all the details

```sh
jexp '.details.foreach(p=>total=nvl(total,0)+p.qty*p.unitPrice);total' ./data/orders.json
```

Result:

```json
15.49
```

Get the list of items without repeating

```sh
jexp '.details.distinct(p=>p.article)' ./data/orders.json -b
```

Result:

```json
[
  "Pear",
  "Banana",
  "White grape",
  "Apple"
]
```

Get the list of items and quantity without repeating

```sh
jexp '.details.distinct(p=>{article:p.article,qty:p.qty})' ./data/orders.json
```

Result:

```json
[{"article":"Pear","qty":2},{"article":"Banana","qty":1},{"article":"White grape","qty":1},{"article":"Apple","qty":1},{"article":"Banana","qty":2},{"article":"Pear","qty":1}]
```

Get the total and amount of each item

```sh
jexp '.details.map(p=>{article:p.article,count:count(1),total:sum(p.qty * p.unitPrice)})' ./data/orders.json -b
```

Result:

```json
[
  {
    "article": "Pear",
    "count": 2,
    "total": 5.34
  },
  {
    "article": "Banana",
    "count": 2,
    "total": 5.97
  },
  {
    "article": "White grape",
    "count": 1,
    "total": 2.03
  },
  {
    "article": "Apple",
    "count": 1,
    "total": 2.15
  }
]
```

Get the total of the first order

```sh
jexp '{total:.[0].details.sum(p=>p.qty * p.unitPrice)}' ./data/orders.json
```

Result:

```json
{"total":7.58}
```

Get the total of the last order

```sh
jexp '{total:.[.length()-1].details.sum(p=>p.qty * p.unitPrice)}' ./data/orders.json -b
```

Result:

```json
{
  "total": 7.91
}
```

List the orders with their totals

```sh
jexp '.map(p=>{nro:p.number,total:p.details.sum(q=>q.qty * q.unitPrice)})' ./data/orders.json
```

Result:

```json
[{"nro":"20001","total":7.58},{"nro":"20002","total":7.91}]
```

## js-expression

[Js-expression](https://www.npmjs.com/package/js-expressions) is an extensible expression evaluator and parser. \
Besides the operators, functions, variables, objects and arrays that are supported

### Documentation

- [Array](https://github.com/FlavioLionelRita/js-expressions/wiki/Array)
- [Assignment](https://github.com/FlavioLionelRita/js-expressions/wiki/Assignment)
- [Bitwise](https://github.com/FlavioLionelRita/js-expressions/wiki/Bitwise)
- [Comparison](https://github.com/FlavioLionelRita/js-expressions/wiki/Comparison)
- [Control flows](https://github.com/FlavioLionelRita/js-expressions/wiki/Flows)
- [Datetime](https://github.com/FlavioLionelRita/js-expressions/wiki/Datetime)
- [Extend](https://github.com/FlavioLionelRita/js-expressions/wiki/Extend)
- [Logical](https://github.com/FlavioLionelRita/js-expressions/wiki/Logical)
- [Nullable](https://github.com/FlavioLionelRita/js-expressions/wiki/Nullable)
- [Numeric](https://github.com/FlavioLionelRita/js-expressions/wiki/Numeric)
- [String](https://github.com/FlavioLionelRita/js-expressions/wiki/String)
