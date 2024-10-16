// import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
// import t1 from '../../icons/r2.svg'
// import { makeStyles } from '@mui/styles';
// import Image from "next/image";
// import { tsibIcoAbi } from "@/configs/abi/tsibIco";
// import { tsibContractAddresses } from "@/configs";
// import { Address, formatEther, zeroAddress } from "viem";
// import { useAccount, useBlockNumber, useChainId, useReadContract } from "wagmi";
// import shortenString from "@/lib/shortenString";
// import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
// import { formatNumberToCurrencyString } from "@/lib/formatNumberToCurrencyString";
// import AddressCopy from "@/theme/components/addressCopy";
// import { useQueryClient } from "@tanstack/react-query";
// import { useEffect } from "react";


// const useStyles = makeStyles({
//     tableContainer: {
//         // maxHeight: 100, 
//         '&::-webkit-scrollbar': {
//             width: '12px',
//         },
//         '&::-webkit-scrollbar-track': {
//             background: '#311250',
//             borderRadius: '0px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//             backgroundColor: '#595c61',
//             borderRadius: '10px',
//             border: '3px solid #311250',
//         },
//         '&::-webkit-scrollbar-thumb:hover': {
//             backgroundColor: '#555',
//         },
//     },
//     noData: {
//         height: '50px',
//         borderBottom:'none',
//         width: '100%',
//         justifyContent: 'center',
//         justifyItems: "center",
//         backgroundColor: '#1e2329',
         
//     }

// });


// const ContributorsTable = ({ resultOfRamaPriceInUSD }: { resultOfRamaPriceInUSD: bigint | undefined }) => {

//     const classes = useStyles();


//     const { address } = useAccount()
//     const chainId = useChainId()
//     const queryClient = useQueryClient()
//     const { data: blockNumber } = useBlockNumber({ watch: true, })

//     const resultOfUserContributorLength = useReadContract({
//         abi: tsibIcoAbi,
//         address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_ico : tsibContractAddresses.pingaksha.tsib_ico,
//         functionName: 'totalContributorLengthForUser',
//         args: [address as Address, 0],
//         account: zeroAddress
//     })


//     const resultOfUserContributorList = useReadContract({
//         abi: tsibIcoAbi,
//         address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_ico : tsibContractAddresses.pingaksha.tsib_ico,
//         functionName: 'user2SaleType2ContributorList',
//         args: [address as Address, 0, BigInt(0), Number(resultOfUserContributorLength?.data) > 0 ? resultOfUserContributorLength.data as bigint : BigInt(0)],
//         account: zeroAddress
//     })



// // use to refetch
// useEffect(() => {
//     queryClient.invalidateQueries({ queryKey:resultOfUserContributorLength.queryKey }) 
//     queryClient.invalidateQueries({ queryKey:resultOfUserContributorList.queryKey })
// }, [blockNumber, queryClient,resultOfUserContributorLength.queryKey,resultOfUserContributorList.queryKey])

//     return (

//         <>
//             <Box mt={2}>

//                 <TableContainer component={Paper} className={classes.tableContainer}>
//                     <Table sx={{   backgroundColor: '#1D1D20', borderRadius: '0px', border:'1px solid #595c61' }} aria-label="simple table">
//                         <TableHead sx={{ backgroundColor: '#311250' }}>
//                             <TableRow>
//                                 <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} >User</TableCell>
//                                 <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="left">Amount</TableCell>
//                                 <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="right">Quantity</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>

//                             {
//                                 (resultOfUserContributorList?.data && resultOfUserContributorList.data.length > 0) ? (resultOfUserContributorList.data.map((item, index) => (
//                                     <TableRow
//                                         key={index}
//                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                     >
//                                         <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1 }} component="th" scope="row">
//                                             <Box sx={{
//                                                 display: 'flex',
//                                                 gap: '10px',
//                                                 alignItems: 'center'
//                                             }}>
//                                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.23rem' }}>
//                                                     <Image src={t1} alt={""} width={36} />
//                                                     <AddressCopy
//                                                         textColor="#FBEF03!important"
//                                                         hrefLink={
//                                                             chainId === 1370 ? `https://ramascan.com/address/${item.user}` :
//                                                                 `https://pingaksha.ramascan.com/address/${item.user}`
//                                                         }
//                                                         text={item.user as string}
//                                                         addresstext={shortenString(item.user as Address)} />
//                                                 </Box>
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1 }} align="left">

//                                             <Typography color={'#fff'}>{convertToAbbreviated(formatEther?.(BigInt?.(item.amount)))} RUSD</Typography>
//                                             <Typography color={'#999'}>{formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(item?.amount ? item.amount.toString() : 0))) * Number(
//                                                 formatEther?.(BigInt?.(resultOfRamaPriceInUSD ? resultOfRamaPriceInUSD.toString() : 0))))}</Typography>
//                                         </TableCell>

//                                         <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1 }} align="right">

//                                             <Typography color={'#fff'}>{convertToAbbreviated(formatEther?.(BigInt?.(item.volume)))} TSIB</Typography>
//                                             <Typography color={'#999'}>{formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(item.volume))) * 0.05)}</Typography>
//                                         </TableCell>


//                                     </TableRow>

//                                 ))) 
//                                 :
                                   
//                                 (
//                                     <TableRow>
//                                     <TableCell colSpan={3} align="center" className={classes.noData}>
//                                         <Typography color={'#fff'}>No Data Found!</Typography>
//                                     </TableCell>
//                                 </TableRow>
//                                     )
//                             }

//                         </TableBody>

//                     </Table>
//                 </TableContainer>
//             </Box>
//         </>

//     );
// }

// export default ContributorsTable