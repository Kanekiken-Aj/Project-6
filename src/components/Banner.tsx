import React, { useState, useEffect } from "react";
import { fetcher } from "../api/apiClient";
import { API_ENDPOINT } from "../api/endPoint";


interface Banner {
    id: number;
    url: string;

}

const BannerSelector: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetcher(API_ENDPOINT + `general`);
                setBanners(response.data.banners);
                // console.log(response.data.banners)
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

    return (
        // <div style={{ display: 'flex', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
        //     <button onClick={handlePrevClick} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>Previous</button>
        //     <div key={banners[currentIndex]?.id} style={{ backgroundImage: `url("${banners[currentIndex]?.url}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '100%', height: '300px' }}></div>
        //     <button onClick={handleNextClick} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>Next</button>
        // </div>
        <div style={{ position: 'relative', height: '60vh', backgroundColor: '#182D7C', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '80%', height: '80%' }}>
                <button onClick={handlePrevClick} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1, color: 'white' }}>Previous</button>
                <div key={banners[currentIndex]?.id} style={{ backgroundImage: `url("${banners[currentIndex]?.url}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain', width: '100%', height: '100%' }}></div>
                <button onClick={handleNextClick} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1, color: 'white' }}>Next</button>
            </div>
        </div>

    );
};

export default BannerSelector;
