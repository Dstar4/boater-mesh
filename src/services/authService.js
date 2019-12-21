const axios = require('axios')
const db = require('../data/db-config')
const CommonError = require('../errors/common-error')
const HashingService = require('./hashingService')
const jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports = class AuthService {
  constructor () {
    this.hashingService = new HashingService()
  }

  async getUsers () {
    return db('users')
  }

  async create (user) {
    user.password = await this.hashingService.hash(user.password)
    user = await db('users').insert(user)
    // console.log("user")
    return this.generateAccessToken(user)
  }

  async findByEmail (email) {
    return await db('users').where({ email }).first()
  }

  async signIn (email, password) {
    console.log("sign in")
    let user = await this.findByEmail(email)
    console.log("sign in user ", user)
    if (!user) {
      return null
    }
    if ((await this.hashingService.check(password, user.password)) === true) {
      return this.generateAccessToken(user)
    } else {
      return null
    }
  }
  generateAccessToken (user) {
    // console.log("gen acc tok")
    if (!user) {
      throw new Error('Invalid user')
    }
    const payload = {
      user:user
    }
    const token = jwt.sign(payload, process.env.AUTH_SECRET, {
      algorithm: 'HS256',
      issuer: process.env.TOKEN_ISSUER,
      subject: `${user.id}`
    })
    // console.log("token",token)
    return token
  }
}
