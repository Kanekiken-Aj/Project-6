import React, { useState, useEffect } from "react";
import { fetcher } from "../api/apiClient";
import { API_ENDPOINT } from "../api/endPoint";
import { Flex, useMediaQuery, Image, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'


interface Banner {
    id: number;
    url: string;
    mobile_url: string;
    tab_url: string;
    color:string

}

const BannerSelector: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isMobile] = useMediaQuery('(max-width: 600px)');
    const [isTablet] = useMediaQuery('(max-width: 960px)');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetcher(API_ENDPOINT + `general`);
                setBanners(response.data.banners);
                // console.log(response.data.banners[0].color)
              
                // console.log(banners)
            } catch (error: any) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 10000); // Rotate every 10 seconds

        return () => clearInterval(interval);
    }, [banners.length]);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const getbanner = () => {
        if (banners.length === 0) {
            return ''
        }
        const banner = banners[currentIndex]
    
        // console.log('hell');
        if (isMobile) {
            return banner.mobile_url || banner.url;
        } else if (isTablet) {
            return banner.tab_url || banner.url;
        } else {
            return banner.url;
        }

    }

    return (
        // <div style={{ display: 'flex', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
        //     <button onClick={handlePrevClick} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>Previous</button>
        //     <div key={banners[currentIndex]?.id} style={{ backgroundImage: `url("${banners[currentIndex]?.url}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '100%', height: '300px' }}></div>
        //     <button onClick={handleNextClick} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>Next</button>
        // </div>
<>
        
        <Flex align="center"  bg='hsl(0, 0%, 90%)' justifyContent='center' backgroundColor='#182d7c'>
            
            <IconButton aria-label="Previous" size="sm" icon={<ChevronLeftIcon />} onClick={handlePrevClick} />
            <Flex overflow="hidden" justifyContent='center 'width='100%' >
              
                <Image src={getbanner()}  maxWidth="90%" width="90%" alt={`Banner ${currentIndex} `} />
            </Flex>
            <IconButton aria-label="Next" size="sm" icon={<ChevronRightIcon />} onClick={handleNextClick} />
        </Flex>
        </>
    );

};



// ${banners[currentIndex]?.url}
export default BannerSelector;
