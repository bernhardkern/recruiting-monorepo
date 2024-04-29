const fs = require('fs')
const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares)

const configPath = './initializerJson.json'

const PORT = 1080
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

config.forEach(expectation => {
  const httpRequest = expectation.httpRequest
  const queryStringParameters = httpRequest.queryStringParameters ? httpRequest.queryStringParameters.map((param) => (param.name + '=' + param.values[0])).join('&') : ''
  const pathQuery =  queryStringParameters ? '?' + queryStringParameters : ''
  const path = httpRequest.path.replace('[a-zA-Z0-9]+', ':id') + pathQuery
  const method = httpRequest.method.toLowerCase()
  const body = expectation.httpResponse.body
  server[method](path, (req, res, next) => {
    res.json(body)
    res.status(200)
    next()
  })
  console.log(`create mock api for ${method} ${path} with response`)
  JSON.stringify(body, null, 2).split('\n').forEach((line) => console.log(line))
  console.log('')

})

server.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
