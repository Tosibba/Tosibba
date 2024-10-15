'use client'
import { Box, Grid, InputBase, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';
import Image from "next/image";
import Heading from "@/theme/components/heading";
import TableEarn from "./tableEarn";
import { useAccount, useBalance, useBlockNumber, useChainId, useReadContract } from "wagmi";
import { Address, formatEther, zeroAddress } from "viem";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import { tsibTokenAbi } from "@/configs/abi/tsibTokenAbi";
import { formatTier, tsibContractAddresses } from "@/configs";
import { tsibStakingAbi } from "@/configs/abi/tsibStaking";
import { formatNumberToCurrencyString } from "@/lib/formatNumberToCurrencyString";
import { tsibReferralAbi } from "@/configs/abi/tsibReferral";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { rusdAbi } from "@/configs/abi/rusd";

const useStyles = makeStyles({
    mainDiv: {
        margin: '10px',
        

    },
    box_hding: {

        backgroundColor: '#311250',
        border: '1px solid #595c61',
        display: 'flex',
        justifyContent: 'center',
        height: '480px',
        alignItems: 'center',
        borderRadius: '12px'
    },
    Card: {
        backgroundColor: '#311250',
        border: '1px solid #595c61',
        padding: '10px',
        borderRadius: '8px',
        textAlign: 'center',
        height:'100%'
    },
    cardlist: {
        padding: '10px',
    },
    boxCr: {
        border: '1px solid #595c61',
        borderRadius: '4px',
        marginTop: '1.5rem'
    }



});


interface props {
    Earning: string;
}


const Earning = ({ Earning }: props) => {
    const classes = useStyles();
    const { address } = useAccount()
    const chainId = useChainId()
    const queryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({ watch: true })

    const resultOfBalance = useReadContract({
        abi: rusdAbi,
        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_token : tsibContractAddresses.pingaksha.tsib_token,
        functionName: 'balanceOf',
        args: [address as Address],
        account: address
    })


    const resultOfTsibTokenPrice = useReadContract({
        abi: tsibStakingAbi,
        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
        functionName: 'getTokenPrice',
        args: [],
        account: zeroAddress
    })

    const resultOfUserStaker = useReadContract({
        abi: tsibStakingAbi,
        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
        functionName: 'user2Staker',
        args: [address as Address],
        account: zeroAddress
    })

    const resultOfUserStakerLength = useReadContract({
        abi: tsibStakingAbi,
        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
        functionName: 'totalStakedLengthForUser',
        args: [address as Address],
        account: zeroAddress
    })


    const resultOfUserStakerList = useReadContract({
        abi: tsibStakingAbi,
        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
        functionName: 'user2StakerList',
        args: [address as Address, BigInt(0), Number(resultOfUserStakerLength?.data) > 0 ? resultOfUserStakerLength.data as bigint : BigInt(0)],
        account: zeroAddress
    })





    // const totalUnclaimedRewards= resultOfUserStakerList?.data?.reduce((previousValue,currentValue)=> previousValue+  )

    const Card = [
        {
            id: 1,
            Title: 'Wallet Balance',
            Amount: `${convertToAbbreviated(formatEther?.(BigInt?.(resultOfBalance?.data ? resultOfBalance.data.toString() : 0)), 3)} TSIB`,
            data: `${formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(resultOfBalance?.data ? resultOfBalance.data.toString() : 0))) * (Number(
                formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
        )), 3)}`
        },
        {
            id: 2,
            Title: 'Your Stake',
            Amount: `${convertToAbbreviated(formatEther?.(BigInt?.(resultOfUserStaker?.data ? resultOfUserStaker.data.amount.toString() : 0)), 3)} TSIB`,
            data: `${formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(resultOfUserStaker?.data ? resultOfUserStaker.data.amount.toString() : 0))) * (Number(
                formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
        )), 3)}`
        },
        {
            id: 3,
            Title: 'Claimed Income',
            Amount: `${convertToAbbreviated(formatEther?.(BigInt?.(resultOfUserStaker?.data ? resultOfUserStaker.data.claimedRewards.toString() : 0)), 5)} TSIB`,
            data: `${formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(resultOfUserStaker?.data ? resultOfUserStaker.data.claimedRewards.toString() : 0))) * (Number(
                formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
        )), 5)}`
        },
        {
            id: 4,
            Title: 'Unclaimed Income',
            Amount: `${
                "0.00000 TSIB"
            
            }`,
            data: '$0.00000'
        },
        // {
        //     id: 5,
        //     Title: 'Current Tier',
        //     Amount: `${formatTier(Number(resultOfUserTierAndBoostRateInPercent?.data?.[0]))}`,
        //     data: ``
        // },
        // {
        //     id: 7,
        //     Title: 'Per Hour Base Speed(%)',
        //     Amount: `${mintRatePerDay?(mintRatePerDay/24).toFixed(2):0.00}`,
        //     data: ``
        // },
        // {
        //     id: 8,
        //     Title: 'Per Day Base Speed(%)',
        //     Amount: `${mintRatePerDay??0.00}`,
        //     data: ''
        // },
    ]

    // use to refetch
useEffect(() => {
    queryClient.invalidateQueries({ queryKey:resultOfUserStakerList.queryKey }) 
}, [blockNumber, queryClient,resultOfUserStakerList])
    return (
        <>

            <Box className={classes.mainDiv}>

                <Typography
                    sx={{
                        fontFamily: 'Coolvetica Rg!important',
                        color: '#FBEF03',
                        '@media(max-width : 1200px)': {
                            fontSize: '22px',
                            '@media(max-width : 900px)': {
                                fontSize: '20px'
                            }
                        }

                    }}
                    variant="h4">{Earning} Income</Typography>

                <Box className={classes.boxCr}>
                    <Box className={classes.cardlist}>
                        <Grid container spacing={2} justifyContent={"center"}>
                            {Card.map((item, index) => (
                                <Grid key={index} item lg={3} md={3} sm={6} xs={12}>
                                    <Box className={classes.Card}>
                                        <Typography color={'#fff'}>{item.Title}</Typography>
                                        <Typography color={'#fff'} variant="h6">{item.Amount}</Typography>
                                        <Typography color={'#999'}>{item.data}</Typography>
                                    </Box>
                                </Grid>
                            ))}

                        </Grid>
                    </Box>

                </Box>
                
                 <Box className={classes.boxCr} sx={{ marginTop: '1rem' }}>
                    <TableEarn resultOfTsibTokenPrice={resultOfTsibTokenPrice} resultOfUserStakerList={resultOfUserStakerList?.data} mintRatePerYear={0.00000} />
                </Box>
                
            </Box>

        </>
    )
}

export default Earning