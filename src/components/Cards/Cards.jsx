import React from 'react'
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import styles from './Cards.module.css'
import CountUp from 'react-countup';
//for having multiple class names
import cx from 'classnames';   

function Cards({data}) {
    // console.log(props)

    const {confirmed, recovered, deaths, lastUpdate} = data  //first we destructured data, and then values in that object

    if(!confirmed){
        return 'Loading..'
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                   <Typography color='textSecondary' gutterBottom>Infected</Typography>
                   <Typography variant='h5'>
                       <CountUp
                         start={0}
                         end={confirmed.value}
                         duration={2.5}
                         separator=','
                       />
                   </Typography>
                   <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                   <Typography variant='body2'>Number of active cases of covid 19</Typography>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                   <Typography color='textSecondary' gutterBottom>Recovered</Typography>
                   <Typography variant='h5'>
                       <CountUp
                         start={0}
                         end={recovered.value}
                         duration={2.5}
                         separator=','
                       />
                   </Typography>
                   <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                   <Typography variant='body2'>Number of recoveries covid 19</Typography>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                   <Typography color='textSecondary' gutterBottom>Deaths</Typography>
                   <Typography variant='h5'>
                       <CountUp
                         start={0}
                         end={deaths.value}
                         duration={2.5}
                         separator=','
                       />
                   </Typography>
                   <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                   <Typography variant='body2'>Number of deaths due to covid 19</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards

//we need three cards