/* eslint-disable indent */
import { show } from './util'

(async () => {
  const list = [
    { cmd: 'jexp \'.\' ./data/orders.json', desc: 'Return the entire content of the file' },
    { cmd: 'jexp \'.number\' ./data/orders.json', desc: 'Returns the number property of the list' },
    { cmd: 'jexp \'concatenate(capitalize(.fruit.name)," ",.fruit.color)\' \'{"fruit":{"name":"apple","color":"green","price":1.20}}\'', desc: 'Concatenates two properties and capitalizes the first one' },
    { cmd: 'jexp \'.[0]\' ./data/orders.json -o yaml', desc: 'Returns the first element of an array from the index in yaml format' },
    { cmd: 'jexp \'.[0].details\' ./data/orders.json -b', desc: 'Returns the details property of the first element in beautiful format' },
    { cmd: 'jexp \'.[0].details\' ./data/orders.yaml', desc: 'Returns the details property of the first element, as the file is yaml, it returns it in yaml format' },
    { cmd: 'jexp \'.[0].details\' ./data/orders.yaml -b -o json', desc: 'Returns the details property of the first element, although the file is yaml it forces the output in json format' },
    { cmd: 'jexp \'.details\' ./data/orders.json', desc: 'Returns the details property of the listing' },
    { cmd: 'jexp \'.details.article\' ./data/orders.json', desc: 'Returns the article property of the list of details of each element of the list' },
    { cmd: 'jexp \'.min(p=> p.total)\' ./data/orders.json', desc: 'Get the minimum of the total property' },
    { cmd: 'jexp \'.details.min(p=> p.article )\' ./data/orders.json', desc: 'Get the minimum of the article property from all the details' },
    { cmd: 'jexp \'.details.max(p=> p.unitPrice * p.qty )\' ./data/orders.json', desc: 'Get the maximum "unitPrice * p.qty" from all the details' },
    { cmd: 'jexp \'.details.avg(p=> p.unitPrice * p.qty )\' ./data/orders.json', desc: 'Get the middle value "unitPrice * p.qty" from all the details' },
    { cmd: 'jexp \'.sum(p=> p.total )\' ./data/orders.json', desc: 'Gets the sum of the total property' },
    { cmd: 'jexp \'.[1].details.sum(p=> p.unitPrice * p.qty )\' ./data/orders.json', desc: 'Get the sum "unitPrice * p.qty" of the details of item 1 of the list' },
    { cmd: 'jexp \'.details.count(p=> p.unitPrice * p.qty < 3 )\' ./data/orders.json', desc: 'Get the number of details where "unitPrice * p.qty " is less than 3' },
    { cmd: 'jexp \'.details.first(p=> p.unitPrice * p.qty < 3 ).article\' ./data/orders.json', desc: 'Get the first article property of all details where "unitPrice * p.qty" is less than 3' },
    { cmd: 'jexp \'.details.last(p=> p.unitPrice * p.qty < 3 ).article\' ./data/orders.json', desc: 'Get the last article property of all details where "unitPrice * p.qty" is less than 3' },
    { cmd: 'jexp \'.details.first(p=> p.unitPrice * p.qty < 3 )\' ./data/orders.json -b', desc: 'Get the first detail where "unitPrice * p.qty" is less than 3 in beautiful format' },
    { cmd: 'curl -s https://raw.githubusercontent.com/FlavioLionelRita/jexp/main/data/orders.json | jexp \'.details.sum(p=> p.unitPrice * p.qty )\'', desc: 'Get the sum "unitPrice * p.qty" of the details of item 1 of the list using pipeline' },
		{ cmd: 'jexp \'.details.min(p=> p.article )\' ./data/orders.json', desc: 'Get the smallest article' },
		{ cmd: 'jexp \'.details.max(p=> p.unitPrice * p.qty )\' ./data/orders.json', desc: 'Get the total of all the details' },
		{ cmd: 'jexp \'.details.avg(p=> p.unitPrice * p.qty )\' ./data/orders.json', desc: 'Get the mean value of all details' },
		{ cmd: 'jexp \'.[1].details.sum(p=> p.unitPrice * p.qty )\' ./data/orders.json', desc: 'Get the total of the details of order 1' },
		{ cmd: 'jexp \'.details.count(p=> p.unitPrice * p.qty < 3 )\' ./data/orders.json', desc: 'Gets the number of details where the subtotal is less than 3' },
		{ cmd: 'jexp \'.details.first(p=> p.unitPrice * p.qty < 3 ).article\' ./data/orders.json', desc: 'Get the article of the first detail where the subtotal is less than 3' },
		{ cmd: 'jexp \'.details.last(p=> p.unitPrice * p.qty < 3 ).article\' ./data/orders.json', desc: 'Get the article of the last detail where the subtotal is less than 3' },
		{ cmd: 'jexp \'.details.first(p=> p.unitPrice * p.qty < 3 )\' ./data/orders.json', desc: 'Get the first detail where the subtotal is less than 3' },
		{ cmd: 'jexp \'.each(p=>p.total=p.details.sum(q=>q.qty*q.unitPrice)).map(p=>{nro:p.number,total:p.total})\' ./data/orders.json', desc: 'Calculate the total for each order' },
		{ cmd: 'jexp \'.details.foreach(p=>p.subtotal=p.qty*p.unitPrice).subtotal\' ./data/orders.json', desc: 'Calculate the subtotal for each order' },
		{ cmd: 'jexp \'.details.foreach(p=>total=nvl(total,0)+p.qty*p.unitPrice);total\' ./data/orders.json', desc: 'calculates the total of all the details' },
		{ cmd: 'jexp \'.details.distinct(p=>p.article)\' ./data/orders.json -b', desc: 'Get the list of items without repeating' },
		{ cmd: 'jexp \'.details.distinct(p=>{article:p.article,qty:p.qty}) -b\' ./data/orders.json', desc: 'Get the list of items and quantity without repeating' },
		{ cmd: 'jexp \'.details.map(p=>{article:p.article,count:count(1),total:sum(p.qty * p.unitPrice)})\' ./data/orders.json -b', desc: 'Get the total and amount of each item' },
		{ cmd: 'jexp \'{total:.[0].details.sum(p=>p.qty * p.unitPrice)}\' ./data/orders.json', desc: 'Get the total of the first order' },
    { cmd: 'jexp \'{total:.[.length()-1].details.sum(p=>p.qty * p.unitPrice)}\' ./data/orders.json -b', desc: 'Get the total of the last order' },
		{ cmd: 'jexp \'.map(p=>{nro:p.number,total:p.details.sum(q=>q.qty * q.unitPrice)})\' ./data/orders.json', desc: 'List the orders with their totals' }
  ]
  await show(list)
})()
