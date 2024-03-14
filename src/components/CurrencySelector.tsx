import React, { useState, useEffect } from "react";
import { fetcher } from "../api/apiClient";
import { API_ENDPOINT } from "../api/endPoint";
import { HiOutlineGlobeAlt, } from "react-icons/hi2";
import {BsChevronUp,BsChevronDown} from "react-icons/bs"
import { RiCheckboxCircleFill} from "react-icons/ri";


interface Currency {
  id: string;
  name: string;
  symbol: string;
}

const BitdeltaCurrencySelect: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<any>('Select Currency');
  const [showPairs, setShowPairs] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(API_ENDPOINT + `fiat-currency`);
        setCurrencies(response.data.currencies);
        // console.log(response.data.currencies)
      } catch (error: any) {
        console.log(error)

      }
    };

    fetchData();
  }, []);

  const toggleShowPairs = () => {
    setShowPairs(!showPairs);
  };

  const onHover = (currency: string) => {
    return (
      selectedCurrency === currency ? <RiCheckboxCircleFill /> :''
    );
  };

  return (
    <div className="parent" style={{backgroundColor:'#ADD8E6',padding:'.7rem', width:'14rem'}}>
    <div style={{ width:'12rem', display: 'flex', flexDirection: 'column'}}>
      <div
        style={{ display: 'flex', alignItems: 'center', border: '1px solid black', cursor: 'pointer', padding: '0.5rem' , justifyContent:'space-around',
        borderRadius:'0.5rem',background:'white' }}
        onClick={toggleShowPairs}
      >
        <span ><HiOutlineGlobeAlt /></span>
        <span>{selectedCurrency}</span>
        <span >{showPairs? <BsChevronUp/>:<BsChevronDown/>}</span>

      </div>
      
    </div>
    {showPairs && (
      <div style={{ height:'8rem',border: '1px solid black', padding: '0.5rem', borderRadius:'0.5rem' ,overflow: 'auto',width:'12rem', background:'white' , marginTop:'0.2rem' }}>
        {currencies.map((currency) => (
          <span
            key={currency.id}
            onClick={() => {
              setSelectedCurrency(currency.name)
              setShowPairs(!showPairs)
            }}
            onMouseEnter={() => setSelectedCurrency(currency.name)}
            onMouseLeave={() => setSelectedCurrency('Select Currency')}
            style={{ display: 'flex', cursor: 'pointer' ,justifyContent:'space-around'}}
          >
            {currency.name+` `} {currency.symbol}
            <div style={{ marginLeft: '0.5rem' }}>{onHover(currency.name)}</div>
          </span>
        ))}
      </div>
    )}
    </div>
  );
};

export default BitdeltaCurrencySelect;
