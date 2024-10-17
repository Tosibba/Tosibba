'use client'
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import r2 from '../../icons/r2.svg'
import { makeStyles } from '@mui/styles';
import Image from "next/image";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import shortenString from "@/lib/shortenString";
import { useAccount, useBlockNumber, useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Address, formatEther, zeroAddress } from "viem";
import { tsibStakingAbi } from "@/configs/abi/tsibStaking";
import { formatTier, tsibContractAddresses } from "@/configs";
import { formatNumberToCurrencyString } from "@/lib/formatNumberToCurrencyString";
import HoverTool from "@/theme/components/hoverTool";
import AddressCopy from "@/theme/components/addressCopy";
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from "react";
import { extractDetailsFromError } from "@/lib/extractDetailsFromError";
import { toast } from "react-toastify";
import { convertFromSeconds } from "@/lib/convertFromSeconds";


const useStyles = makeStyles({
    tableContainer: {
        // maxHeight: 100,
        '&::-webkit-scrollbar': {
            width: '12px',
        },
        '&::-webkit-scrollbar-track': {
            background: '#101012',
            borderRadius: '0px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#595c61',
            borderRadius: '10px',
            border: '3px solid #101012',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        },
    },
    stakebtn: {
        backgroundColor: 'transparent',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #FBEF03 !important',
        color: '#FBEF03 !important',
        textDecoration: 'none',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: '#FBEF03 !important',
            color: '#000 !important'
        }
    },
    stakebtn__wrp: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'end'
    },
    noData: {
        height: '50px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        justifyItems: "center",
        backgroundColor: '#311250'
    }
});


const TableEarn = ({ resultOfTsibTokenPrice, resultOfUserStakerList, mintRatePerYear }: { resultOfTsibTokenPrice: any, resultOfUserStakerList: any, mintRatePerYear: Number }) => {
    const classes = useStyles();

    const { address } = useAccount()
    const chainId = useChainId()
    // const queryClient = useQueryClient()
    // const { data: blockNumber } = useBlockNumber({ watch: true })

    const Reward = ({ index }: { index: number }) => {
        const mintReward = useReadContract({
            abi: tsibStakingAbi,
            address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
            functionName: 'calculateRewards',
            args: [address as Address, BigInt(index)],
            account: zeroAddress
        })
        const { writeContractAsync, data, isPending: isPendingClaimForWrite, isSuccess: isSuccess1, isError: isError1 } = useWriteContract({
            mutation: {
                onSettled(data, error, variables, context) {
                    if (error) {
                        toast.error(extractDetailsFromError(error.message as string) as string)
                    } else {
                        toast.success("Reward Withdraw successfully")
                    }
                },
            }
        })
        const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
            hash: data,
        })
        // use to refetch
        // useEffect(() => {
        //     queryClient.invalidateQueries({ queryKey: mintReward.queryKey })
        // }, [blockNumber, queryClient])
        return (

            <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                <Typography color={'#fff'}>{Number(mintReward?.data) > 0 ? Number(formatEther?.(BigInt?.(mintReward?.data ? mintReward.data.toString() : 0))).toFixed(5) : '0.00000'} TSIB
                    <Button
                        disabled={
                            (isPendingClaimForWrite || isLoading)
                        }
                        className={classes.stakebtn}
                        sx={{
                            opacity: !(
                                isPendingClaimForWrite || isLoading
                            ) ? "1" : '0.3',
                            marginLeft: '7px'
                        }}
                        onClick={async () => {
                            await writeContractAsync({
                                abi: tsibStakingAbi,
                                address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
                                functionName: 'withdraw',
                                args: [BigInt(index)],
                                account: address
                            })
                        }}
                    >Withdraw
                        {
                            (isPendingClaimForWrite || isLoading) && <CircularProgress sx={{ ml: "7px" }} size={18} color="inherit" />
                        }
                    </Button>
                </Typography>
                <Typography color={'#999'}>${Number(mintReward?.data) > 0 ? (Number(formatEther?.(BigInt?.(mintReward?.data ? mintReward.data.toString() : 0))) * ((Number(
                    formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                )))).toFixed(5) : '0.00000'}</Typography>
            </TableCell>
        )
    }


    // const Action = ({ index }: { index: number }) => {
    //     const { writeContractAsync, data, isPending: isPendingUnstakeForWrite } = useWriteContract({
    //         mutation: {
    //             onSettled(data, error, variables, context) {
    //                 if (error) {
    //                     toast.error(extractDetailsFromError(error.message as string) as string)
    //                 } else {
    //                     toast.success("Unstake successfully")
    //                 }
    //             },
    //         }
    //     })
    //     const { isLoading } = useWaitForTransactionReceipt({
    //         hash: data,
    //     })
    //     return (
    //         <Box className={classes.stakebtn__wrp}>
    //             <Button
    //                 disabled={
    //                     (isPendingUnstakeForWrite || isLoading)
    //                 }
    //                 className={classes.stakebtn}
    //                 sx={{
    //                     opacity: !(
    //                         isPendingUnstakeForWrite || isLoading
    //                     ) ? "1" : '0.3',
    //                     marginLeft: '7px'
    //                 }}
    //                 onClick={async () => {
    //                     await writeContractAsync({
    //                         abi: tsibStakingAbi,
    //                         address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
    //                         functionName: 'unstake',
    //                         args: [BigInt(index)],
    //                         account: address
    //                     })
    //                 }}

    //             >Unstake
    //                 {
    //                     (isPendingUnstakeForWrite || isLoading) && <CircularProgress sx={{ ml: "7px" }} size={18} color="inherit" />
    //                 }
    //             </Button>
    //         </Box>
    //     )
    // }

    const Package = ({id}:{id:number}) => {
        const resultOfUserPackage = useReadContract({
            abi: tsibStakingAbi,
            address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
            functionName: 'getPackage',
            args: [BigInt(id)],
            account: zeroAddress
        })
        return (
            <>
                <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                    <Typography color={'#fff'}>{Number(resultOfUserPackage?.data?.dailyReturnInPercent)/100}%</Typography>
                    
                </TableCell>

                <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                    <Typography color={'#fff'}>{convertFromSeconds(Number(resultOfUserPackage?.data?.withdrawnPeriod))}</Typography>
                </TableCell>
            </>
        )
    }




    return (
        <Box>
            <TableContainer className={classes.tableContainer}>
                <Table sx={{ minWidth: 1500, backgroundColor: '#311250', border: '1px solid #595c61', borderRadius: '8px' }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#311250' }}>
                        <TableRow>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }}>User</TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">SA <HoverTool Title={"Stake Amount"} /></TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">DR<HoverTool Title={"Daily Rate"} /></TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">WP<HoverTool Title={"Windrawn Period"} /></TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">Reward</TableCell>
                            {/* <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">TRI365D <HoverTool Title={"Total Reward in 365 Days"} /></TableCell> */}
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">TCR <HoverTool Title={"Till Claimed Rewards"} /></TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">RR <HoverTool Title={"Remaining Rewards"} /></TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">ST <HoverTool Title={"Start Time"} /></TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">LC <HoverTool Title={"Last Claimed"} /></TableCell>
                            {/* <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="right">Action</TableCell> */}

                        </TableRow>
                    </TableHead>
                    <TableBody style={{ alignItems: 'center' }}>

                        {
                            resultOfUserStakerList?.length > 0 ? resultOfUserStakerList.map((item: any, index: number) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} component="th" scope="row">
                                        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <Image src={r2} alt={"lol"} width={50} />
                                            <AddressCopy
                                                textColor="#FBEF03 !important"
                                                hrefLink={
                                                    chainId === 1370 ? `https://ramascan.com/address/${address}` :
                                                        `https://pingaksha.ramascan.com/address/${address}`
                                                }
                                                text={address as string}
                                                addresstext={shortenString(address as Address)} />

                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                        <Typography color={'#fff'}>{convertToAbbreviated(formatEther?.(BigInt?.(item?.amount ? item.amount.toString() : 0)), 3)} TSIB</Typography>
                                        <Typography color={'#999'}>{formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(item?.amount ? item.amount.toString() : 0))) * (Number(
                                            formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                        )), 3)}</Typography>
                                    </TableCell>

                                    <Package id={item?.packageId as number} />

                                    <Reward index={index} />

                                    {/* <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                        <Typography color={'#fff'}>{convertToAbbreviated((Number(mintRatePerYear) * Number(formatEther?.(BigInt?.(item?.amount ? item.amount.toString() : 0))) / 100), 5)} TSIB</Typography>
                                        <Typography color={'#999'}>{formatNumberToCurrencyString((Number(mintRatePerYear) * Number(formatEther?.(BigInt?.(item?.amount ? item.amount.toString() : 0))) / 100) * (Number(
                                            formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                        )), 5)}</Typography>
                                    </TableCell> */}
                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                        <Typography color={'#fff'}>{convertToAbbreviated(formatEther?.(BigInt?.(item?.claimedRewards ? item.claimedRewards.toString() : 0)), 5)} TSIB</Typography>
                                        <Typography color={'#999'}>{formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(item?.claimedRewards ? item.claimedRewards.toString() : 0))) * (Number(
                                            formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                        )), 5)}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                        <Typography color={'#fff'}>{convertToAbbreviated(((Number(formatEther?.(BigInt?.(item?.amount ? item.amount.toString() : 0)))) - Number(formatEther?.(BigInt?.(item?.claimedRewards ? item.claimedRewards.toString() : 0)))), 3)} TSIB </Typography>
                                        <Typography color={'#999'}>{formatNumberToCurrencyString(((Number(formatEther?.(BigInt?.(item?.amount ? item.amount.toString() : 0)))) - Number(formatEther?.(BigInt?.(item?.claimedRewards ? item.claimedRewards.toString() : 0)))) * (Number(
                                            formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                        )), 5)}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                        <Typography color={'#fff'}>{new Date(Number(item?.startTime) * 1000).toLocaleString()}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                        <Typography color={'#fff'}>{new Date(Number(item?.lastClaimTime) * 1000).toLocaleString()}</Typography>
                                    </TableCell>

                                    {/* <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="right">
                                        <Action index={index} />
                                    </TableCell> */}
                                </TableRow>
                            ))

                                : (
                                    <Box ml={30} className={classes.noData}>
                                        <Typography color={'#fff'} margin={'auto'}>No Data Found!</Typography>
                                    </Box>
                                )
                        }



                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default TableEarn;

