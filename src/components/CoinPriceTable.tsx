// Create a Coin Price Table
import React, { useState, useEffect } from 'react';
import { fetcherWithKey} from "../api/apiClient";
// import { API_ENDPOINT } from "../api/endPoint";
import convertToMillions from './Helper';
import {
    Box,
    Table,
    Flex,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    // useMediaQuery
} from '@chakra-ui/react'
import SplineChart from './SplineChart';



interface Pair {
    symbol: string;
    pricing: number[];
    keywords: string[];
    change: number;
    volume: number;
    high: number;
    low: number;
    currency1:string;
}

interface PairsData {
    data: {
        spot: Pair[];
    };
}

const API_ENDPOINT = 'https://api.bitdelta.com/api/v1/market/pairs';
// const imageApi = 'https://media.wazirx.com/media/btc/84.png'
const API_KEY = 'BitdeltaExchange';

const CoinPriceTable: React.FC = () => {
    const [pairsData, setPairsData] = useState<PairsData | null>(null);
    // const [image, setImage] = useState<any>();

    const [count, setCount] = useState<number>(0);
    // const [isMobile] = useMediaQuery('(max-width: 600px)');
    // const [isTablet] = useMediaQuery('(max-width: 960px)');
    

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
    //     const intervalId = setInterval(fetchData, 3000); 

    // return () => clearInterval(intervalId);

        
    }, []);
    // const getWidth = () => {
    //     if (isMobile) {
    //         return '90%';
    //     } else if (isTablet) {
    //         return '80%';
    //     } else {
    //         return '100%';
    //     }
    // };
    // const imagefetcher=()=>{
    //     const fetchData = async () => {
    //         try {
    //             const response = await ImagefetcherWithKey(imageApi, API_KEY);
    //             // setCount(prevCount => prevCount + 1);
    //             // console.log(response)
    //             setImage(response);
    //         } catch (error: any) {
    //             console.log(error)
    //         }
    //     };
    //     fetchData();
    // }
    return (
        <div style={{height:'450px', overflow:'auto'}}>
            <br />
            {/* <h2 style={{fontWeight:'600'}}>Bitdelta Coin Price Table</h2> */}
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
                    <Thead >
                        <Tr>
                            
                            <Th>Name</Th>
                            <Th>Last Price</Th>
                            <Th>24H High</Th>
                            <Th>24H Low</Th>
                            <Th>24H Change</Th>
                            <Th>24H Supply</Th>
                            <Th>Last 24H Chart</Th>

                        </Tr>
                    </Thead>
                    <Tbody >
                        {pairsData?.data.spot.map((pair: Pair, index:number) => (
                            <Tr key={pair.symbol}>
                                <Td >
                                    {/* <Box backgroundImage={imagefetcher} height={'20px'}></Box> */}
                                <Flex>{pair.keywords[0].split(' ')[0]}{` ${pair.currency1}`}</Flex></Td>
                                <Td style={{color: pair.change > 0 ? 'green' : 'red'}}>${pair.pricing[0]}</Td>
                                <Td>${pair.high.toFixed(2)}</Td>
                                <Td>${pair.low.toFixed(2)}</Td>
                                <Td style={{color: pair.change > 0 ? 'green' : 'red'}}>{pair.change.toFixed(2)}%</Td>
                                {/* <Td>{convertToMillions(pair.volume.toFixed(2))}</Td> */}
                                <Td>{convertToMillions((pair.volume).toFixed(2))}</Td>
                                <Td  ><Box m={'12px'} h={'40px'} ><SplineChart data={pair.pricing} index={`${pair.currency1}${index}`} change={pair.change} /></Box></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CoinPriceTable;


// 