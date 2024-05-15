import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { CartContext } from '../context/cart';
import toast from 'react-hot-toast';

export const Products = () => {
    const [products, setProducts] = useState([{
        products:'',
        quantity: 0,	
    }]);
    const [cart, setCart] = useContext(CartContext);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    const addToCart = (product) => {
        const productInCart = cart.find((item) => item.product._id === product._id);
        if (productInCart) {
            setCart(
                cart.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
            localStorage.setItem('cart', JSON.stringify(cart.map((item) =>
                item.product._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )));
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        localStorage.setItem('cart', JSON.stringify([...cart, { product, quantity: 1 }]));
        }
        toast.success('Added to cart')
    }
    return (
        <Grid container spacing={2} style={{ overflowX: 'auto', padding: '20px' }}>
        {products.map((product) => (
            <Grid item key={product.id} xs={6} md={4} lg={2}>
                <Card sx={{ maxWidth: 345 , height: '100%' }} >
                <CardActionArea>
                <CardMedia
                component="img"
                image={product.images}
                // object fit cover height change 
                style={{ objectFit: 'cover', height: '140px' }}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            <Button color="primary" onClick={() => addToCart(product)}>
                                Buy Now
                            </Button>
            </CardActions>
                </Card>
            </Grid>
        ))}
        </Grid>
    );
};

