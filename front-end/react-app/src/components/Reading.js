import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function Reading (props) {
  if (props.data[0] && props.data[0].name) {
    return (
      <React.Fragment>
        <Typography component='p' variant='h4'>
          <p>
            Level: {props.data[0].gaugeReading} {props.data[0].units}
          </p>
          <p>
            Time:{' '}
            {props.data[0].timeStamp
              .split('')
              .slice(11, 16)
              .join('')}
          </p>
          <p>
            {props.data[0].timeStamp
              .split('')
              .slice(0, 10)
              .join('')}
          </p>
        </Typography>
      </React.Fragment>
    )
  } else {
    return 'Loading'
  }
}
