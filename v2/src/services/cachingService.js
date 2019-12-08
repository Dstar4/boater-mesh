const redis = require('redis')
const promisify = require('util').promisify

module.exports = class CachingService {
  constructor () {}
  client = redis.createClient()

  async storeGauge (data) {
    data = data || []
    console.log('storing data')
    // await this.purgeCache(siteCode)
    this.client.hmset('gauges', 'all', JSON.stringify(data))
    // await promisify(this.client.get).bind(client)(JSON.stringify(data))
    return 'success'
  }
  getGauge = () => {
    const tmp = promisify(
      this.client.keys('*', (err, keys) => {
        return JSON.stringify(keys)
      })
    )
    // await this.client.hget('gauges',  "all", function (err, obj) {
    //   if (err) {
    //     console.dir("err", err)
    //   }
    //   console.dir("OBJ", obj, err)
    //   return obj
    // })
    // console.log('gauges', gauges.all)
    return tmp
  }
}
