import React from 'react';
// import Cards from './components/Cards/Cards';

import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css'
import { fetchData } from './api'

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data: {},
       country: ''        //initially no country is selected from options
    }
  }
  
 
  async componentDidMount() {
    const fetchedData = await fetchData()   //since await works only with asynchronous functions we need to wrap componentDidMount with async

    this.setState({
      data: fetchedData
    })
    console.log(fetchedData)
  }

  handleCountryChange = async (country) =>{
        //fetch the data
        const fetchedData = await fetchData(country)

        console.log(fetchedData)

        //set the state
        this.setState({
           data: fetchedData,
           country: country
        })
        //1:15:59 we need to update chart bar code now
  }
  
  render(){
 
    const {data,country} = this.state

    return (
      <div className={styles.container}>
         <h1>Covid-19 Tracker</h1>
         <Cards data={data}/>
         <CountryPicker handleCountryChange={this.handleCountryChange}/>
         <Chart data={data} country={country}/>
      </div>
    );
  }
}

export default App;
