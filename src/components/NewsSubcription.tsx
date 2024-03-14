import React, { useState } from 'react';
import { Box, Input, Button, Flex, Image, Heading, Text } from '@chakra-ui/react';
import axios from 'axios'

const NewsSubscription: React.FC<any> = () => {
    const [email, setEmail] = useState('');
    const [enable, setEnable] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEnable(e.target.value !== ''); // Update enable based on whether email has a value
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://api-staging.bitdelta.com/api/v1/public/news-subscription', { email });
            console.log(response)
            if (response.status === 200) {
                console.log('Subscription successful');
                return (
                    <>

                    </>
                )
            } else {
                console.error('Subscription failed:', response.statusText);
            }
        } catch (error: any) {
            console.error('Error occurred while subscribing:', error.message);
        }
    };


    //   const handleSubmit = () => {
    //     console.log('Submitted email:', email);
    //     setEmail('');
    //     setEnable(false); // Reset enable after submission
    //   };

    return (
        <Flex justifyContent="center" alignItems="center">
            <Box flex="1">
                <Image src="https://as1.ftcdn.net/v2/jpg/05/71/06/76/1000_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg" alt="Subscription Image" width="100%" />
            </Box>

            <Flex flex="1" flexDir="column" justifyContent="center" alignItems="center">
                <Heading as='h1' pt={'3px'}>
                    Sign Up For Email
                </Heading>
                <Text pb='10'>
                    Sign up to receive NAMI emails and get first news on new arrival, sales, exclusive content, events and more!
                </Text>
                <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    size="md"
                    mb="4"
                />
                {enable && (
                    <Button onClick={handleSubmit} colorScheme="blue">
                        Submit
                    </Button>
                )}
                </Flex>
        </Flex>
    );
};

export default NewsSubscription;
