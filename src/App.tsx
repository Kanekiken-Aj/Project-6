// import { useState } from 'react'

// import './App.css'
import BitdeltaMarketPairs from './components/CryptoPrice'
import BitdeltaCurrencySelector from './components/CurrencySelector'
import LanguageSelector from './components/LanguageSelector'
import CoinPriceTable from './components/CoinPriceTable'
import { ChakraProvider } from '@chakra-ui/react'
import BannerSelector from './components/Banner'
import NewsSubscription from './components/NewsSubcription'
// import SplineChart from './components/SplineChart'
// import SplineChart from './components/chart'

function App() {
//   const pricingData = [
//     73489.39, 72855.15, 72707.99, 72152.39, 72209.99, 72049.99, 71980, 72005.37, 71410.69,
//     71452, 71162.01, 70844.84, 71037.63, 71349.99, 71388.23, 71014.72, 70507.38, 71703.01,
//     71669.01, 72293.8, 72193.19, 72023.82, 71887.67, 71936, 71677.32
// ];

  return (

    <ChakraProvider>
      <div style={{padding:'20px'}}>
      <h2>Testing</h2><br></br>
      <LanguageSelector />
      <BitdeltaCurrencySelector />
      <BitdeltaMarketPairs/>
      </div>
      <CoinPriceTable />
      <BannerSelector/>
      {/* <SplineChart  data={pricingData}/> */}
    <NewsSubscription/>
    </ChakraProvider>


  )
}

export default App
