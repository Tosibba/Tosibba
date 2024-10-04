import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import r2 from '../../icons/r2.svg'
import { makeStyles } from '@mui/styles';
import Image from "next/image";
import Link from "next/link";
import { convertToNumber } from "@/lib/convertToNumber";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import shortenString from "@/lib/shortenString";
import { useAccount, useChainId,useBlockNumber, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Address, formatEther, zeroAddress } from "viem";
import { efInvestAbi } from "@/configs/abi/efInvest";
import { formatTier, efContractAddresses } from "@/configs";
import { formatNumberToCurrencyString } from "@/lib/formatNumberToCurrencyString";
import HoverTool from "@/theme/components/hoverTool";
import AddressCopy from "@/theme/components/addressCopy";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { extractDetailsFromError } from "@/lib/extractDetailsFromError";

const useStyles = makeStyles({
    tableContainer: {
        // maxHeight: 100, 
        '&::-webkit-scrollbar': {
            width: '12px',
        },
        '&::-webkit-scrollbar-track': {
            background: '#311250',
            borderRadius: '0px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#595c61',
            borderRadius: '10px',
            border: '3px solid #311250',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        },
    },
    claimbtn: {
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
    claimbtn__wrp: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'end',
        margin:"7px"
    },
    noData: {
        height: '50px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#311250'
    }
});
const mapLevel2RewardPercent={
    "1": "10",
    "2": "2",
    "3": "2",
    "4": "2",
    "5": "0.5",
    "6": "0.5",
    "7": "0.5",
    "8": "0.3",
    "9": "0.3",
    "10": "0.3",
    "11": "0.2",
    "12": "0.2",
    "13": "0.2",
    "14": "1",
    "15": "5",
} as any

const TableBounty = ({resultOfUserBountyReward}:{resultOfUserBountyReward:any}) => {
    const classes = useStyles();

    const { address } = useAccount()
    const chainId = useChainId()

    const queryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({ watch: true })

    // const TableList = [
    //     {
    //         id: 1,
    //         Userprofile: ef,
    //         ProfileAddress: "0xcc5...be31",
    //         stakeAmount: 8000,
    //         stakeDate: '0.00',
    //         reward: '100',
    //         rewardData: '0.00',
    //         startTime: 'Jun 12 2024 23:11:38 PM',
    //         lastClaim: 'Jun 12 2024 23:11:38 PM',
    //         tier: 'Starter',
    //         tri365d:'1000',
    //         tcr:'100',
    //         rr:'10'
    //     },
    //     {
    //         id: 2,
    //         Userprofile: ef,
    //         ProfileAddress: "0xcc5...be31",
    //         stakeAmount: 8000,
    //         stakeDate: '0.00',
    //         reward: '100',
    //         rewardData: '0.00',
    //         startTime: 'Jun 12 2024 23:11:38 PM',
    //         lastClaim: 'Jun 12 2024 23:11:38 PM',
    //         tier: 'Silver',
    //         tri365d:'1000',
    //         tcr:'100',
    //         rr:'10'
    //     },
    //     {
    //         id: 3,
    //         Userprofile: ef,
    //         ProfileAddress: "0xcc5...be31",
    //         stakeAmount: 8000,
    //         stakeDate: '0.00',
    //         reward: '100',
    //         rewardData: '0.00',
    //         startTime: 'Jun 12 2024 23:11:38 PM',
    //         lastClaim: 'Jun 12 2024 23:11:38 PM',
    //         tier: 'Gold',
    //         tri365d:'1000',
    //         tcr:'100',
    //         rr:'10'
    //     },
    //     {
    //         id: 4,
    //         Userprofile: ef,
    //         ProfileAddress: "0xcc5...be31",
    //         stakeAmount: 8000,
    //         stakeDate: '0.00',
    //         reward: '100',
    //         rewardData: '0.00',
    //         startTime: 'Jun 12 2024 23:11:38 PM',
    //         lastClaim: 'Jun 12 2024 23:11:38 PM',
    //         tier: 'Platinum',
    //         tri365d:'1000',
    //         tcr:'100',
    //         rr:'10'
    //     },
    //     {
    //         id: 5,
    //         Userprofile: ef,
    //         ProfileAddress: "0xcc5...be31",
    //         stakeAmount: 8000,
    //         stakeDate: '0.00',
    //         reward: '100',
    //         rewardData: '0.00',
    //         startTime: 'Jun 12 2024 23:11:38 PM',
    //         lastClaim: 'Jun 12 2024 23:11:38 PM',
    //         tier: 'Daimond',
    //         tri365d:'1000',
    //         tcr:'100',
    //         rr:'10'
    //     },
    //     {
    //         id: 6,
    //         Userprofile: ef,
    //         ProfileAddress: "0xcc5...be31",
    //         stakeAmount: 8000,
    //         stakeDate: '0.00',
    //         reward: '100',
    //         rewardData: '0.00',
    //         startTime: 'Jun 12 2024 23:11:38 PM',
    //         lastClaim: 'Jun 12 2024 23:11:38 PM',
    //         tier: 'Elite',
    //         tri365d:'1000',
    //         tcr:'100',
    //         rr:'10'
    //     },

    // ];

    const resultOfUserBountyRewardLength = useReadContract({
        abi: efInvestAbi,
        address: chainId === 1370 ? efContractAddresses.ramestta.ef_invest : efContractAddresses.pingaksha.ef_invest,
        functionName: 'totalBountyRewardLengthForUser',
        args: [address as Address],
        account: zeroAddress
    })


    const resultOfUserBountyRewardList = useReadContract({
        abi: efInvestAbi,
        address: chainId === 1370 ? efContractAddresses.ramestta.ef_invest : efContractAddresses.pingaksha.ef_invest,
        functionName: 'user2BountyRewardInfoList',
        args: [address as Address, BigInt(0), Number(resultOfUserBountyRewardLength?.data) > 0 ? resultOfUserBountyRewardLength.data as bigint : BigInt(0)],
        account: zeroAddress
    })

    const { writeContractAsync,data,isPending:isPendingClaimForWrite } = useWriteContract({
        mutation:{
            onSettled(data, error, variables, context) {
                if(error){
                    toast.error(extractDetailsFromError(error.message as string) as string)
                }else{
                    toast.success("Bounty Reward claimed successfully")
                }
            },
         }
    })
    const {isLoading,isSuccess} = useWaitForTransactionReceipt({
        hash: data,
      }) 
    
    // use to refetch
    useEffect(() => {
            queryClient.invalidateQueries({ queryKey:resultOfUserBountyReward.queryKey }) 
            queryClient.invalidateQueries({ queryKey:resultOfUserBountyRewardLength.queryKey }) 
            queryClient.invalidateQueries({ queryKey:resultOfUserBountyRewardList.queryKey }) 
        }, [blockNumber, queryClient,resultOfUserBountyReward,resultOfUserBountyRewardLength,resultOfUserBountyRewardList])

    return (
        <Box>
            <TableContainer className={classes.tableContainer}>
            <Box className={classes.claimbtn__wrp}>
            <Button
                disabled={
                    (Number(resultOfUserBountyReward?.data?.amount)===0 || isPendingClaimForWrite || isLoading) ? true : false
                }
                className={classes.claimbtn}
                sx={{
                    opacity: !(
                        Number(resultOfUserBountyReward?.data?.amount)===0 || isPendingClaimForWrite || isLoading
                    ) ? "1" : '0.3'
                }}
                onClick={async () => {
                    await writeContractAsync({
                        abi: efInvestAbi,
                        address: chainId === 1370 ? efContractAddresses.ramestta.ef_invest : efContractAddresses.pingaksha.ef_invest,
                        functionName: 'claimBountyRewards',
                        account: address
                    })
                }}
            >Claim All Rewards</Button>
        </Box>
                <Table sx={{ minWidth: 750, backgroundColor: '#311250', border: '1px solid #595c61', borderRadius: '8px' }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#311250' }}>
                        <TableRow>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }}>From</TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">Level</TableCell>
                            {/* <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">Bonus</TableCell> */}
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">FLS <HoverTool Title={"From Level Side"}/></TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="left">FCT <HoverTool Title={"From Claimed Time"}/></TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 16, color: '#fff' }} align="right">Reward</TableCell>
 
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {
                        (resultOfUserBountyRewardList?.data && resultOfUserBountyRewardList?.data.length>0) ? (resultOfUserBountyRewardList.data.map((item:any,index:number)=>(
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} component="th" scope="row">
                                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Image src={r2} alt={"lol"} width={50} />
                                        <AddressCopy 
                                             textColor="#FBEF03 !important" 
                                             hrefLink={
                                                chainId===1370?`https://ramascan.com/address/${item.from}`:
                                                `https://pingaksha.ramascan.com/address/${item.from}`
                                             } 
                                             text={item.from as string} 
                                             addresstext={shortenString(item.from as Address)}/>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                    <Typography color={'#fff'}>{item.level.toString()}</Typography>

                                </TableCell>
                                {/* <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                    <Typography color={'#fff'}>{mapLevel2RewardPercent[item.level.toString()]}%</Typography>

                                </TableCell> */}
                                <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                <Typography color={'#fff'}>{item.isFromUpLevel===true?"Upline":"Downline"}</Typography>
                                {/* <Typography color={'#999'}>{formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(item?.fromClaimedReward ? item.fromClaimedReward.toString() : 0))) * 0.05)}</Typography> */}
                                </TableCell>
                             
                                 
                                <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                <Typography color={'#fff'}>{new Date(Number(item?.fromClaimedTime) * 1000).toLocaleString()}</Typography>
                                </TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="right">
                                <Typography color={'#fff'}>${convertToAbbreviated(formatEther?.(BigInt?.(item?.amount ? item.amount.toString() : 0)),4)} </Typography>
                                {/* <Typography color={'#999'}>{formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(item?.amount ? item.amount.toString() : 0))) * 0.05)}</Typography> */}
                                </TableCell>
                                
                               
                               
                            </TableRow>
                        )))
                        :(
                            <Box ml={30} className={classes.noData}>
                            <Typography color={'#fff'} margin={'auto'}>No Data Found!</Typography>
                        </Box>
                        )}
                            
                        

                    </TableBody>
                </Table>


            </TableContainer>
        </Box>
    );
}

export default TableBounty;
