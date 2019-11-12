import Title from './Title'
import React, { useEffect, useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
})

export default function Reading (props) {
  return (
    <React.Fragment>
      <Title>Recent Readings</Title>
      <Typography component='p' variant='h4'>
        <p>
          {props.data[0].gaugeReading} {props.data[0].units}
        </p>
        <p>{props.data[0].timeStamp}</p>
      </Typography>
    </React.Fragment>
  )
}
