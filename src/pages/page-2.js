import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { API } from "aws-amplify"
import Amplify from "aws-amplify"
import Config from "../aws-exports.js"

Amplify.configure(Config)

  function SecondPage () {

    //const [tps, updatetps] = useState([])

    const[coins, updatecoins] = useState([])

    async function callApi(){
      try {
       // const testapi = await API.get('cryptoapi','/tps')
        const cryptodata = await API.get('cryptoapi','/coins')
        console.log(cryptodata)
        //console.log('testapi:',testapi)
       updatecoins(cryptodata.coins)
        //updatetps(testapi.tps)
      } catch (error) {
        console.log({error})
      }
    }

    
    useEffect(()=>{
      callApi();
    },[])

   
    return(
      <Layout>
        <SEO title="server"/>
        <h1>Hello World!!</h1>
        {
          //console.log(tps);
          //tps.map((t,i)=><h1>{t.name}</h1>)

          coins.map((c,i) => <ul>
            
            <h3>{c.name} <span>({c.symbol})</span></h3>
            <h4>$ {(+c.price_usd).toFixed(2)}</h4>
            <li>
              <p>{c.percent_change_1h}% 1hr</p>
              <p>{c.percent_change_24h}% 24hr</p>
              <p>{c.percent_change_7d}% 7days</p>	
            </li>

          </ul>)

          
        }
        
        <Link to="/">Homepage</Link>
      </Layout>
      
    )
} 

export default SecondPage
