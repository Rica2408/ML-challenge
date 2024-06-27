import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material"
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useState } from "react";
import { ProductType } from "../api/products/route";

type AddProductoModalProps = {
    open: boolean,
    handleClose: () => void
    setLocalProducts: Dispatch<SetStateAction<ProductType[]>>
    products: ProductType[]
    setShowAlert: Dispatch<SetStateAction<boolean>>
    setTextAlert: Dispatch<SetStateAction<string>>
}

const addProduct = async (product: ProductType, setTextAlert: Dispatch<SetStateAction<string>>) => {
    try {
        const response = await fetch(`http://localhost:3000/api/product/${product.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        setTextAlert('Se agrego el producto correctamente');
        return data;
    } catch (error) {
        setTextAlert('Error al agregar el producto');
        console.error(error);
    }
}

const AddProductoModal = ({ open, handleClose, setLocalProducts, products, setTextAlert, setShowAlert }: AddProductoModalProps) => {
    const [product, setProduct] = useState<ProductType>({
        title: '',
        description: '',
        price: 0,
        category: '',
        id: 0
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handlerSave = async () => {
        const storedProducts = localStorage.getItem('products');
        const localStorageProducts = storedProducts ? JSON.parse(storedProducts) : [];
        const newProduct = await addProduct(product, setTextAlert);
        const id = Math.floor(Math.random() * (2000 - 21 + 1)) + 21
        setLocalProducts([{...product, id}, ...products]);
        localStorage.setItem('products', JSON.stringify([{...newProduct, id}, ...localStorageProducts]));
        setShowAlert(true);
        setProduct({
            title: '',
            description: '',
            price: 0,
            category: '',
            id: 0
        });
        handleClose();
    }

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Agregar nuevo producto
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Titulo"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Descripcion"
                    id="description"
                    multiline
                    rows={4}
                    value={product.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Precio"
                    id="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                />
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    name="category"
                    label="Categoria"
                    id="category"
                    value={product.category}
                    onChange={handleChange}
                >
                    {["men's clothing", "jewelery", "electronics", "women's clothing"].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button 
                    autoFocus 
                    disabled={!product.title || !product.description || !product.price || !product.category}
                    onClick={handlerSave}>
                   Agrear
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddProductoModal