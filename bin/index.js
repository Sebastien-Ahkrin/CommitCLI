#!/usr/bin/env node
const sade = require('sade')
const prog = sade('commit')

prog
  .version('1.0.0')

prog
  .command('hello')
  .describe('Hello, World!')
  .action(() => {
    console.log('Hello, World!')
  })

prog.parse(process.argv)