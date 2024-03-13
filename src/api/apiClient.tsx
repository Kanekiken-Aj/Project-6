// import { API_ENDPOINT } from "./endPoint";
// const API_KEY = 'BitdeltaExchange';


const fetcher:any = async(API_ENDPOINT:any) => {

    const response = await fetch(API_ENDPOINT
       
        
    );
    const data = await response.json()
    // console.log(data)
    return data;

}
const fetcherWithKey = async (API_ENDPOINT: string, API_KEY: string) => {
    try {
        const response = await fetch(API_ENDPOINT, {
            headers: {
                'X-Api-Key': API_KEY
            }
        });
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export {fetcher,fetcherWithKey} 