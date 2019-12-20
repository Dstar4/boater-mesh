const bcrypt = require('bcrypt')

module.exports = class HashingService {
  constructor () {
    this.rounds = 10
  }
  async hash (password) {
    return await bcrypt.hash(password, this.rounds)
  }
  async check (password, hash) {
    return await bcrypt.compare(password, hash)
  }
}
