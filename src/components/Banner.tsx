import React, { useState, useEffect } from "react";
import { fetcher } from "../api/apiClient";
import { API_ENDPOINT } from "../api/endPoint";


interface Banner {
  id: number;
  url: string;
  
}

const BannerSelector: React.FC = () => {
  const [Banners, setBanners] = useState<Banner[]>([]);
//   const [selectedCurrency, setSelectedCurrency] = useState<any>('Select Currency');
//   const [showPairs, setShowPairs] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(API_ENDPOINT + `general`);
        setBanners(response.data.banners);
        // console.log(response.data.banners[0].url)
      } catch (error: any) {
        console.log(error)

      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div>
        </div></>
    // <div className="parent" style={{backgroundColor:'#ADD8E6',padding:'.7rem', width:'14rem'}}>
    // <div style={{ width:'12rem', display: 'flex', flexDirection: 'column'}}>
    //   <div
    //     style={{ display: 'flex', alignItems: 'center', border: '1px solid black', cursor: 'pointer', padding: '0.5rem' , justifyContent:'space-around',
    //     borderRadius:'0.5rem',background:'white' }}
    //     onClick={toggleShowPairs}
    //   >
    //     <span ><HiOutlineGlobeAlt /></span>
    //     <span>{selectedCurrency}</span>
    //     <span >{showPairs? <BsChevronUp/>:<BsChevronDown/>}</span>

    //   </div>
      
    // </div>
    // {showPairs && (
    //   <div style={{ height:'8rem',border: '1px solid black', padding: '0.5rem', borderRadius:'0.5rem' ,overflow: 'auto',width:'12rem', background:'white' , marginTop:'0.2rem' }}>
    //     {currencies.map((currency) => (
    //       <span
    //         key={currency.id}
    //         onClick={() => {
    //           setSelectedCurrency(currency.name)
    //           setShowPairs(!showPairs)
    //         }}
    //         style={{ display: 'flex', cursor: 'pointer' ,borderBottom:'0.4px solid black',justifyContent:'center'}}
    //       >
    //         {currency.name+` `} {currency.symbol}
    //       </span>
    //     ))}
    //   </div>
    // )}
    // </div>
  );
};

export default BannerSelector;
