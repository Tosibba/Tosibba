'use client'
import { Box, Button, CircularProgress, circularProgressClasses, CircularProgressProps, Grid, InputBase, LinearProgress, linearProgressClasses, Slider, styled, Typography } from "@mui/material"
import DashboardHeader from "../shared/dashboardHeader"
import { makeStyles } from '@mui/styles';
import Image from "next/image";
import dleft from '../../icons/dleft.svg'
import dright from '../../icons/dright.svg'
import Heading from "@/theme/components/heading";
import rmesta from '../../icons/Sheild.svg'
import shield from '../../icons/Sheild.svg'
import slider1 from '../../icons/slider1.svg'
import slider2 from '../../icons/slider2.svg'
import l1 from '../../icons/l1.svg'
import l2 from '../../icons/l2.svg'
import l3 from '../../icons/l3.svg'
import Text from "@/theme/components/text";
import coinline from '../../icons/coinline.svg'
import Link from "next/link";
import dollar from '../../icons/t1.svg'
import r2 from '../../icons/r2.svg'
import AddressCopy from "@/theme/components/addressCopy";
import linkbtnimg from '../../icons/linkbtnimg.svg'
import Refer from "./refer";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useEffect, useState } from "react";
import { useAccount, useBlockNumber, useBalance, useChainId, useReadContract, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Address, formatEther, parseEther, zeroAddress } from "viem";
import { tsibTokenAbi } from "@/configs/abi/tsibTokenAbi";
import { tsibContractAddresses } from "@/configs";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import rusd from '../../icons/rusd.svg'
import rlogo from '../../icons/rlogo.svg'

import { tsibReferralAbi } from "@/configs/abi/tsibReferral";
import { rusdAbi } from "@/configs/abi/rusd";
import { formatNumberToCurrencyString } from "@/lib/formatNumberToCurrencyString";
import { tsibStakingAbi } from "@/configs/abi/tsibStaking";
import ConnectWallet from "../shared/connectWallet";
import shortenString from "@/lib/shortenString";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from '@tanstack/react-query'
import { extractDetailsFromError } from "@/lib/extractDetailsFromError";
import { toast } from "react-toastify";

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
        backgroundColor: '#311250',
        borderRadius: '12px',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media(max-width : 600px)': {
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem'
        }
    },
    Top_hding: {
        textAlign: 'center'
    },
    box__logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'left',
        '@media(max-width : 600px)': {
            justifyContent: 'center',
        }
    },
    box__logo2: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'end',
        '@media(max-width : 600px)': {
            justifyContent: 'center',
        }
    },
    step__two_box: {
        display: 'flex',
        alignItems: 'center',
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
        backgroundColor: '#311250',
        border: '1px solid #FBEF0347',
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
        height: '100%'
    },
    coin_hding: {
        backgroundColor: '#311250',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px'
    },
    rama__log: {
        backgroundColor: '#311250',

        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        alignItems: 'center',
        gap: '10px',
        marginTop: '1.5rem'
    },
    max_btn: {
        backgroundColor: '#FBEF03!important',
        padding: '10px 20px',
        borderRadius: '8px !important',
        color: '#000 !important',
        textDecoration: 'none',
        fontWeight: 500,
        '&:hover': {
            backgroundColor: '#FBEF03!important',
            color: '#000 !important'
        }

    },
    max_btn__wrap: {
        backgroundColor: '#311250',
        border: '1px solid #595c61',
        borderRadius: '12px',
        display: 'flex',
        padding: '2px',
        marginTop: '0.5rem'
    },
    apply_btn__wrap: {
        backgroundColor: '#311250',
        border: '1px solid #595c61',
        borderRadius: '12px',
        display: 'flex',
        padding: '2px',
        marginTop: '0.9rem'
    },

    worth: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        alignItems: 'center',
        padding: '1rem 0rem',
        flexWrap: 'wrap'
    },
    apply: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        alignItems: 'center',
        padding: '1rem 0rem'
    },
    validation: {
        display: 'flex',
        justifyContent: 'start',
        gap: '8px',
        alignItems: 'start',
        padding: '1rem 0rem',

    },
    buy__btn: {
        backgroundColor: '#FBEF03!important',
        padding: '10px 20px !important',
        borderRadius: '30px !important',
        color: '#000 !important',
        textDecoration: 'none',
        fontWeight: 700,
        gap: "8px",
        display: 'flex',
        textAlign: 'center',
        fontSize: '20px',
        '&:hover': {
            backgroundColor: '#FBEF03',
            color: '#000'
        }
    },
    middleBox: {
        padding: '0rem 2rem 1rem 2rem',
        '@media(max-width : 600px)': {
            padding: '0rem 0.4rem 1rem 0.4rem'
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
        backgroundColor: '#FBEF03',
        padding: '0.5rem 1rem',
        borderRadius: '0px 0px 8px 8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1
    },
    sldr: {
        width: '100%'
    },
    coinlinewrp: {
        '@media(max-width : 600px)': {
            display: 'none'
        }
    },
    sliderBox: {


        padding: '10px !important',

        '& .MuiSlider-rail': {
            background: 'none',
            height: '30px'
        },
        '& .MuiSlider-track': {
            background: 'linear-gradient(0deg, #fff, #fff)',
        },
        '& .MuiSlider-thumb': {
            background: 'linear-gradient(0deg, #FBEF03, #FBEF03)',
            padding: '16px',
        },

    },
    sliderBoxTwo: {
        padding: '10px !important',
        '& .MuiSlider-root': {
            padding: '10px !important'
        },
        '& .MuiSlider-rail': {
            background: 'none',
            height: '30px'
        },
        '& .MuiSlider-track': {
            background: 'linear-gradient(0deg, #fff, #fff)',
        },
        '& .MuiSlider-thumb': {
            background: 'linear-gradient(270deg, #000000, #FBEF03)',
            padding: '16px',
        },


    },
    validate__box: {
        backgroundColor: '#311250',
        margin: '1rem auto auto auto',
        width: '250px',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '30px',
        border: '1px solid red',

    },
    box_List: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        '@media(max-width : 600px)':{
            flexWrap:'wrap',
            justifyContent:'center'
        }
    }

});


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 30,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#311250',
        border: '1px solid #595c61'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 30,
        background: 'linear-gradient(90deg, #080808, #FBEF0378)',
    },
}));


const Buy = ({ resultOfRusdBalance, resultOfTsibTokenPrice, resultOfCheckAllowance }: any) => {
    const classes = useStyles();
    const [valueTop, setValueTop] = useState<number>(1);
    const searchParams = useSearchParams()
    const [buyInput, setBuyInput] = useState("")
    // const [showInput, setShowInput] = useState<boolean>(false);
    const refParam = searchParams.get('ref')
    const [isAproveERC20, setIsApprovedERC20] = useState(true);
    const { address } = useAccount()
    const chainId = useChainId()
    const queryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({ watch: true, })

    const [selectedCardId, setSelectedCardId] = useState<number>(0); // Track selected card

    const handleCardClick = (id: number) => {
        setSelectedCardId(id); // Update the selected card
    };

    const { writeContractAsync: approveWriteContractAsync, data: approveData, isPending: isPendingApproveForWrite } = useWriteContract(
        {
            mutation: {
                onSettled(data, error, variables, context) {
                    if (error) {
                        toast.error(extractDetailsFromError(error.message as string) as string)
                    } else {
                        setIsApprovedERC20(true)
                        setBuyInput('')
                        toast.success("Your RUSD Approved successfully")
                    }
                },
            }
        }
    )
    const { isLoading: isLoadingApprove } = useWaitForTransactionReceipt({
        hash: approveData,
    })

    const { writeContractAsync, data, isPending: isPendingBuyForWrite } = useWriteContract(
        {
            mutation: {
                onSettled(data, error, variables, context) {
                    if (error) {
                        toast.error(extractDetailsFromError(error.message as string) as string)
                    } else {
                        setBuyInput('')
                        toast.success("Your RUSD Staking successfully")
                    }
                },
            }
        }
    )
    const { isLoading } = useWaitForTransactionReceipt({
        hash: data,
    })


    const balanceOfRama = useBalance({
        address: address
    })


    const handleMax = () => {
        setBuyInput((formatEther?.(BigInt?.(
            !selectedCardId ?
                balanceOfRama?.data?.value ? balanceOfRama?.data?.value.toString() : 0
                : resultOfRusdBalance?.data ? resultOfRusdBalance?.data.toString() : 0
        ))))
    }



    const resultOfRamaPriceInUSD = useReadContract({
        abi: tsibStakingAbi,
        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
        functionName: 'ramaPriceInUSD',
        args: [],
        account: zeroAddress
    })


    useEffect(() => {
        if (resultOfCheckAllowance && address) {
            const price = parseFloat(buyInput === "" ? "20" : buyInput)
            const allowance = parseFloat(formatEther?.(resultOfCheckAllowance.data ?? 0))
            if (allowance >= price) {
                setIsApprovedERC20(true)
            } else {
                setIsApprovedERC20(false)
            }
        }
    }, [resultOfCheckAllowance, address, buyInput]);

    // use to refetch
    useEffect(() => {

        queryClient.invalidateQueries({ queryKey: resultOfCheckAllowance.queryKey })
        queryClient.invalidateQueries({ queryKey: balanceOfRama.queryKey })
        queryClient.invalidateQueries({ queryKey: resultOfRusdBalance.queryKey })
        queryClient.invalidateQueries({ queryKey: resultOfTsibTokenPrice.queryKey })
    }, [blockNumber, queryClient, resultOfCheckAllowance, balanceOfRama, resultOfRusdBalance,resultOfTsibTokenPrice])

    const Box__list = [

        {
            id: 0,
            title: 'RAMA',
            img: rusd,


        },
        {
            id: 1,
            title: 'RUSD',
            img: rlogo,

        },



    ]

    return (
        <>
            <Box  >
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box className={classes.step__three}>
                            <Box className={classes.coin_hding}>
                                <Typography variant="h5" color={'#fff'}>Buy Coins</Typography>
                            </Box>
                            <Box className={classes.middleBox}>

                                {/* <Box textAlign={'center'} mt={3}>
                                    <Typography>  <Typography component={'span'} color={'#fff'}>Private Sale</Typography></Typography>
                                </Box> */}

                                {/* <Box className={classes.currentsale}>
                                    <Box>
                                        <Typography color={'#999'}>Total Coin Sales USD</Typography>
                                        <Typography sx={{
                                            '@media(max-width : 600px)':{
                                                textAlign:'center'
                                            }
                                        }} variant="h6" color={'#fff'} fontWeight={500}> $0.00
                                        </Typography>
                                        <Typography sx={{
                                            '@media(max-width : 600px)':{
                                                textAlign:'center'
                                            }
                                        }} variant="h6" color={'#fff'} fontWeight={500}>{formatNumberToCurrencyString(
                                            resultOfSaleDetails?.data ?
                                                Number(
                                                    formatEther?.(BigInt?.(resultOfSaleDetails?.data?.saleRateInUsd ? resultOfSaleDetails?.data?.saleRateInUsd.toString() : 0))) *
                                                Number(formatEther?.(BigInt?.(resultOfSaleDetails?.data?.tokenAmount ? resultOfSaleDetails?.data?.tokenAmount.toString() : 0)))
                                                : 0
                                        )}</Typography>
                                    </Box>
                                    <Box>
                                        <Image className={classes.coinlinewrp} src={coinline} alt={""} />
                                    </Box>
                                    <Box textAlign={'end'}>
                                        <Typography color={'#999'}>Total Coins Sold</Typography>
                                        <Typography sx={{
                                            '@media(max-width : 600px)':{
                                                textAlign:'center'
                                            }
                                        }} variant="h6" color={'#fff'} fontWeight={500}>$0.00</Typography>
                                        <Typography sx={{
                                            '@media(max-width : 600px)':{
                                                textAlign:'center'
                                            }
                                        }} variant="h6" color={'#fff'} fontWeight={500}>{formatNumberToCurrencyString(
                                            resultOfSaleDetails?.data ?
                                                Number(
                                                    formatEther?.(BigInt?.(resultOfSaleDetails?.data?.saleRateInUsd ? resultOfSaleDetails?.data?.saleRateInUsd.toString() : 0))) *
                                                (
                                                    Number(formatEther?.(BigInt?.(resultOfSaleDetails?.data?.tokenAmount ? resultOfSaleDetails?.data?.tokenAmount.toString() : 0))) -
                                                    Number(formatEther?.(BigInt?.(resultOfSaleDetails?.data?.saleQuantity ? resultOfSaleDetails?.data?.saleQuantity.toString() : 0)))
                                                )
                                                : 0
                                        )}</Typography>
                                    </Box>
                                </Box> */}

                                {/* <Box mt={3} mb={0.5} sx={{ position: 'relative' }}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        position: 'absolute',
                                        left: '2.8rem',
                                        top: '0.1rem',
                                        zIndex: '1',

                                    }}
                                    >
                                        <Typography color={'#fff'}> Remaining:{convertToAbbreviated(value2, 4)}</Typography>
                                        <Typography color={'#fff'}> Remaining: $0.00</Typography>
                                        </Box>
                                    <Box>
                                        <Slider
                                    value={valueTop}
                                    // onChange={handleChange2}
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={100}
                                    className={classes.sliderBoxTwo}
                                    sx={{
                                        background: 'linear-gradient(90deg, #080808, #FBEF03)',
                                        border: '1px solid #595c61',
                                        borderRadius: '30px',
                                        padding: '10px 10px 10px 0px',
                                        '&.Mui-active': {
                                            boxShadow: '0 0 0 14px rgba(0, 0, 255, 0.16)', // Change this to your desired active color
                                        },
                                    }}
                                />
                                        <BorderLinearProgress variant="determinate" value={progressValue} />
                                    </Box>

                                </Box> */}

                                <Box sx={{
                                    gap: '1rem'
                                }} className={classes.currentsale2} mt={2}>

                                    {
                                        selectedCardId === 0 &&
                                        <Typography fontWeight={500} color={'#fff'}>RAMA Price :
                                            ${
                                                Number(
                                                    formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0))
                                                ).toFixed(4)
                                            }</Typography>

                                    }
                                    <Typography fontWeight={500} color={'#fff'}>TSIB Price : ${
                                        Number(
                                            formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                        ).toFixed(4)
                                    }</Typography>
                                </Box>

                                <Grid container spacing={1.2}>
                                    {Box__list.map((item, index) => (
                                        <Grid key={index} item lg={6} md={6} sm={6} xs={6}>
                                            <Box className={classes.rama__log}
                                                onClick={() => handleCardClick(item.id)}
                                                sx={{
                                                    border: selectedCardId === item.id ? '1px solid #FBEF03' : '1px solid #595c61', // Border change on selection
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Image src={item.img} alt={""} width={36} height={36} />
                                                <Typography variant="h6" fontWeight={500} color={'#fff'}>{item.title}</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box className={classes.max_btn__wrap}>
                                    <InputBase
                                        value={buyInput}
                                        onChange={(e) => setBuyInput(e.target.value)}
                                        sx={{
                                            flex: 1,
                                            color: '#fff',
                                            width: '100%',
                                            padding: '0.3rem 0.5rem',
                                            ':-moz-placeholder': {
                                                color: 'fff',
                                            },
                                            '@media(max-width : 600px)': {
                                                fontSize: '13px',
                                            },
                                            '& input[type=number]': {
                                                '-moz-appearance': 'textfield',
                                            },
                                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                '-webkit-appearance': 'none',
                                                margin: 0,
                                            },
                                        }}
                                        fullWidth
                                        placeholder={`Enter Amount in ${selectedCardId ? "RUSD" : "RAMA"}`}
                                        type={'number'}
                                    />
                                    <Button className={classes.max_btn} onClick={handleMax} href={""} >Max</Button>
                                </Box>
                                 
                                <Box className={classes.worth}>
                                    {!selectedCardId && (resultOfRamaPriceInUSD?.data && buyInput) && (


                                        <>
                                            <Box className={classes.box_List} mt={2}>
                                                <Image src={dollar} alt={""} width={40} />
                                                <Typography color={'#999'}>COST:
                                                    <Typography component={'span'} color={'#fff'}> ${
                                                        ((Number(Number(buyInput) > 0 ? buyInput : 0) *
                                                            Number(
                                                                formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0)))
                                                        )
                                                        ).toFixed(4)

                                                    }
                                                    </Typography>
                                                </Typography>
                                            </Box>

                                        </>
                                    ) 
                                    }
                                        <Box className={classes.box_List}>
                                        <Image src={shield} alt={""} width={40} />
                                        <Typography color={'#999'}>TSIB Receive:
                                            <Typography component={'span'} color={'#fff'}> {
                                                buyInput && resultOfRamaPriceInUSD?.data && resultOfTsibTokenPrice?.data ?
                                                    !selectedCardId ?
                                                        (0.99*((Number(Number(buyInput) > 0 ? buyInput : 0) *
                                                            Number(
                                                                formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0)))
                                                        ) /
                                                            Number(
                                                                formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0)))
                                                        )).toFixed(4)
                                                        :
                                                        (0.99*((Number(Number(buyInput) > 0 ? buyInput : 0)) /
                                                            Number(
                                                                formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0)))
                                                        )).toFixed(4)
                                                    : "0.00"
                                    }</Typography>(
                                        {
                                             buyInput && resultOfRamaPriceInUSD?.data && resultOfTsibTokenPrice?.data ?
                                             !selectedCardId ?
                                                 (0.01*((Number(Number(buyInput) > 0 ? buyInput : 0) *
                                                     Number(
                                                         formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0)))
                                                 ) /
                                                     Number(
                                                         formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0)))
                                                 )).toFixed(4)
                                                 :
                                                 (0.01*((Number(Number(buyInput) > 0 ? buyInput : 0)) /
                                                     Number(
                                                         formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0)))
                                                 )).toFixed(4)
                                             : '0.00'
                                        } Burn
                                    )</Typography>
                                    </Box>
                                </Box>

                                {address ?
                                    (
                                        selectedCardId ?
                                            (
                                                !isAproveERC20 ?
                                                    (
                                                        <Button

                                                            disabled={

                                                                (isPendingApproveForWrite || isLoadingApprove)

                                                            }
                                                            fullWidth={true}
                                                            className={classes.buy__btn}
                                                            sx={{
                                                                opacity: !(
                                                                    isPendingApproveForWrite || isLoadingApprove
                                                                )
                                                                    ? "1" : '0.3'
                                                            }}
                                                            onClick={async () => {
                                                                await approveWriteContractAsync({
                                                                    abi: rusdAbi,
                                                                    address: chainId === 1370 ? tsibContractAddresses.ramestta.rusd_Token : tsibContractAddresses.pingaksha.rusd_Token,
                                                                    functionName: 'approve',
                                                                    args: [
                                                                        chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking
                                                                        ,
                                                                        Number?.(buyInput) > 0 ? parseEther?.(buyInput) : parseEther?.(BigInt((Number.MAX_SAFE_INTEGER ** 1.3)?.toString())?.toString())
                                                                    ],
                                                                    account: address
                                                                })


                                                            }} >Approve RUSD
                                                            {
                                                                (isPendingApproveForWrite || isLoadingApprove) && <CircularProgress size={18} color="inherit" />
                                                            }
                                                        </Button>
                                                    )
                                                    : (
                                                        <Button

                                                            disabled={

                                                                (!buyInput || isPendingBuyForWrite || isLoading || (
                                                                    buyInput && (Number(buyInput) < 20)
                                                                ) || (
                                                                        Number(formatEther?.(BigInt?.(resultOfRusdBalance?.data ? resultOfRusdBalance?.data?.toString() : 0))) < Number(Number(buyInput) > 0 ? buyInput : 0)
                                                                    )
                                                                )
                                                            }
                                                            fullWidth={true}
                                                            className={classes.buy__btn}
                                                            sx={{
                                                                opacity: !((
                                                                    !buyInput || isPendingBuyForWrite || isLoading || (
                                                                        buyInput && (Number(buyInput) < 20)
                                                                    ) || (
                                                                        Number(formatEther?.(BigInt?.(resultOfRusdBalance?.data ? resultOfRusdBalance?.data?.toString() : 0))) < Number(Number(buyInput) > 0 ? buyInput : 0)
                                                                    )
                                                                ))
                                                                    ? "1" : '0.3'
                                                            }}
                                                            onClick={async () => {
                                                                try {

                                                                    await writeContractAsync({
                                                                        abi: tsibStakingAbi,
                                                                        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
                                                                        functionName: 'buy',
                                                                        args: [
                                                                            parseEther(buyInput)
                                                                        ],
                                                                        account: address
                                                                    })

                                                                } catch (error) {
                                                                    console.log(error);

                                                                }
                                                            }} >Buy TSIB
                                                            {
                                                                (isPendingBuyForWrite || isLoading) && <CircularProgress size={18} color="inherit" />
                                                            }
                                                        </Button>
                                                    )
                                            )
                                            :
                                            (
                                                <Button

                                                    disabled={

                                                        (!buyInput || isPendingBuyForWrite || isLoading || (
                                                            buyInput && (Number(buyInput) *
                                                                Number(
                                                                    formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0)))
                                                            ) < 20
                                                        ) || (
                                                                Number(formatEther?.(BigInt?.(balanceOfRama?.data?.value ? balanceOfRama?.data?.value.toString() : 0))) < Number(Number(buyInput) > 0 ? buyInput : 0)
                                                            )
                                                        )
                                                    }
                                                    fullWidth={true}
                                                    className={classes.buy__btn}
                                                    sx={{
                                                        opacity: !((
                                                            !buyInput || isPendingBuyForWrite || isLoading || (
                                                                buyInput && (Number(buyInput) *
                                                                    Number(
                                                                        formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0)))
                                                                ) < 20
                                                            ) || (
                                                                Number(formatEther?.(BigInt?.(balanceOfRama?.data?.value ? balanceOfRama?.data?.value.toString() : 0))) < Number(Number(buyInput) > 0 ? buyInput : 0)
                                                            )
                                                        ))
                                                            ? "1" : '0.3'
                                                    }}
                                                    onClick={async () => {
                                                        try {

                                                            await writeContractAsync({
                                                                abi: tsibStakingAbi,
                                                                address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
                                                                functionName: 'buy',
                                                                args: [
                                                                    BigInt(0)
                                                                ],
                                                                account: address,
                                                                value: parseEther(buyInput)
                                                            })

                                                        } catch (error) {
                                                            console.log(error);

                                                        }
                                                    }} >Buy TSIB
                                                    {
                                                        (isPendingBuyForWrite || isLoading) && <CircularProgress size={18} color="inherit" />
                                                    }
                                                </Button>
                                            )
                                    )
                                    :
                                    <ConnectWallet />
                                }

                                {
                                    (!selectedCardId && buyInput && (Number(buyInput) *
                                        Number(
                                            formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0)))
                                    ) < 20) &&
                                    <Box className={classes.validate__box} >
                                        <Typography component={'span'} fontWeight={200} color={'red'}>Minimum Buy $20</Typography>
                                    </Box>
                                }
                                {
                                    ( isAproveERC20 && selectedCardId && buyInput && (Number(buyInput)

                                    ) < 20) &&
                                    <Box className={classes.validate__box} >
                                        <Typography component={'span'} fontWeight={200} color={'red'}>Minimum Buy $20</Typography>
                                    </Box>
                                }
                                {
                                    (!selectedCardId &&
                                        Number(formatEther?.(BigInt?.(balanceOfRama?.data?.value ? balanceOfRama?.data?.value.toString() : 0))) < Number(Number(buyInput) > 0 ? buyInput : 0)
                                    ) && <Box className={classes.validate__box} >
                                        <Typography component={'span'} fontWeight={200} color={'red'}>Insufficient {selectedCardId ? "RUSD" : "RAMA"} Balance</Typography>
                                    </Box>
                                }{
                                    (isAproveERC20 && selectedCardId && Number(formatEther?.(BigInt?.(resultOfRusdBalance?.data ? resultOfRusdBalance?.data.toString() : 0))) < Number(Number(buyInput) > 0 ? buyInput : 0)
                                    ) &&
                                    <Box className={classes.validate__box} >
                                        <Typography component={'span'} fontWeight={200} color={'red'}>Insufficient {selectedCardId ? "RUSD" : "RAMA"} Balance</Typography>
                                    </Box>
                                }

                                {/* {
                                    !showInput && (
                                        <Box className={classes.apply} onClick={() => setShowInput(true)} >
                                            <Typography component={'span'} fontWeight={200} color={'#fff'}>Do you have any Referrer?</Typography>
                                        </Box>
                                    )
                                }
                                {/* {
                                    (resultOfReferralDetail?.data && resultOfReferralDetail?.data?.[3]?.result === zeroAddress) && (
                                        <Box>
                                            <Box className={classes.apply_btn__wrap}>
                                                <InputBase
                                                    value={referrerAddress}
                                                    onChange={(e) => setReferrerAddress(e.target.value as Address)}
                                                    sx={{
                                                        flex: 1,
                                                        color: '#fff',
                                                        width: '100%',
                                                        padding: '0.3rem 0.5rem',
                                                        ':-moz-placeholder': {
                                                            color: 'fff',
                                                        },
                                                        '@media(max-width : 600px)': {
                                                            fontSize: '11px',
                                                        }
                                                    }}
                                                    fullWidth
                                                    placeholder={'Enter Referrer Address'}
                                                    type={'text'}
                                                />
                                                <Button sx={{
                                                    '@media(max-width : 600px)':{
                                                            fontSize:'12px',
                                                            minWidth:'50px',
                                                            padding:'6px 6px'
                                                        }
                                                }} className={classes.max_btn} onClick={(e) => setReferrerAddress((resultOfReferralDetail?.data && resultOfReferralDetail?.data?.[3]?.result !== zeroAddress) ? resultOfReferralDetail?.data?.[3]?.result as Address : referrerAddress)} >Apply</Button>


                                            </Box>
                                            {
                                                (referrerAddress && !resultOfReferralDetail?.data?.[2].result) && (

                                                    <Box className={classes.validate__box} >
                                                        <Typography component={'span'} fontWeight={200} color={'red'}>Your Referrer is Invalid</Typography>
                                                    </Box>
                                                )}
                                            <Box className={classes.validate__box} >
                                            <Typography fontWeight={200} color={'#FBEF03'} textAlign={'center'} mt={1}>Note: If you have no any  valid referrer address then you can use this community referrer.</Typography>
                                            <Box sx={{ background: 'linear-gradient(90deg, #08080800, #FBEF03, #08080800)', gap: 1, justifyContent: 'center', padding: 1, display: 'flex', marginTop: '1rem', borderRadius: '8px', alignItems: 'center', }}>
                                                <Typography component={'h6'} fontWeight={700} color={'#000'}>Referrer:  </Typography>
                                                <AddressCopy hrefLink={`https://tosibba.com/?ref=0xBE4A7Ae76F7cceD70e0aec65aBd74DC84BB9D9C9`} text={"0xBE4A7Ae76F7cceD70e0aec65aBd74DC84BB9D9C9"} addresstext={"0xBE4...BB9D9C9"} />
                                            </Box>
                                            </Box>


                                        </Box>
                                    )} */}
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default Buy