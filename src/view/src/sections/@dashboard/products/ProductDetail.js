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
import { addToCart } from 'src/api';
import { useCartContext } from 'src/contexts/cart';

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

    const { setCart } = useCartContext();

    const handleClick = async () => {

        // Fix this - make 'add to cart' button add the product selected
        // Return the entire cart object to the context.

        const cartItems = await addToCart({"sku":"MTQ440T103", "qty":"4", "id":"10"});
        setCart(cartItems);
    };

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

                    <Button onClick={handleClick} variant="contained">Add to cart</Button>
                </Stack>
            </Container>
        </>
    )
};


// Description
// Add to cart