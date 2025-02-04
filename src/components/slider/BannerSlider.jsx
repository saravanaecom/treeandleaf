import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Container, Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { API_FetchBannerOfferPost } from '../../services/bannerOfferPostServices';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

// Create animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled components using MUI styling
const SliderWrapper = styled(Box)({
  '& .slick-dots': {
    bottom: 20,
    '& li button:before': {
      color: 'white',
      fontSize: 12,
      opacity: 0.8
    },
    '& li.slick-active button:before': {
      color: 'white',
      opacity: 1
    }
  },
  '& .slick-prev, & .slick-next': {
    zIndex: 1,
    width: 40,
    height: 40,
    '&:before': {
      fontSize: 40
    }
  },
  '& .slick-prev': {
    left: 20
  },
  '& .slick-next': {
    right: 20
  }
});

const AnimatedSlide = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  '&:hover img': {
    transform: 'scale(1.05)'
  }
});

const SlideImage = styled(Box)({
  transition: 'transform 0.8s ease-in-out',
  animation: `${fadeIn} 1s ease-in-out`
});

export default function BannerSlider() {
  const [bannerSliderLists, setBannerSliderLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const GetBannerSliderLists = async () => {
    try {
      const bannerList = await API_FetchBannerOfferPost();
      setBannerSliderLists(bannerList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetBannerSliderLists();
  }, []);

  const settings = {
    dots: true,
    infinite: bannerSliderLists.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: bannerSliderLists.length > 1,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true,
    cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)"
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 2, p: { xs: 0, sm: 0 } }}>
      <SliderWrapper>
        <Slider {...settings}>
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: {
                      xs: 200,
                      sm: 320,
                      md: 400,
                      lg: 500,
                    },
                    width: "100%",
                    margin: '0 auto',
                  }}
                />
              </Box>
            ))
          ) : (
            bannerSliderLists.map((item) => (
              <AnimatedSlide key={item.id}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0))',
                    zIndex: 1
                  }}
                />
                <SlideImage
                  component="img"
                  sx={{
                    height: {
                      xs: 200,
                      sm: 320,
                      md: 400,
                      lg: 300,
                    },
                    width: "100%",
                    display: 'block',
                    margin: '0 auto',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                  src={ImagePathRoutes.BannerOfferPostImagePath + item.Imagepath}
                  alt={item.Imagepath}
                />
              </AnimatedSlide>
            ))
          )}
        </Slider>
      </SliderWrapper>
    </Container>
  );
}
