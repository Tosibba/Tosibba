import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import p1 from '../../icons/p1.svg'
import p2 from '../../icons/p2.svg'
import p3 from '../../icons/p3.svg'
import p4 from '../../icons/p4.svg'
import p5 from '../../icons/p5.svg'
import p6 from '../../icons/p6.svg'
import Image from "next/image";
import HoverTool from "@/theme/components/hoverTool";
import r2 from '../../icons/r2.svg'
import { makeStyles } from '@mui/styles';
import { useAccount, useChainId, useReadContract } from "wagmi";
import { tsibReferralAbi } from "@/configs/abi/tsibReferral";
import { Address, formatEther, zeroAddress } from "viem";
import { tsibContractAddresses } from "@/configs";
import shortenString from "@/lib/shortenString";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import { formatNumberToCurrencyString } from "@/lib/formatNumberToCurrencyString";
import AddressCopy from "@/theme/components/addressCopy";


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
    noData: {
        height: '50px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        justifyItems: "center",
        backgroundColor: '#311250'
    }
})





const Tablereferral2 = ({ resultOfTsibTokenPrice }: any) => {
    const classes = useStyles();

    const { address } = useAccount()
    const chainId = useChainId()



    const resultOfUplineReferrals = useReadContract({
        abi: tsibReferralAbi,
        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_referral : tsibContractAddresses.pingaksha.tsib_referral,
        functionName: 'getReferralUplineTree',
        args: [address as Address, BigInt(5)],
        account: zeroAddress
    })

    const rewardPercentages = [
        0.10,  // L1: 10%
        0.05,   // L2: 5%
        0.05,   // L3: 5%
    ];

    return (

        <>
            <Box>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table sx={{ minWidth: 650, backgroundColor: '#311250', border: '1px solid #595c61', borderRadius: '4px' }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: '#311250' }}>
                            <TableRow>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} >User</TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="left">SA <HoverTool Title={"Stake Amount"} /></TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="left">RE <HoverTool Title={"Referral Earning"} /></TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="left">level</TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="left">Bonus</TableCell>
                                {/* <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="right">EFY <HoverTool Title={"Earning From You"} /></TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                (resultOfUplineReferrals?.data && resultOfUplineReferrals.data[0][0].referrer !==zeroAddress) ? (
                                    resultOfUplineReferrals.data[0].map((item, index) => (
                                        <>
                                            {resultOfUplineReferrals.data[0][index].referrer !==zeroAddress &&
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} component="th" scope="row">
                                                        <Box sx={{
                                                            display: 'flex',
                                                            gap: '10px',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Image src={r2} alt={""} width={50} />
                                                            <AddressCopy
                                                                textColor="#00ffff !important"
                                                                hrefLink={
                                                                    chainId === 1370 ? `https://ramascan.com/address/${resultOfUplineReferrals.data[0][index].referrer}` :
                                                                        `https://pingaksha.ramascan.com/address/${resultOfUplineReferrals.data[0][index].referrer}`
                                                                }
                                                                text={resultOfUplineReferrals.data[0][index].referrer as string}
                                                                addresstext={shortenString(resultOfUplineReferrals.data[0][index].referrer as Address)} />
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                                        <Typography color={'#fff'}>{resultOfUplineReferrals.data[1][index] ?
                                                            (
                                                                <>
                                                                    {convertToAbbreviated(Number(formatEther?.(BigInt?.(resultOfUplineReferrals.data[1][index].toString()))))} TSIB
                                                                </>
                                                            )
                                                            : '-'}
                                                        </Typography>
                                                        <Typography color={'#999'}>
                                                            {resultOfUplineReferrals.data[1][index] ?
                                                                (
                                                                    <>
                                                                        {formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(resultOfUplineReferrals.data[1][index].toString()))) * (Number(
                                                                            formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                                                        )))}
                                                                    </>
                                                                )
                                                                : '-'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                                        <Typography color={'#fff'}>{resultOfUplineReferrals.data[0][index] ?
                                                            (
                                                                <>
                                                                    {convertToAbbreviated(Number(formatEther?.(BigInt?.(resultOfUplineReferrals.data[0][index].rewards.toString()))), 3)} TSIB
                                                                </>
                                                            )
                                                            : '-'}
                                                        </Typography>
                                                        <Typography color={'#999'}>
                                                            {resultOfUplineReferrals.data[0][index] ?
                                                                (
                                                                    <>
                                                                        {formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(resultOfUplineReferrals.data[0][index].rewards.toString()))) * (Number(
                                                                            formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                                                        )), 3)}
                                                                    </>
                                                                )
                                                                : '-'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">{index + 1}</TableCell>
                                                    <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                                        <Typography color={'#fff'}>
                                                            {rewardPercentages[index] ?
                                                                (
                                                                    <>
                                                                        {rewardPercentages[index] * 100}%
                                                                    </>
                                                                )
                                                                : '-'}
                                                        </Typography>
                                                    </TableCell>
                                                    {/* <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="right">
                                                        <Typography color={'#fff'}>{(index < 5 && resultOfUplineReferrals.data[0][index]) ?
                                                            (
                                                                <>
                                                                    {convertToAbbreviated(Number(formatEther?.(BigInt?.(resultOfUplineReferrals.data[0][index].rewards.toString()))) * rewardPercentages[index], 3)} TSIB
                                                                </>
                                                            )
                                                            : '-'}
                                                        </Typography>
                                                        <Typography color={'#999'}>
                                                            {resultOfUplineReferrals.data[0][index] ?
                                                                (
                                                                    <>
                                                                        {formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(resultOfUplineReferrals.data[0][index].rewards.toString()))) * rewardPercentages[index] * (Number(
                                                                            formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                                                        )), 3)}
                                                                    </>
                                                                )
                                                                : '-'}
                                                        </Typography>
                                                    </TableCell> */}

                                                </TableRow>
                                            }
                                        </>

                                    ))) :
                                    (
                                        <Box ml={30} className={classes.noData}>
                                            <Typography color={'#fff'} margin={'auto'}>No Data Found!</Typography>
                                        </Box>
                                    )
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>

    );
}

export default Tablereferral2