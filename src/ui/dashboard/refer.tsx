import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import r1 from '../../icons/r1.svg'
import r2 from '../../icons/r2.svg'
import r3 from '../../icons/r3.svg'
import r4 from '../../icons/r4.svg'
import r5 from '../../icons/r5.svg'
import r6 from '../../icons/r6.svg'
import AddressCopy from "@/theme/components/addressCopy";
import Link from "next/link";
import Image from "next/image";
import { UseReadContractsReturnType, useAccount } from "wagmi";
import linkbtnimg from '../../icons/linkbtnimg.svg'
import RefBottom from "./refBottom";
import { Abi, formatEther } from "viem";
import { tsibReferralAbi } from "@/configs/abi/tsibReferral"
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import { formatNumberToCurrencyString } from "@/lib/formatNumberToCurrencyString";


const useStyles = makeStyles({
    mainDiv: {
        margin: '40px 40px 20px 40px',

        '@media(max-width : 1200px)': {
            margin: '20px 20px 20px 20px',
        }
    },

    step__one: {
        border: '1px solid #595c61',
        borderRadius: '12px'
    },
    step__one_box: {
        backgroundColor: '#101012',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media(max-width : 600px)': {
            flexWrap: 'wrap',
            justifyContent: 'center'
        }
    },
    Top_hding: {
        textAlign: 'center'
    },
    box__logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    step__two_box: {
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between',
        padding: '1rem',
        '@media(max-width : 1200px)': {
            gap: '1.5rem',
            '@media(max-width : 600px)': {
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.5rem',
            }
        }
    },

    step__two: {
        marginTop: '1rem',
    },
    list___bx: {
        backgroundColor: '#101012',
        border: '1px solid #595c61',
        padding: '1rem',
        borderRadius: '12px',
        textAlign: 'center',
        height: '100%'
    },
    step__three: {
        border: '1px solid #595c61',
        borderRadius: '12px',
        padding: 4,
        marginTop: '1rem',
    },
    coin_hding: {
        backgroundColor: '#101012',
        padding: '1.5rem',
        borderRadius: '10px 10px 0px 0px',
        textAlign: 'center',
        fontWeight: 500,
    },
    currentsale: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2rem',
        '@media(max-width : 600px)': {
            flexWrap: 'wrap',
            justifyContent: 'center'
        }
    },
    slider__img: {
        width: '100%'
    },
    currentsale2: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    rama__log: {
        backgroundColor: '#101012',
        border: '1px solid #595c61',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        alignItems: 'center',
        gap: '10px',
        marginTop: '1.5rem'
    },
    max_btn: {
        backgroundColor: '#00FFFF',
        padding: '10px 20px',
        borderRadius: '8px',
        color: '#000',
        textDecoration: 'none',
        fontWeight: 500,
    },
    max_btn__wrap: {
        backgroundColor: '#101012',
        border: '1px solid #595c61',
        borderRadius: '12px',
        display: 'flex',
        padding: '2px',
        marginTop: '0.5rem'
    },

    worth: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        alignItems: 'center',
        padding: '1rem 0rem'
    },
    buy__btn: {
        backgroundColor: '#00FFFF',
        padding: '10px 20px',
        borderRadius: '30px',
        color: '#000',
        textDecoration: 'none',
        fontWeight: 700,
        display: 'block',
        textAlign: 'center',
        fontSize: '20px'
    },
    middleBox: {
        padding: '0rem 2rem 1rem 2rem',
        '@media(max-width : 600px)': {
            padding: '0rem 1rem 1rem 1rem'
        }
    },
    step__four: {
        border: '1px solid #595c61',
        borderRadius: '12px',
        padding: '1rem',
        height: '100%'
    },
    step__four2: {
        border: '1px solid #595c61',
        borderRadius: '12px',



    },
    referral: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem'
    },
    ref__link: {
        backgroundColor: '#00FFFF',
        padding: '0.5rem 1rem',
        borderRadius: '0px 0px 8px 8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        '@media(max-width : 1200px)': {
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }
    },
    sldr: {
        width: '100%'
    },
    coinlinewrp: {
        '@media(max-width : 600px)': {
            display: 'none'
        }
    }

});

const Refer = ({ resultOfTsibTokenPrice, resultOfReferralDetail }: { resultOfTsibTokenPrice: any, resultOfReferralDetail: any }) => {
    const classes = useStyles();

    const { address } = useAccount();


    const refEarning = [
        {
            id: 1,
            Title: "YOUR REFERRALS",
            data1: `${resultOfReferralDetail?.data?.[1].result > 0 ? resultOfReferralDetail?.data?.[1].result.toString() : 0}`,
            data2: '',
            image: r1,
        },
        {
            id: 2,
            Title: "YOUR REFERRAL EARNINGS",
            data1: `${convertToAbbreviated(formatEther?.(BigInt?.(resultOfReferralDetail?.data?.[0].result ? resultOfReferralDetail?.data?.[0].result.rewards.toString() : 0)))}`,
            data2: `${formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(resultOfReferralDetail?.data?.[0].result ? resultOfReferralDetail?.data?.[0].result.rewards.toString() : 0))) * (Number(
                formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
            )), 3)}`,
            image: r2,
        },
        {
            id: 3,
            Title: "YOUR LEFT SIDE EARNINGS",
            data1: `$${convertToAbbreviated(formatEther?.(BigInt?.(resultOfReferralDetail?.data?.[0].result ? resultOfReferralDetail?.data?.[0].result.leftBusiness.toString() : 0)))}`,
            data2: ``,
            image: r3,
        },
        {
            id: 4,
            Title: "YOUR RIGHT SIDE EARNINGS",
            data1: `$${convertToAbbreviated(formatEther?.(BigInt?.(resultOfReferralDetail?.data?.[0].result ? resultOfReferralDetail?.data?.[0].result.rightBusiness.toString() : 0)))}`,
            data2: ``,
            image: r4,
        },
        {
            id: 5,
            Title: "YOUR SELF EARNINGS",
            data1: `Left Side: $${convertToAbbreviated(formatEther?.(BigInt?.(resultOfReferralDetail?.data?.[3].result ? resultOfReferralDetail?.data?.[3].result[0].toString() : 0)))} Right Side: $${convertToAbbreviated(formatEther?.(BigInt?.(resultOfReferralDetail?.data?.[3].result ? resultOfReferralDetail?.data?.[3].result[1].toString() : 0)))}`,
            data2: ``,
            image: r5,
        },
        {
            id: 6,
            Title: "YOUR ELIGIBLE REWARD",
            data1: `${resultOfReferralDetail?.data?.[4].result}`,
            data2: ``,
            image: r6,
        },

    ]

    return (
        <>
            <Box className={classes.step__four2}>
                <Box sx={{
                    padding: '1rem'
                }}>
                    <Grid container spacing={2}  >
                        {refEarning.map((item, index) => (
                            <Grid key={index} item lg={6} md={6} sm={12} xs={12}>
                                <Box p={1.6} className={classes.step__four2}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Box >
                                            <Typography fontSize={20} color={'#999'}>{item.Title}</Typography>
                                            <Typography fontSize={20} color={'#fff'} variant="h4">{item.data1}</Typography>
                                            <Typography fontSize={16} color={'#999'}>{item.data2}</Typography>
                                        </Box>
                                        <Box sx={{ backgroundColor: 'transparent !important' }}>
                                            <Image src={item.image} alt={""} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <RefBottom />
            </Box>
        </>
    )
}

export default Refer;