import BannerSlider from "../components/slider/BannerSlider";
import ImageCategorySlider from "../components/slider/ImageCategorySlider";
import OfferFastMovingProduct from "../components/slider/offerFastMovingProduct";
import ProductByIndexPage from '../components/slider/productByIndexPage';
import { Container } from '@mui/material';

export default function HomePage() {
    return (
        <>
            <Container maxWidth="xl">
                <BannerSlider />    
                <OfferFastMovingProduct/>            
                <ImageCategorySlider />
                <ProductByIndexPage/>
            </Container>
        </>
    )
};