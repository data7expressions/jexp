/* eslint-disable indent */
import { show } from './util'

(async () => {
  const list = [
    'jexp \'.\' ./data/orders.json',
    'jexp \'.number\' ./data/orders.json',
    'jexp \'concatenate(capitalize(.fruit.name)," ",.fruit.color)\' \'{"fruit":{"name":"apple","color":"green","price":1.20}}\'',
    'jexp \'.[0]\' ./data/orders.json -o yaml',
    'jexp \'.[0].details\' ./data/orders.json -b',
    'jexp \'.details\' ./data/orders.json',
    'jexp \'.details.article\' ./data/orders.json',
    'jexp \'.min(p=> p.total)\' ./data/orders.json',
    'jexp \'.details.min(p=> p.article )\' ./data/orders.json',
    'jexp \'.details.max(p=> p.unitPrice * p.qty )\' ./data/orders.json',
    'jexp \'.details.avg(p=> p.unitPrice * p.qty )\' ./data/orders.json',
    'jexp \'.sum(p=> p.total )\' ./data/orders.json',
    'jexp \'.[1].details.sum(p=> p.unitPrice * p.qty )\' ./data/orders.json',
    'jexp \'.details.count(p=> p.unitPrice * p.qty < 3 )\' ./data/orders.json',
    'jexp \'.details.first(p=> p.unitPrice * p.qty < 3 ).article\' ./data/orders.json',
    'jexp \'.details.last(p=> p.unitPrice * p.qty < 3 ).article\' ./data/orders.json',
    'jexp \'.details.first(p=> p.unitPrice * p.qty < 3 )\' ./data/orders.json -b',
    'curl -s https://raw.githubusercontent.com/FlavioLionelRita/jexp/main/data/orders.json | jexp \'.details.sum(p=> p.unitPrice * p.qty )\''
  ]
  await show(list)
})()
