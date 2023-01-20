import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Container, Box, Stack, Typography, Card, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import { ProductCartWidget } from '.';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductDetail.propTypes = {
    product: PropTypes.object,
};

export default function ShopProductDetail() {

    // Unpacks the state props from the product list page
    const { state } = useLocation();
    const { product } = state;
    const { product_name, cover, price } = product;

    const handleClick = () => {
        
    }

    return (
        <>
            <Helmet>
                <title> Dashboard: Products | Minimal UI </title>
            </Helmet>

            <Container maxWidth='xs'>
                <Card>
                    <Box sx={{ pt: '100%', position: 'relative' }}>
                        <StyledProductImg alt={product_name} src={cover} sx={{ maxHeight: 1 / 1 }} />
                    </Box>
                </Card>
                <ProductCartWidget />

                <Stack spacing={2}>
                    <Typography variant="heading2" noWrap>
                        {product_name}
                    </Typography>

                    <Typography variant="subtitle1">
                        {fCurrency(price)}
                    </Typography>

                    <Button onClick={() => {
                        alert('clicked');
                    }} variant="contained">Add to cart</Button>
                </Stack>
            </Container>
        </>
    )
};


// Description
// Add to cart