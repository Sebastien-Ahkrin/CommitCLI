#!/usr/bin/env node
const sade = require('sade')
const prog = sade('commitstrip')

const { getList } = require('./../commands')

prog
  .version('1.0.0')

prog
  .command('hello')
  .describe('Hello, World!')
  .action(() => {
    console.log('Hello, World!')
  })

prog
  .command('list')
  .describe('List every commit strip')
  .action(async () => {
    try {
      await getList()
    } catch ({ hostname }) {
      console.log(`Error: '${hostname}' hostname not reachable.`)
    }
  })

prog.parse(process.argv)