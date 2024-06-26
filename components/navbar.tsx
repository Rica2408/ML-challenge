import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, MouseEvent } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

export const categories = ["men's clothing", "jewelery", "electronics", "women's clothing", "all"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const router = useRouter();
    const { id } = useParams();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { category } = router.query;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (category: string) => {
        setAnchorEl(null);
        router.push({
            pathname: '',
            query: { category },
        });

    };

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#ffe600' }}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    {id && <IconButton onClick={() => router.back()}>
                        <ArrowBackIcon sx={{ color: "#06437c" }} />
                    </IconButton>}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 600,
                            textDecoration: 'none',
                            color: "#06437c"
                        }}
                    >
                        Mercado libre - challenge
                    </Typography>

                    <Box display="flex">
                        {!id &&
                            <Box>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#ffe600',
                                        color: 'black',
                                        marginRight: '10px',
                                        '&:hover': {
                                            bgcolor: '#ffe600', // Keeps the background color the same on hover
                                        },
                                    }}                                >
                                    {category && category !== 'all' ? category : 'Categorias'}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} onClick={() => handleClose(category)}>
                                            <Typography textAlign="center">{category}</Typography>
                                        </MenuItem>
                                    )
                                    )}
                                </Menu>
                            </Box>}
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Ricardo Reyes" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar