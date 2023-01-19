import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { getProductsBySku } from 'src/api';
import { sk } from 'date-fns/locale';

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

    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

    const { sku } = useParams();

    // GETs product data via API/index.js, sets local state.
    useEffect(() => {
        getProductsBySku(`http://localhost:8000/products/${sku}`)
            .then((data) => {
                setProduct(data)
                setLoading(false);
            })
    }, []);

    const { product_name, cover, price, colors, status, priceSale } = product;

    return (
        <Box sx={{ pt: '100%', position: 'relative' }}>
            {status && (
                <Label
                    variant="filled"
                    color={(status === 'sale' && 'error') || 'info'}
                    sx={{
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: 'absolute',
                        textTransform: 'uppercase',
                    }}
                >
                    {status}
                </Label>
            )}
            <StyledProductImg alt={product_name} src={cover} />
        </Box>
    )
};


// Description
// Add to cart