// BitdeltaMarketPairs.tsx
import React, { useState, useEffect } from 'react';
import convertToMillions from './Helper';
import SplineChart from './SplineChart';
import { Flex, Box, Text } from '@chakra-ui/react';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINT, {
                    headers: {
                        'X-Api-Key': API_KEY
                    }
                });
                const data: PairsData = await response.json();
                setPairsData(data);
            } catch (err: any) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <Flex justifyContent="space-around" paddingTop="20px" height={"100%"} overflow={'auto'}>
            {pairsData?.data.spot.slice(0, 4).map((pair: Pair, index: number) => (
                <Box
                    key={pair.symbol}
                    className='card'
                    borderRadius='10px'
                    boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
                    height='120px'
                    width='220px'
                    border='1px solid #ccc'
                    display='flex'
                    flexDirection='column'
                    padding='.7rem'
                >
                    <Box><Text fontWeight='2rem'>{pair.keywords[0] + ` `}{pair.currency1}</Text></Box>
                    
                    <Box display={'flex'} justifyContent={'space-between'} >
                        <Box> <Text fontSize='1rem'>{`$${convertToMillions(pair.pricing[0])}`}</Text>
                        <Text fontSize='.8rem' color={pair.change > 0 ? 'green' : 'red'}>{`${pair.change.toFixed(2)}`}</Text></Box>
                        {/* <Box m={'12px'} h={'60%'} ><SplineChart data={pair.pricing} index={`${pair.keywords[0]}${index}`} change={pair.change}/></Box> */}
                    </Box>
                   

                </Box>
            ))}
        </Flex>

    );
};

export default BitdeltaMarketPairs;
