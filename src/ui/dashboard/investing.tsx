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
import { rusdAbi } from "@/configs/abi/rusd";
import { tsibContractAddresses } from "@/configs";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";

import { tsibReferralAbi } from "@/configs/abi/tsibReferral";
import { formatNumberToCurrencyString } from "@/lib/formatNumberToCurrencyString";
import ContributorsTable from "./contributorsTable";
// import { tsibIcoAbi } from "@/configs/abi/tsibIco";
import ConnectWallet from "../shared/connectWallet";
import { tsibStakingAbi } from "@/configs/abi/tsibStaking";
import shortenString from "@/lib/shortenString";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from '@tanstack/react-query'
import { extractDetailsFromError } from "@/lib/extractDetailsFromError";
import { toast } from "react-toastify";
import useCheckAllowance from "@/hooks/useCheckAllowance";
import SelectDrop from "@/theme/components/selectDrop";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import HoverTool from "@/theme/components/hoverTool";

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
        padding: '1rem 0.5rem',
        borderRadius: '12px',
        textAlign: 'center',
         
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
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
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
        gap: '10px'
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


 

const Investing = ({ resultOfTsibBalance, resultOfCheckAllowance }: any) => {
    const classes = useStyles();
    const searchParams = useSearchParams()

    const [selectedCardId, setSelectedCardId] = useState<number>(0); // Track selected card
    const [selectJoin,setReferralJoin] =useState<string>('')
    

    const handleCardClick = (id:number) => {
        setSelectedCardId(id); // Update the selected card
    };
    const [buyInput, setBuyInput] = useState("")
    const [isAproveERC20, setIsApprovedERC20] = useState(true);
    const refParam = searchParams.get('ref')
    const [referrerAddress, setReferrerAddress] = useState<string | null>(refParam)
    const { address } = useAccount()
    const chainId = useChainId()
    const queryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({ watch: true })


    const { writeContractAsync: approveWriteContractAsync, data: approveData, isPending: isPendingApproveForWrite } = useWriteContract(
        {
            mutation: {
                onSettled(data, error, variables, context) {
                    if (error) {
                        toast.error(extractDetailsFromError(error.message as string) as string)
                    } else {
                        setIsApprovedERC20(true)
                        setBuyInput('')
                        setReferrerAddress(null)
                        toast.success("Your TSIB Approved successfully")
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
                        toast.success("Your TSIB Staking successfully")
                    }
                },
            }
        }
    )
    const { isLoading } = useWaitForTransactionReceipt({
        hash: data,
    })

    // const resultOfTsibBalance = useReadContract({
    //     abi: tsibTokenAbi,
    //     address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_token : tsibContractAddresses.pingaksha.tsib_token,
    //     functionName: 'balanceOf',
    //     args: [address as Address],
    //     account: address
    // })


    const handleMax = () => {
        setBuyInput((formatEther?.(BigInt?.(resultOfTsibBalance?.data ? resultOfTsibBalance?.data?.toString() : 0))))
    }

    // const resultOftsibTokenPrice = useReadContract({
    //     abi: tsibStakingAbi,
    //     address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
    //     functionName: 'getTokenPrice',
    //     args: [],
    //     account: zeroAddress
    // })

    const resultOfReferralDetail = useReadContracts({
        contracts: [
            {
                abi: tsibReferralAbi,
                address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_referral : tsibContractAddresses.pingaksha.tsib_referral,
                functionName: 'getReferralInfo',
                args: [address as Address]
            },
            {
                abi: tsibReferralAbi,
                address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_referral : tsibContractAddresses.pingaksha.tsib_referral,
                functionName: 'getReferralsCount',
                args: [address as Address]
            },
            {
                abi: tsibReferralAbi,
                address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_referral : tsibContractAddresses.pingaksha.tsib_referral,
                functionName: 'isValidReferrer',
                args: [address as Address, referrerAddress as Address]
            },
            {
                abi: tsibReferralAbi,
                address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_referral : tsibContractAddresses.pingaksha.tsib_referral,
                functionName: 'getReferrer',
                args: [address as Address]
            },
        ]
    })




    // const {data:checkAllowance,queryKey:queryKeyAllowance}=useCheckAllowance({
    //     spenderAddress: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking
    //   })

    // console.log({resultOfCheckAllowance});

    useEffect(() => {
        if (resultOfCheckAllowance && address) {
            const price = parseFloat(buyInput === "" ? "10000" : buyInput)
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
        // queryClient.invalidateQueries({ queryKey: resultOfTsibBalance.queryKey })
        // queryClient.invalidateQueries({ queryKey: resultOftsibTokenPrice.queryKey })
        // queryClient.invalidateQueries({ queryKey: resultOfReferralDetail.queryKey })
    }, [blockNumber, queryClient, resultOfCheckAllowance])

    const initialLocationsData2 = [
        {
            id: 0,
            name: 'Left',
        },
        {
            id: 1,
            name: 'Right',
        },
    ];


    const Box__list = [

        {
            id: 0,
            title: '0.33% Daily',
            data: `Withdraw period 20 months`,
            package: 'A'

        },
        {
            id: 1,
            title: '0.44% Daily',
            data: `Withdraw period 15 months`,
            package: 'B'
        },
        {
            id: 2,
            title: '0.55% Daily',
            data: `Withdraw period 12 months`,
            package: 'C'
        },


    ]
    

    return (
        <>
            <Box  >
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box className={classes.step__three}>
                            <Box className={classes.coin_hding}>
                                <Typography variant="h5" color={'#fff'}>Stake Coins</Typography>
                            </Box>
                            <Box className={classes.middleBox}>

                                {/* <Box textAlign={'center'} mt={3}>
                                    <Typography>  <Typography component={'span'} color={'#fff'}>Private Sale</Typography></Typography>
                                </Box> */}


                                <Box className={classes.currentsale2} mt={2}>
                                    <Typography fontWeight={500} color={'#fff'}>TSIB Price : $0.00</Typography>
                                    {/* <Typography fontWeight={500} color={'#fff'}>TSIB Price : ${
                                        Number(
                                            formatEther?.(BigInt?.(resultOftsibTokenPrice?.data ? resultOftsibTokenPrice?.data?.toString() : 0))
                                    ).toFixed(2)
                                    }</Typography> */}
                                    {/* <Typography fontWeight={500} color={'#fff'}>Pre-Sale: $0.1</Typography> */}
                                </Box>

                                <Box className={classes.rama__log}>
                                    <Image src={rmesta} alt={""} />
                                    <Typography variant="h5" fontWeight={500} color={'#fff'}>TSIB</Typography>
                                </Box>

                                <Box className={classes.step__two}>
                                    <Grid container spacing={2}>
                                        {Box__list.map((item, index) => (
                                            <Grid key={index} item lg={4} md={4} sm={12} xs={12}>
                                                <Box 
                                                 
                                                  sx={{ textAlign: 'center',
                                                   
                                                   

                                                   }}>
                                                    <Typography mb={1} color={'#fff'}>package {item.package}</Typography>
                                                </Box>
                                                <Box className={classes.list___bx}
                                                onClick={() => handleCardClick(item.id)}
                                                sx={{
                                                    border: selectedCardId === item.id ? '1px solid #FBEF03' : '1px solid #595c61', // Border change on selection
                                                    cursor: 'pointer',
                                                }}>

                                                    <Typography fontSize={14} color={'#fff'}>{item.title}</Typography>
                                                    <Typography fontSize={14} color={'#fff'} fontWeight={600} variant="h6">{item.data}</Typography>
                                                    <Typography fontSize={14} color={'#fff'}>Total 200%</Typography>

                                                </Box>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Box>

                              


                                <Box mt={2} />

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
                                            '& input[type=number]': {
                                                '-moz-appearance': 'textfield',
                                            },
                                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                '-webkit-appearance': 'none',
                                                margin: 0,
                                            },
                                        }}
                                        fullWidth
                                        placeholder={'Enter Amount in TSHB'}
                                        type={'number'}
                                    />

                                    <Button className={classes.max_btn} onClick={handleMax} href={""} >Max</Button>
                                </Box>
                                {/* <Box sx={{
                                display:'flex',
                                justifyContent:'space-between',
                                gap:'1rem',
                                marginBottom:'1rem'
                               }}>
                              <Box sx={{
                                flex:'45%'
                              }}>
                              <SelectDrop locationsData={initialLocationsData2} defaultId={1}/>
                              </Box>
                              <Box sx={{
                                flex:'45%'
                              }}>
                              <SelectDrop locationsData={initialLocationsData2} defaultId={2}/>
                              </Box>
                               </Box> */}

                                {/* <Box className={classes.worth}>
                                    {(resultOfRamaPriceInUSD?.data && buyInput) &&
                                        <>
                                           <Box className={classes.box_List}>
                                           <Image src={dollar} alt={""} width={40} />
                                            <Typography color={'#999'}>COST:
                                                <Typography component={'span'} color={'#fff'}> ${
                                                    ((Number(Number(buyInput) > 0 ? buyInput : 0) *
                                                        Number(
                                                            formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0)))
                                                    )
                                                    ).toFixed(2)

                                                }
                                                </Typography>
                                            </Typography>
                                           </Box>

                                            <Box className={classes.box_List}>
                                            <Image src={rmesta} alt={""} width={40} />
                                            <Typography color={'#999'}>RUSD PRICE:
                                                <Typography component={'span'} color={'#fff'}> ${
                                                    Number(
                                                        formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0)))
                                                }
                                                </Typography>
                                            </Typography>
                                            </Box>
                                        </>
                                    }
                                    <Box className={classes.box_List}>
                                    <Image src={shield} alt={""} width={50} />
                                    <Typography color={'#999'}>EF WORTH : <Typography component={'span'} color={'#fff'}>{
                                        buyInput && resultOfRamaPriceInUSD?.data && resultOfSaleDetails?.data ? ((Number(Number(buyInput) > 0 ? buyInput : 0) *
                                            Number(
                                                formatEther?.(BigInt?.(resultOfRamaPriceInUSD?.data ? resultOfRamaPriceInUSD.data.toString() : 0)))
                                        ) /
                                            Number(
                                                formatEther?.(BigInt?.(resultOfSaleDetails?.data?.saleRateInUsd ? resultOfSaleDetails?.data?.saleRateInUsd.toString() : 0)))
                                        ).toFixed(2) : "0.00"
                                    }</Typography></Typography>
                                    </Box>
                                </Box> */}

                                {address ?
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
                                                            address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_token : tsibContractAddresses.pingaksha.tsib_token,
                                                            functionName: 'approve',
                                                            args: [
                                                                chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking
                                                                ,
                                                                Number?.(buyInput) > 0 ? parseEther?.(buyInput) : parseEther?.(BigInt((Number.MAX_SAFE_INTEGER ** 1.3)?.toString())?.toString())
                                                            ],
                                                            account: address
                                                        })


                                                    }} >Approve TSIB
                                                    {
                                                        (isPendingApproveForWrite || isLoadingApprove) && <CircularProgress size={18} color="inherit" />
                                                    }
                                                </Button>
                                            )
                                            : (
                                                <Button

                                                    disabled={

                                                        (!buyInput || isPendingBuyForWrite || isLoading || (
                                                            buyInput && (Number(buyInput) < 10000)
                                                        ) || (
                                                                Number(formatEther?.(BigInt?.(resultOfTsibBalance?.data ? resultOfTsibBalance?.data?.toString() : 0))) < Number(Number(buyInput) > 0 ? buyInput : 0)
                                                            ) || (
                                                                !referrerAddress || !resultOfReferralDetail?.data?.[2].result
                                                            ) && resultOfReferralDetail?.data?.[3]?.result === zeroAddress || (
                                                                selectJoin===''
                                                            )
                                                        )
                                                    }
                                                    fullWidth={true}
                                                    className={classes.buy__btn}
                                                    sx={{
                                                        opacity: !((
                                                            !buyInput || isPendingBuyForWrite || isLoading || (
                                                                buyInput && (Number(buyInput) < 10000)
                                                            ) || (
                                                                Number(formatEther?.(BigInt?.(resultOfTsibBalance?.data ? resultOfTsibBalance?.data?.toString() : 0))) < Number(Number(buyInput) > 0 ? buyInput : 0)
                                                            ) || (
                                                                !referrerAddress || !resultOfReferralDetail?.data?.[2].result
                                                            ) && resultOfReferralDetail?.data?.[3]?.result === zeroAddress || (
                                                                selectJoin===''
                                                            )
                                                        ))
                                                            ? "1" : '0.3'
                                                    }}
                                                    onClick={async () => { 
                                                        try {

                                                            await writeContractAsync({
                                                                abi: tsibStakingAbi,
                                                                address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
                                                                functionName: 'stake',
                                                                args: [
                                                                    parseEther(buyInput),
                                                                    BigInt(selectedCardId), 
                                                                    (resultOfReferralDetail?.data?.[3]?.result !== zeroAddress ? resultOfReferralDetail?.data?.[3]?.result as Address : referrerAddress as Address),
                                                                    selectJoin==='right'?true:false
                                                                ],
                                                                account: address
                                                            })
                                                            
                                                        } catch (error) {
                                                            console.log(error);
                                                            
                                                        }
                                                    }} >Stake
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
                                    (buyInput && isAproveERC20 && (Number(buyInput) < 10000)) &&
                                    <Box className={classes.validate__box} >
                                        <Typography component={'span'} fontWeight={200} color={'red'}>Minimum Contribution 10000 TSIB</Typography>
                                    </Box>
                                }
                                {
                                    isAproveERC20 && Number(formatEther?.(BigInt?.(resultOfTsibBalance?.data ? resultOfTsibBalance?.data.toString() : 0))) < Number(Number(buyInput) > 0 ? buyInput : 0) &&
                                    <Box className={classes.validate__box} >
                                        <Typography component={'span'} fontWeight={200} color={'red'}>Insufficient TSIB Balance</Typography>
                                    </Box>
                                }

                                {/* {
                                    !showInput && (
                                        <Box className={classes.apply} onClick={() => setShowInput(true)} >
                                            <Typography component={'span'} fontWeight={200} color={'#fff'}>Do you have any Referrer?</Typography>
                                        </Box>
                                    )
                                } */}
                                {
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
                                                {/* <Button sx={{
                                                    '@media(max-width : 600px)':{
                                                            fontSize:'12px',
                                                            minWidth:'50px',
                                                            padding:'6px 6px'
                                                        }
                                                }} className={classes.max_btn} onClick={(e) => setReferrerAddress((resultOfReferralDetail?.data && resultOfReferralDetail?.data?.[3]?.result !== zeroAddress) ? resultOfReferralDetail?.data?.[3]?.result as Address : referrerAddress)} >Apply</Button> */}


                                            </Box>
                                            {(referrerAddress && resultOfReferralDetail?.data?.[2].result) &&
                                              <Box sx={{
                                                display: 'flex',
                                                gap:'10px',
                                                alignItems: 'center',
                                                marginTop: '1rem',
                                                '@media(max-width : 600px)':{
                                                    alignItems: 'baseline',
                                                }
                                            }}>
                                                <HoverTool Title={"You can Join left side of referral or right side of referral"} />
                                                <FormControl >
            
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                        onChange={(e)=>setReferralJoin(e.target.value)}
                                                        value={selectJoin}
                                                    >
                                                        <FormControlLabel value="left" control={<Radio sx={{
                                                            color: '#FBEF03',
            
                                                            '&.Mui-checked': {
                                                                color: '#FBEF03',
                                                            },
                                                        }} />} label="Left Joining" sx={{
                                                            '& .MuiFormControlLabel-label': {
                                                                color: '#fff',
                                                            },
                                                        }} />
                                                        <FormControlLabel value="right" control={<Radio
                                                            sx={{
                                                                color: '#FBEF03',
                                                                '&.Mui-checked': {
                                                                    color: '#FBEF03',
                                                                },
                                                            }} />} label="Right Joining" sx={{
                                                                '& .MuiFormControlLabel-label': {
                                                                    color: '#fff',
                                                                },
                                                            }} />
            
            
                                                    </RadioGroup>
                                                </FormControl>
            
                                                
                                            </Box>}
                                            {
                                                (referrerAddress && !resultOfReferralDetail?.data?.[2].result) && (

                                                    <Box className={classes.validate__box} >
                                                        <Typography component={'span'} fontWeight={200} color={'red'}>Your Referrer is Invalid</Typography>
                                                    </Box>
                                                )}
                                            {/* <Box className={classes.validate__box} > */}
                                            <Typography fontWeight={200} color={'#FBEF03'} textAlign={'center'} mt={1}>Note: If you have no any  valid referrer address then you can use this community referrer.</Typography>
                                            <Box sx={{ background: 'linear-gradient(90deg, #08080800, #FBEF03, #08080800)', gap: 1, justifyContent: 'center', padding: 1, display: 'flex', marginTop: '1rem', borderRadius: '8px', alignItems: 'center', }}>
                                                <Typography component={'h6'} fontWeight={700} color={'#000'}>Referrer:  </Typography>
                                                <AddressCopy hrefLink={`https://tosibba.com/?ref=0x32eBca47C2E301e74e8E4bb778F4cDbCBA6eD657`} text={"0x32eBca47C2E301e74e8E4bb778F4cDbCBA6eD657"} addresstext={"0x32e...6eD657"} />
                                            </Box>
                                            {/* </Box> */}


                                        </Box>
                                    )}
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default Investing