import React, {useState,useEffect} from 'react'
import {NativeSelect, FormControl} from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { fetchCountries } from '../../api'

function CountryPicker({handleCountryChange}) {
   const [fetchedCountries,setFetchedCountries] = useState([])
   useEffect(() => {
       const getCountries = async ()=>{
            setFetchedCountries(await fetchCountries())             
       }

       getCountries()
   }, [setFetchedCountries])

    console.log(fetchedCountries)

    return (
        <div>
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
                    <option value="">Global</option>
                    {
                        fetchedCountries.map((country,i) => <option value={country} key={i}>{country}</option>)
                    }
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default CountryPicker

//but we need to make an api call for that specific coutry also that is also in index.js under api