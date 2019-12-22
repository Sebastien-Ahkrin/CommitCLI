const WordPress = require('wpapi')

const api = new WordPress({
  endpoint: 'http://www.commitstrip.com/fr/wp-json'
})

async function list () {
  const posts = await api.posts()
  return posts.map(({ title, modified, content }) => {
    return [
      title.rendered,
      modified,
      /.+src="(.+\.\w+)".+/gm.exec(content.rendered)[1]
    ]
  })
}

module.exports = {
  list
}