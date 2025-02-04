import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

export default function TermsAndConditions() {
    return (
        <>
            <Container  maxWidth="xl" sx={{px: { xs: 0, md: 3 }}}>
                <Box elevation={3} sx={{ padding: 4, pt: 1, marginTop: 1 }} align="left">
                    <Typography variant="h4" fontSize={22} fontWeight={600} gutterBottom align="left">
                        Terms and Conditions
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="left">
                        Last Updated on January 01, 2022
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Typography variant="h6" fontSize={18} fontWeight={600}>Personal Information</Typography>
                    <Typography variant="body1" paragraph>
                    It contains personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the site or our mobile application. We may collect your personal information to provide the best service to you. The informations like mobile number and e-mail address is used for authentication purpose and also to recognise you uniquely, so that we are able to respond to your queries quickly. Address informations have been taken for delivery of the products.
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Typography variant="h6" fontSize={18} fontWeight={600}>Services Overview</Typography>
                    <Typography variant="body1" paragraph>
                        We provide the best shopping experience of vegetables, fruits and cereal by our quality products. We always in a step ahead of your delivery requests. Our team is always ready to clarify your queries.
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Typography variant="h6" fontSize={18} fontWeight={600}>License & Site access</Typography>
                    <Typography variant="body1" paragraph>
                        Any user can access our site in free of cost and any user can purchase the products with gross amount of order. With whom your information will be shared Personal information like address and mobllie number are shared to our agent only when you request for delivery. Other informations like login credentials will not be shared with anyone.
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />                   

                    <Typography variant="h6" fontSize={18} fontWeight={600}>With whom your information will be shared</Typography>
                    <Typography variant="body1" paragraph>
                        Personal information like address and mobllie number are shared to our agent only when you request for delivery. Other informations like login credentials will not be shared with anyone.
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Typography variant="h6" fontSize={18} fontWeight={600}>Account & Registration Obligations</Typography>
                    <Typography variant="body1" paragraph>
                        A new user has to provide an unique mobile number and e-mail address while sign up. No previously used mobile number and e-mail address can generate a new user account.
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Typography variant="h6" fontSize={18} fontWeight={600}>Cancellation by Site / Customer</Typography>
                    <Typography variant="body1" paragraph>
                        Cancellation will be accepted only if the order is not out for delivery.
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Typography variant="h6" fontSize={18} fontWeight={600}>Return & Refunds</Typography>
                    <Typography variant="body1" paragraph>
                        Approved refunds will be credited to the respected mode of payments, like UPI or Debit/Credit Card or Internet banking.
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Typography variant="h6" fontSize={18} fontWeight={600}>You Agree and Confirm</Typography>
                    <Typography variant="body1" paragraph>
                        I agree to the Terms and Conditions.
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />                    
                </Box>
            </Container>
        </>
    )
};