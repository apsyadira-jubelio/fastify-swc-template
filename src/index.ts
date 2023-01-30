import config from './constant/config'
import { app } from './server'

app.listen({ port: Number(config.APP_PORT), host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(config)
  console.log(`server listening at ${address}`)
})