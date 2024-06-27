'use client'

import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box, TextField, InputAdornment } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ProductType } from '../api/products/route';

type ProductCardProps = {
    product: ProductType,
    isEditabled?: boolean,
    setCurrentProduct?: Dispatch<SetStateAction<ProductType>>,
    details?: boolean,
    isCancel?: boolean,
    setIsCancel?: Dispatch<SetStateAction<boolean>>
}

const styles = {
    media: {
        height: 250,
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
    },
    star: {
        color: '#FFD700',
    },
};

const ProductCard: FC<ProductCardProps> = ({ product, isEditabled = false, details, isCancel, setIsCancel, setCurrentProduct = () => {} }) => {
    const router = useRouter();
    const [title, setTitle] = useState(product.title || '');
    const [description, setDescription] = useState(product.description || '');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.target.value);
            setCurrentProduct((value) => ({ ...value, title: event.target.value }));
        
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescription(event.target.value);
            setCurrentProduct((value) => ({ ...value, description: event.target.value }));
        
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        if (parseFloat(value) >= 0) {
            setPrice(value);
                setCurrentProduct(v => ({ ...v, price: parseFloat(value) }));
        
        }
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        if (parseFloat(value) >= 0 && parseFloat(value) <= 5) {
            setRating(value);
                setCurrentProduct(v =>({ ...v, rating: { rate: parseFloat(value), count: product.rating?.count ?? 0 } }));
            
        }
    };

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setDescription(product.description);
            setPrice(product.price.toString());
            setRating(product.rating?.rate.toString() || '');
        }
    }, [product]);

    useEffect(() => {
        if (isCancel && setIsCancel) {
            setTitle(product.title);
            setDescription(product.description);
            setPrice(product.price.toString());
            setRating(product.rating?.rate.toString() || '');
            setIsCancel(false);
        }
    }, [isCancel]);

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: details ? 'row' : 'column',
                maxWidth: details ? 600 : 320,
                justifyContent: "center",
                alignItems: "center"
            }}
            onClick={() => !details ? router.push(`/product/${product.id}`) : {}}
        >
            {details ? (
                <CardMedia
                    component="img"
                    sx={{ width: 200, height: 200, objectFit: 'contain', padding: '16px' }}
                    image={product.image || '/not_found.jpg'}
                    alt={product.title}
                />
            ) :
                <CardMedia
                    sx={{ ...styles.media, objectFit: 'contain', padding: '16px' }}
                    component="img"
                    image={product.image || '/not_found.jpg'}
                    alt={product.title}
                />}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardActionArea>
                    <CardContent>
                        {details ? (
                            <>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Titulo"
                                    value={title}
                                    onChange={(event) => handleTitleChange(event)}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: !isEditabled,
                                    }}

                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Descripción"
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={(event) => handleDescriptionChange(event)}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: !isEditabled,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Precio"
                                    type="number"
                                    value={price}
                                    onChange={handlePriceChange}
                                    margin="normal"
                                    error={price !== '' && (parseFloat(price) < 0)}
                                    helperText={price !== '' && (parseFloat(price) < 0) ? 'Invalid price' : ''}
                                    InputProps={{
                                        readOnly: !isEditabled,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                $
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Rating"
                                    type="number"
                                    value={rating}
                                    onChange={handleRatingChange}
                                    margin="normal"
                                    inputProps={{ min: "0", max: "5", step: "0.1" }}
                                    error={rating !== '' && (parseFloat(rating) < 0 || parseFloat(rating) > 5)}
                                    helperText={rating !== '' && (parseFloat(rating) < 0 || parseFloat(rating) > 5) ? 'Rating must be between 0 and 5' : ''}
                                    InputProps={{
                                        readOnly: !isEditabled,
                                    }}

                                />

                            </>
                        ) : (
                            <>
                                <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '20px' }}>
                                    {title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {details || description.length <= 100 ? description : `${description.slice(0, 100)}...`}
                                </Typography>
                            </>
                        )}
                    </CardContent>
                </CardActionArea>
            </Box>
        </Card>
    );
};

export default ProductCard;