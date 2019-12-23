#!/usr/bin/env node
const sade = require('sade')
const prog = sade('commitstrip')

const api = require('./../api')
const { getList } = require('./../commands')

prog
  .version('1.0.0')
  
prog
  .command('build')
  .describe('Create the api folder')
  .action(api.initialize)

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