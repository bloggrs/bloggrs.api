const { h } = require('vue')

module.exports = {
  render() {
    return h('div', { id: 'app' }, [
      h('h1', 'Welcome to Vue SSR'),
      h('p', 'This is rendered on the server')
    ])
  }
}