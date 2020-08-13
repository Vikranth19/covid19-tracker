//contains functions to fetch data that is helpful
import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

//https://medium.com/@MinimalGhost/what-is-axios-js-and-why-should-i-care-7eb72b111dc0
//fetchData is an asynchronous function returning a response
export const fetchData = async (country) =>{

    //for specific country api request
    let changeableUrl = url;

   if(country){
       changeableUrl = `${url}/countries/${country}`
   }

    try{
        //if fetch is succesful, we need only data part of the response, so destructure it
        const { data : {confirmed , recovered, deaths, lastUpdate} } = await axios.get(changeableUrl)

        //es6 shorthand syntax
        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }

        return modifiedData
    }catch(error){

    }
}

//for chart data
export const fetchDailyData = async ()=>{
    try{
        const {data} = await axios.get(`${url}/daily`)

        //data is an array
        // console.log(data)

        //we return an array of objects which has only required data
        const modifiedData = data.map((dailyData) => ({
              confirmed: dailyData.confirmed.total,
              deaths: dailyData.deaths.total,
              date: dailyData.reportDate
        }))
        return modifiedData
    }catch(error){

    }
}


//for displaying countries options
export const fetchCountries = async () =>{
    try{
        const {data: {countries}} = await axios.get(`${url}/countries`)
        // console.log(response)

        return countries.map(({name}) => name)
    }catch(error){

    }
}
