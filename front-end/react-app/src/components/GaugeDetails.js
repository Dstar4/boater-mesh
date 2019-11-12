import React, { useEffect, useState, useReducer, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Title from './Title'

export default function (props) {
  const classes = useStyles()
  if (props.data[0]&&props.data[0].name){
  return (
    <Grid item xs={12}>
      <Title>Run Info</Title>
      {/* <Typography component='p' variant='p'> */}
      <div className={classes.root}>
        <h4>{props.data[0].name}</h4>
        <p>TimeStamp: {props.data[0].timeStamp}</p>
        <p>Run Name: {props.data[0].variableName}</p>
        <p>Latitude: {props.data[0].latitude}</p>
        <p>Longitude: {props.data[0].longitude}</p>
        <p>Units: {props.data[0].units}</p>
        <p>Flow Type: {props.data[0].variableName}</p>
        <p>Description: {props.data[0].description}</p>
      </div>
    </Grid>
  )
  }
  else{
    return "Loading"
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  }
}))
