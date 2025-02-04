/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Box, Typography, Grid } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SmsIcon from '@mui/icons-material/Sms';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useCart } from '../../context/CartContext';
import { ServerURL } from '../../server/serverUrl';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid #f0f4f9`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#FFF',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0),
    alignItems: 'center'
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '0px solid #f0f4f9',
}));

export default function AccordionAmountDetails({ useWallet, walletAmount }) {
  const { cartItems } = useCart();
  const [expanded, setExpanded] = React.useState('panel1');
  const [MRPAmount, setMRPAmount] = React.useState(0);
  const [SavingsAmount, setSavingsAmount] = React.useState(0);
  const [TotalPrice, setTotalPrice] = React.useState(0);
  const [ExtraDiscount, setExtraDiscount] = React.useState(0);
  const [HandlingCharge, setHandlingCharge] = React.useState(0);
  const [DeliveryFee, setDeliveryFee] = React.useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalMRP = cartItems.reduce((acc, item) => acc + (item.totalMRP > 0 ? item.totalMRP : item.MRP), 0);
      const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  
      setMRPAmount(totalMRP);
      setTotalPrice(totalPrice);
      setSavingsAmount(totalMRP - totalPrice);

      if (useWallet) {
        setTotalPrice((prevPrice) => prevPrice - walletAmount);
      } else {
        setTotalPrice(totalPrice);
      }
    }
  }, [cartItems, useWallet, walletAmount]);
  

  return (
    <div>
      <Accordion sx={{display: 'none'}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <VolunteerActivismIcon sx={{ marginRight: '15px', color: '#5c5c5c' }} />
          <Typography sx={{ color: '#262a33', fontSize: '14px', fontWeight: 600, fontFamily: 'inherit' }}>Delivery partner tip
            <Typography sx={{ fontSize: '.75rem', lineHeight: '1rem', fontWeight: 400, fontFamily: 'inherit' }}>This amount goes to your delivery partner</Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: '14px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{display: 'none'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <SmsIcon sx={{ marginRight: '15px', color: '#5c5c5c' }} />
          <Typography sx={{ color: '#262a33', fontSize: '14px', fontWeight: 600, fontFamily: 'inherit' }}>Delivery instructions
            <Typography sx={{ fontSize: '.75rem', lineHeight: '1rem', fontWeight: 400, fontFamily: 'inherit' }}>Delivery partner will be notified</Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: '14px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{p: 0}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            {/* Left section: Icon and text */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ReceiptIcon sx={{ marginRight: '15px', color: '#5c5c5c' }} />
              <Box>
                <Typography sx={{ color: '#262a33', fontSize: '14px', fontWeight: 600, fontFamily: 'inherit' }}>To pay</Typography>
                <Typography variant="body2" sx={{ color: '#a3a4ae', fontSize: '12px', fontWeight: 400, fontFamily: 'inherit' }}>
                  Incl. all taxes and charges
                </Typography>
              </Box>
            </Box>

            {/* Right section: Price and savings */}
            <Box sx={{ textAlign: 'right' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="p"
                  sx={{
                    textDecoration: 'line-through',
                    color: '#a3a4ae',
                    marginRight: '8px',
                    fontSize: '12px'
                  }}
                >
                  {MRPAmount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '12px', color: '#253D4E' }}>
                  {TotalPrice.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Box>
              <Typography
                variant="p"
                sx={{
                  background: 'linear-gradient(290deg, rgba(34, 155, 82, 0.18), rgba(34, 155, 82, 0))',
                  color: '#229b52',
                  fontWeight: '600',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  display: 'inline-block',
                  fontSize: '10px',
                }}
              >
                {'SAVINGS' + SavingsAmount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{pt: 0}}>
          <Box sx={{ width: '100%' }}>
            <Grid container>
              <Grid item xs={8} sx={{mt: 0.5}}>
                <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">MRP Total Amount</Typography>
              </Grid>
              <Grid item xs={4} sx={{mt: 0.5}}>
                <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                {MRPAmount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
              
              <Grid item xs={8} sx={{mt: 0.5, display: 'none'}}>
                <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Extra discount</Typography>
              </Grid>
              <Grid item xs={4} sx={{mt: 0.5, display: 'none'}}>
                <Typography sx={{ fontSize: '14px' }} variant="body1" align="right" color="green">
                {ExtraDiscount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
              <Grid item xs={8} sx={{mt: 0.5, display: 'none'}}>
                <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Handling charge</Typography>
              </Grid>
              <Grid item xs={4} sx={{mt: 0.5, display: 'none'}}>
                <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                {HandlingCharge.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Grid>

              <Grid item xs={8} sx={{mt: 0.5, display: 'none'}}>
                <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Delivery fee:</Typography>
              </Grid>
              <Grid item xs={4} sx={{mt: 0.5, display: 'none'}}>
                <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                {DeliveryFee.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Grid>

              <Grid item xs={8} sx={{mt: 0.5}}>
                <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Today Savings</Typography>
              </Grid>
              <Grid item xs={4} sx={{mt: 0.5}}>
                <Typography sx={{ fontSize: '14px' }} variant="body1" align="right" color="green">
                  <span></span>
                {SavingsAmount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Grid>

              <Grid item xs={8} sx={{mt: 0.5}}>
                <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Total Amount</Typography>
              </Grid>
              <Grid item xs={4} sx={{mt: 0.5}}>                
                <Typography sx={{ fontSize: '14px', fontWeight: 600 }} variant="body1" align="right">
                  {(TotalPrice + DeliveryFee + HandlingCharge - ExtraDiscount).toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
