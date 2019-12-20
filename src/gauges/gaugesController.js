const router = require('express').Router()
const GaugesService = require('../../services/gaugesService')
const CommonError = require('../../errors/common-error')
const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper

const gaugesService = new GaugesService()

// api/gauges/
router
  .route('/')
  .get(
    asyncWrapper(async (req, res) => {
      const data = await gaugesService.getGauges()
      // console.log('controller data', data)
      res.status(200).json(data)
    })
  )
  .post(
    asyncWrapper(async (req, res) => {
      const params = {
        siteCode: req.params.siteCode,
        period: req.params.period
      }
      const data = await gaugesService.dynamicReadings(params)
      res.status(200).json(data)
    })
  )

// api/gauges/
router.route('/:siteCode').get(
  asyncWrapper(async (req, res) => {
    const { siteCode } = req.params
    const data = await gaugesService.getReadings(siteCode)
    res.status(200).json(data)
  })
)

module.exports = router
