import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../icons/logo.svg'
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import { makeStyles } from '@mui/styles';
import Navbar from './navbar';
import Sidebardb from '../dashboard/sidebardb';

const useStyles = makeStyles({

    social: {
        color: '#3DC1F2',
        transition: '0.5s',
        '&:hover': {
            color: '#fff'
        }
    },

    mob: {
        display: 'none',
        position: 'relative',
        '@media(max-width : 1200px)': {
            display: 'block'
        }
    },
    logoutbtn: {
        backgroundColor: '#FBEF03',
        color: '#000',
        padding: '1rem 2rem',
        borderRadius: '30px',
        margin: '0rem 1rem',
        textDecoration: 'none',
        position: 'absolute',
        top: '30rem'
    }


});


const StyledMenu = styled(Link)(({ theme }) => ({
    backgroundColor: '#FBEF03 !important',
    color: '#000 !important',
    padding: '10px',
    display: 'inline-flex',
    textDecoration: 'none',
    fontWeight: '700 !important',
    borderRadius: '5rem',
    transition: '0.5s',
    ':hover': {
        backgroundColor: '#FBEF03 !important',
        color: "#000"
    }
}));

const styles = {
    color: '#000 !important'
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function DashboardSidebar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <>
            <Box>
                <Box
                    sx={{
                        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, textAlign: 'end', margin: '15px',
                        '& .MuiDrawer-paper': {
                            backgroundColor: 'red', // Your desired background color
                        },
                    }}
                    role="presentation"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                >
                    <Link href={'#'} > <CloseIcon sx={{ color: '#FBEF03' }} /> </Link>




                </Box>

                <Box className={classes.mob}>
                    <Sidebardb />
                    {/* <Link className={classes.logoutbtn} href={''}>Logout</Link> */}
                </Box>

            </Box>
        </>
    );

    return (
        <Box>
            {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>

                    <StyledMenu
                        onClick={toggleDrawer(anchor, true)}
                        href={""}>
                        <MenuIcon style={styles} />
                    </StyledMenu>
                    <Drawer
                        sx={{
                            '& .MuiDrawer-paper': {
                                backgroundColor: '#311250', // Your desired background color
                            },
                        }}
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </Box>
    );
}
