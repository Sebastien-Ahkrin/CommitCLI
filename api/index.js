// Require third dependencies
const fs = require('fs')
const { join } = require('path')
const { promisify } = require('util')

const appendFile = promisify(fs.appendFile)
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const exists = promisify(fs.exists)
const mkdir = promisify(fs.mkdir)

const folder = join(__dirname, '../cache/api.json')

async function initialize () {
  if (!await exists(folder)) {
    try {
      await mkdir(folder.replace('api.json', ''))
      await writeFile(folder, JSON.stringify([]))
      console.log(`Api correctly initialized on the ${folder} folder.`)
    } catch (error) {
      console.log(`An error occurred while initialize the api [${error}]`)
    }
  } else {
    console.log(`Cannot create api on the ${folder} folder. (Already exist)`)
  }
}

async function get () {
  if (!await exists(folder)) {
    return console.log(`Api folder (${folder}) doesn't exists, call build before.`)
  }

  const data = await readFile(folder, 'utf8')
  return JSON.parse(data)  
}

async function append ([title, created, url]) {
  if (!await exists(folder)) {
    return console.log(`Api folder (${folder}) doesn't exists, call build before.`)
  }

  const values = await get()
  values.push({ title, created, url })

  await appendFile(JSON.stringify(values))
  return { title, created, url }
}

async function find ([title, created, url]) {
  const values = await get()
  const value = values.find(value => value.title === title)

  if (value === undefined) {
    await append([title, created, url])
  } else {
    return value
  }
}

module.exports = {
  initialize,
  append,
  find
}