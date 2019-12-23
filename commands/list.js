const { list: commits } = require('./../query')
const qoa = require('qoa')
const open = require('open')

const { find } = require('./../api')

async function getList () {
  const { commits: title } = await qoa.interactive({
    type: 'interactive',
    query: '',
    handle: 'commits',
    symbol: '>',
    menu: (await commits()).map(([title, date]) => `[${date}]: ${title}`)
  })

  const [,,link] = await find((await commits()).find((element) => element[0] === title.replace(/\[.+]: /g, '')))
  await open(link)
}

module.exports = {
  getList
}