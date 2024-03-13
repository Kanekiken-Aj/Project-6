// import { useState } from 'react'

// import './App.css'
import BitdeltaMarketPairs from './components/CryptoPrice'
import BitdeltaCurrencySelector from './components/CurrencySelector'
import LanguageSelector from './components/LanguageSelector'
import CoinPriceTable from './components/CoinPriceTable'
import { ChakraProvider } from '@chakra-ui/react'
import BannerSelector from './components/Banner'

function App() {

  return (

    <ChakraProvider>
      {/* <div style={{padding:'20px'}}>
      <h2>Testing</h2><br></br>
      <LanguageSelector />
      <BitdeltaCurrencySelector />
      <BitdeltaMarketPairs/>
      </div>
      <CoinPriceTable /> */}
      <BannerSelector/>

    </ChakraProvider>


  )
}

export default App
