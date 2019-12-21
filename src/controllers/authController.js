const router = require('express').Router()
const AuthService = require('../services/authService')
const CommonError = require('../errors/common-error')
const asyncWrapper = require('../util/asyncWrapper').AsyncWrapper
const AuthenticationError = require('../errors/authentication-error')
const authService = new AuthService()

// api/gauges/
router.route('/').get(
  asyncWrapper(async (req, res) => {
    const data = await authService.getUsers()
    res.status(200).json(data)
  })
)

router.route('/register').post(
  asyncWrapper(async (req, res) => {
    const user = req.body
    const token = await authService.create(user)
    console.log('token', token)
    res.status(201).json(token)
  })
)
router.post("/sign-in", asyncWrapper(async (req, res) => {
  const {email, password} = req.body;
  const token = await authService.signIn(email, password)

  // console.log("token", token)
  if (!token) {
    console.log('!token')
    throw new AuthenticationError("Invalid credentials");
  }
  else {
    console.log("ELSE", token)
    res.status(200).json(token)
  }
}));
module.exports = router
