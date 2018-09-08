const chokidar = require('chokidar')
const express = require('express')
const app = express()

app.use(function (req, res, next) {
  require('./app/index.js')(req, res, next)
})

const watcher = chokidar.watch('./app')

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /dist/ module cache from server")
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
    })
  })
})

app.listen(3000, 'localhost', function(err) {
  if (err) throw err
  console.log('Listening at http://localhost:3000')
})
