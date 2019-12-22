const { list: commits } = require('./../query')
const qoa = require('qoa')

async function getList () {
  const { commits: title } = await qoa.interactive({
    type: 'interactive',
    query: '',
    handle: 'commits',
    symbol: '>',
    menu: (await commits()).map(([title]) => title)
  })

  console.log((await commits()).find((element) => element[0] === title))
}

module.exports = {
  getList
}