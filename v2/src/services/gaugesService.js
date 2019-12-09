const axios = require('axios')
const redis = require('redis')

const CommonError = require('../errors/common-error')

const NC_SITES = [
  '03524000',
  '03512000',
  '03512000',
  '03460000',
  '03410210',
  '03453000',
  '03460000',
  '02176930',
  '02176930',
  '02177000',
  '02177000',
  '02177000',
  '0351706800',
  '03518500',
  '03539778',
  '03539778',
  '03540500',
  '03540500',
  '03539600',
  '03539600',
  '03441000',
  '03451500',
  '03453500',
  '03451500',
  '03451500',
  '03451500',
  '03439000',
  '03443000',
  '03453500',
  '03439000',
  '03451500',
  '03189600',
  '03192000',
  '03540500',
  '03539778',
  '03453000',
  '02138500',
  '02399200',
  '02398950',
  '02399200',
  '02398950',
  '02399200',
  '02398950',
  '03539778',
  '03539778',
  '03503000',
  '03503000',
  '03446000',
  '03505550',
  '03505550',
  '03185400',
  '03465500',
  '03465500',
  '03465500',
  '03540500',
  '03540500',
  '03512000',
  '02176930',
  '02177000',
  '03460795',
  '03455500',
  '03531500',
  '03531500',
  '03512000',
  '03512000',
  '03208500',
  '03209000',
  '03208500',
  '03209000',
  '02169000',
  '02168504',
  '02162350',
  '03518500',
  '03451000',
  '02181580',
  '03473000',
  '03465500',
  '03463300',
  '03463300',
  '03510577',
  '03076500'
]

module.exports = class GaugesService {
  async getGauges () {
    const url = `http://waterservices.usgs.gov/nwis/iv/?format=json&sites=${NC_SITES}&siteType=ST&variable=00060`
    const { data } = await axios.get(url )
    console.log(console.dir(data))
    if (!data) {
      throw new CommonError('Could not retrieve those readings.')
    }
    return data
  }

  async getReadings (site) {
    const url = `http://waterservices.usgs.gov/nwis/iv/?format=json&sites=${site}&period=P6D&siteType=ST&variable=00060`
    const { data } = await axios.get(encodeURI(url))
    if (!data) {
      throw new CommonError('Could not retrieve those readings.')
    }
    return data
  }
}
