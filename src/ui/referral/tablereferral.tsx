import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import p1 from '../../icons/p1.svg'
import p2 from '../../icons/p2.svg'
import p3 from '../../icons/p3.svg'
import p4 from '../../icons/p4.svg'
import p5 from '../../icons/p5.svg'
import p6 from '../../icons/p6.svg'
import Image from "next/image";
import r2 from '../../icons/r2.svg'
import HoverTool from "@/theme/components/hoverTool";
import { makeStyles } from '@mui/styles';
import { useAccount, useChainId, useReadContract } from "wagmi";
// import { efStakingAbi } from "@/configs/abi/efStaking";
import { tsibContractAddresses } from "@/configs";
import { Address, formatEther, zeroAddress } from "viem";
import { tsibReferralAbi } from "@/configs/abi/tsibReferral";
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



const Tablereferral = ({ resultOfTsibTokenPrice, referralsCount }: { resultOfTsibTokenPrice: any, referralsCount: string }) => {
    const classes = useStyles();
    const { address } = useAccount()
    const chainId = useChainId()

    const resultOfDirectReferrals = useReadContract({
        abi: tsibReferralAbi,
        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_referral : tsibContractAddresses.pingaksha.tsib_referral,
        functionName: 'getDirectReferrals',
        args: [address as Address, BigInt(0), Number(referralsCount as string) > 0 ? BigInt(referralsCount as string) : BigInt(0)],
        account: zeroAddress
    })

    return (

        <>
            <Box>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table sx={{ minWidth: 650, backgroundColor: '#311250', border: '1px solid #595c61', borderRadius: '4px' }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: '#311250' }}>
                            <TableRow>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} >User</TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="left">SA<HoverTool Title={"Stake Amount"} /></TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="left">Joined</TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="left">Bonus</TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #595c61', fontSize: 18, color: '#fff', padding: 1 }} align="right">YE <HoverTool Title={"Your Earning"} /></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                resultOfDirectReferrals?.data && resultOfDirectReferrals?.data?.[0].length > 0 ? (resultOfDirectReferrals.data[0].map((item: any, index: number) => (
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
                                                        chainId === 1370 ? `https://ramascan.com/address/${resultOfDirectReferrals.data[0][index].user}` :
                                                            `https://pingaksha.ramascan.com/address/${resultOfDirectReferrals.data[0][index].user}`
                                                    }
                                                    text={resultOfDirectReferrals.data[0][index].user as string}
                                                    addresstext={shortenString(resultOfDirectReferrals.data[0][index].user as Address)} />
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">
                                            <Typography color={'#fff'}>{resultOfDirectReferrals.data[1][index] ?
                                                (
                                                    <>
                                                        {convertToAbbreviated(Number(formatEther?.(BigInt?.(resultOfDirectReferrals.data[1][index].toString()))), 3)}  TSIB
                                                    </>
                                                )
                                                : '-'}
                                            </Typography>
                                            <Typography color={'#999'}>
                                                {resultOfDirectReferrals.data[1][index] ?
                                                    (
                                                        <>
                                                            {formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(resultOfDirectReferrals.data[1][index].toString()))) * (Number(
                                                                formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                                            )), 3)}
                                                        </>
                                                    )
                                                    : '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">{resultOfDirectReferrals.data[0][index].side}</TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="left">10%</TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid #595c61', padding: 1, color: '#fff' }} align="right">
                                            <Typography color={'#fff'}>{resultOfDirectReferrals.data[1][index] ?
                                                (
                                                    <>
                                                        {convertToAbbreviated(Number(formatEther?.(BigInt?.(resultOfDirectReferrals.data[1][index].toString()))) * 0.1, 3)}  TSIB
                                                    </>
                                                )
                                                : '-'}
                                            </Typography>
                                            <Typography color={'#999'}>
                                                {resultOfDirectReferrals.data[1][index] ?
                                                    (
                                                        <>
                                                            {formatNumberToCurrencyString(Number(formatEther?.(BigInt?.(resultOfDirectReferrals.data[1][index].toString()))) * 0.1 * (Number(
                                                                formatEther?.(BigInt?.(resultOfTsibTokenPrice?.data ? resultOfTsibTokenPrice?.data?.toString() : 0))
                                                            )), 3)}
                                                        </>
                                                    )
                                                    : '-'}
                                            </Typography>
                                        </TableCell>


                                    </TableRow>
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

export default Tablereferral