import React, { useState, useEffect } from 'react';
import convertToMillions from './Helper';
// import fetcher from '../api/apiClient';

const API_ENDPOINT = 'https://api.bitdelta.com/api/v1/market/pairs';
const API_KEY = 'BitdeltaExchange';

interface Pair {
    symbol: string;
    pricing: number[];
    keywords: string[];
    currency1: string;
    change: number;


}

interface PairsData {
    data: {
        spot: Pair[];
    };
}

const BitdeltaMarketPairs: React.FC = () => {
    const [pairsData, setPairsData] = useState<PairsData | null>(null);
    // const [change, setchange] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINT, {
                    headers: {
                        'X-Api-Key': API_KEY
                    }
                });

                const data: PairsData = await response.json();
                // console.log(data.data.spot[0].symbol);
                setPairsData(data);
            } catch (err: any) {
                console.log(err)
            }
        };

        fetchData();

    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '20px' }}>
            {/* <h2>Bitdelta Market Pairs</h2> */}


            {pairsData?.data.spot.slice(0, 5).map((pair: Pair) => (
                <div key={pair.symbol} className='card' style={{
                    borderRadius: '10px',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                    height: '120px',
                    width: '220px',
                    border: '1px solid #ccc',
                    display: 'flex',
                    flexDirection: 'column', padding: '.7rem'
                }}>
                    <h2 style={{ fontWeight: '2rem' }} >{pair.keywords[0] + ` `}{pair.currency1} </h2>
                    <div style={{ fontSize: '1rem' }}>{`$${convertToMillions(pair.pricing[0])}`}</div>
                    <div style={{ fontSize: '.8rem', color: pair.change > 0 ? 'green' : 'red' }}>{`${pair.change.toFixed(2)}`}
        
                    </div>
                </div>
            ))}

        </div>

    );
};

export default BitdeltaMarketPairs;
