import React, {useState, useEffect} from 'react'
import {fetchDailyData} from '../../api'
import {Line, Bar} from 'react-chartjs-2'
import styles from './Chart.module.css'

function Chart({data:{confirmed, deaths, recovered}, country}) {

    const [dailyData, setDailyData] = useState([])  //dailyData is used for global data

    //we can't provide callback function as an async function so we provide another function inside which is asynchronous
    useEffect(() => {
        const fetchAPI = async () =>{
           const dailyDataRecieved = await fetchDailyData()
           setDailyData(dailyDataRecieved)
        }

        // console.log(dailyData)
        
        fetchAPI()
    },[])

    //for showing global data
    const lineChart = (
        dailyData.length?
       <Line 
         data={{
             labels: dailyData.map(({date}) => date),
             //api provides only confirmed and deaths, so only 2 datasets
             datasets: [{
                 data: dailyData.map(({confirmed}) => confirmed),
                 label: 'infected',
                 borderColor: '#3333ff',
                 filled: true,
             },{
                data: dailyData.map(({deaths}) => deaths),
                label: 'deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                filled: true,
             }],
         }}
       />:
       null
    )

    console.log(confirmed,recovered,deaths)

    const barChart = (
        confirmed?
        (
            <Bar
              data={{
                 labels: ['Infected', 'Recovered', 'Deaths'],
                 datasets: [{
                     label: 'People',
                     backgroundColor: ['rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)'],
                    data: [confirmed.value, recovered.value, deaths.value]
                 }]
              }}
              options={{
                 legend: {display:false},
                 title: {display:true, text:`current stats in ${country}`} 
              }}
            />
        ):
        null
    )

    return (
        <div className={styles.container}>
           {!confirmed || !dailyData.length ? 'Loading...' : country? barChart : lineChart} 
        </div>
    )
}

export default Chart
