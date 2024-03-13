// Create a Coin Price Table
import React, { useState, useEffect } from 'react';
import { fetcherWithKey } from "../api/apiClient";
// import { API_ENDPOINT } from "../api/endPoint";
import convertToMillions from './Helper';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'


interface Pair {
    symbol: string;
    pricing: number[];
    keywords: string[];
    change: number;
    volume: number;
    high: number;
    low: number;
    display_name:string;
}

interface PairsData {
    data: {
        spot: Pair[];
    };
}

const API_ENDPOINT = 'https://api.bitdelta.com/api/v1/market/pairs';
const API_KEY = 'BitdeltaExchange';

const CoinPriceTable: React.FC = () => {
    const [pairsData, setPairsData] = useState<PairsData | null>(null);
    const [count, setCount] = useState<number>(0);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetcherWithKey(API_ENDPOINT, API_KEY);
                setCount(prevCount => prevCount + 1);
                // console.log(response)
                setPairsData(response);
            } catch (error: any) {
                console.log(error)
            }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 3000); 

    return () => clearInterval(intervalId);

        
    }, []);

    return (
        <div>
            <br />
            <h2 style={{fontWeight:'600'}}>Bitdelta Coin Price Table</h2>
            {/* <ul>
                {pairsData?.data.spot.map((pair: Pair) => (
                    <li key={pair.symbol}> {`Name: ${pair.coin_slug}`} <br></br>{`Price: $${pair.pricing[0]}`}
                        <br></br>
                        {`24H High: ${pair.high.toFixed(2)}%`}<br></br>
                        {`24H Low: ${pair.low.toFixed(2)}%`}<br></br>
                        {`24H Change: ${pair.change.toFixed(2)}%`}
                        <br></br>
                        {`24H Volume: ${pair.volume.toFixed(2)}`}</li>
                ))}
            </ul> */}
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Coin Price Table{count}</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Last Price</Th>
                            <Th>24H High</Th>
                            <Th>24H Low</Th>
                            <Th>24H Change</Th>
                            <Th>24H Volume</Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {pairsData?.data.spot.map((pair: Pair) => (
                            <Tr key={pair.symbol}>
                                <Td ><div>{pair.display_name}</div><div>{pair.keywords[0]}</div></Td>
                                <Td style={{color: pair.change > 0 ? 'green' : 'red'}}>${pair.pricing[0]}</Td>
                                <Td>${pair.high.toFixed(2)}</Td>
                                <Td>${pair.low.toFixed(2)}</Td>
                                <Td style={{color: pair.change > 0 ? 'green' : 'red'}}>{pair.change.toFixed(2)}%</Td>
                                {/* <Td>{convertToMillions(pair.volume.toFixed(2))}</Td> */}
                                <Td>{convertToMillions((pair.volume).toFixed(2))}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CoinPriceTable;
