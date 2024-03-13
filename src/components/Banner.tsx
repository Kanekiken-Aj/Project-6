import React, { useState, useEffect } from "react";
import { fetcher } from "../api/apiClient";
import { API_ENDPOINT } from "../api/endPoint";


interface Banner {
    id: number;
    url: string;

}

const BannerSelector: React.FC = () => {
    const [Banners, setBanners] = useState<Banner[]>([]);

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

    return (
        <>
            {/* {console.log(Banners)} */}
            {Banners.map((item) => (
                <div key={item.id} style={{ backgroundImage: `url("${item.url}")`,   backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat', width: '100%', height: '300px' }}>
                
                </div>
            ))}




        </>

    );
};

export default BannerSelector;
