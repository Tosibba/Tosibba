import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import linkbtnimg from '../../icons/linkbtnimg.svg'
import Image from 'next/image';
import { Box, styled, Typography } from '@mui/material';
import Heading from './heading';
import close from '../../icons/close.svg'
import AddressReward from './addressReward';
import { useAccount } from 'wagmi';
import instagram from '../../icons/instagram.png'
import discord from '../../icons/discord.png'
import github from '../../icons/github.png'
import YouTubeIcon from '@mui/icons-material/YouTube';

import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from "react-share";
import shortenString from '@/lib/shortenString';
import { Address } from 'viem';


const BoxSocial = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '2rem',
    padding: '0rem 2rem'
}));

export default function Modal() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { address } = useAccount();

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const referLink = `https://tosibba.com/?ref=${address}`

    return (
        <React.Fragment>


            <Link onClick={handleClickOpen('body')} href={"#"} style={{ backgroundColor: 'transparent' }}><Image src={linkbtnimg} alt={""} /></Link>
            <Dialog
                sx={{
                    backgroundColor: '#0000008f',
                    '& .MuiDialog-paperScrollBody': {
                        backgroundColor: '#101012',
                        border: '1px solid #FBEF03',
                        padding: '2rem 0rem',
                        borderRadius: '12px'
                    }
                }}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <Box textAlign={'center'}>
                    <Link href={''} onClick={handleClose}><Image width={40} src={close} alt={''} /></Link>
                </Box>
                <DialogContent dividers={scroll === 'paper'}>
                    <Box textAlign={'center'}>
                        <Typography sx={{
                            '@media(max-width : 900px)': { fontSize: '16px' }
                        }} variant='h5' color={'#FBEF03'} fontFamily={'Bruce Forever!important'}>Earn more TSIB by referring your friends and community!</Typography>
                        <Typography mt={2} color={'#fff'}>Share your unique link below and receive <Typography component={'span'}><Link style={{ textDecoration: 'none', color: '#FBEF03' }} href={''}>10%</Link>  of all transactions realized with your link <Typography component={'span'}><Link style={{ textDecoration: 'none', color: '#FBEF03' }} href={''}>instantly </Link>!</Typography></Typography></Typography>
                    </Box>
                </DialogContent>
                <AddressReward textColor={'#000 !important'} text={referLink} address={`https://tosibba.com/?ref=${shortenString(address as Address)}`} />
                <BoxSocial>

                    {/* <TwitterShareButton
                     url={referLink}
                    >
                        <XIcon size={32} round={true} />
                    </TwitterShareButton> */}

                    {/* <WhatsappShareButton
                        url={referLink}
                    >
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton> */}
                    <FacebookShareButton
                        url={'https://www.facebook.com/profile.php?id=61565893463853'}
                    >
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <Link href={'https://www.instagram.com/tosibba/'} target='_blank'><Image src={instagram} alt={''} width={32} /></Link>

                    <Link style={{backgroundColor:'red',
                        width:'32px',
                        height:'32px',
                        borderRadius:'40px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center'
                    }} href={'https://www.youtube.com/channel/UCAUhJWMLWKtZ1BQbeg1otpg'} target='_blank'><YouTubeIcon  sx={{width:32, color:'#fff'}}/></Link>

                    {/* <LinkedinShareButton
                        url={referLink}
                    >
                        <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton> */}


                    {/* <TelegramShareButton
                        url={referLink}
                    >
                        <TelegramIcon size={32} round={true} />
                    </TelegramShareButton> */}


                    {/* <Link href={'/'} target='_blank'><Image src={discord} alt={''} width={32}/></Link>
                    <Link href={'/'} target='_blank'><Image src={github} alt={''} width={32}/></Link> */}

                </BoxSocial>
            </Dialog>
        </React.Fragment>
    );
}
