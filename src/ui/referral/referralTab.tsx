"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material';
import { ColorModeContext } from '@/context';
import { makeStyles } from '@mui/styles';
import Heading from '@/theme/components/heading';
import Referral from './referral';
import Tablereferral from './tablereferral';
import Refer from '../dashboard/refer';
import { useAccount, useBlockNumber, useChainId, useReadContract, useReadContracts } from 'wagmi';
import { tsibReferralAbi } from '@/configs/abi/tsibReferral';
import { tsibStakingAbi } from '@/configs/abi/tsibStaking';
import { tsibContractAddresses } from '@/configs';
import { Address, zeroAddress } from 'viem';
import Tablereferral2 from './tablereferral2';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from "react";
// import Tablereferraldownline from './tablereferraldownline';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: '2.2rem'
}));
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const useStyles = makeStyles({
    mainDiv: {
        margin: '10px',
        minHeight: '90vh',
    },
    box_hding: {

        backgroundColor: '#101012',
        border: '1px solid #595c61',
        display: 'flex',
        justifyContent: 'center',
        height: '480px',
        alignItems: 'center',
        borderRadius: '12px'
    },
    boxref: {
        padding: '1rem',

    }
});

export default function ReferralTab() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const colorMode = React.useContext(ColorModeContext);
    const theme = useTheme();


    const { address } = useAccount()
    const chainId = useChainId()
    const queryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({ watch: true })
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
                functionName: 'getReferrer',
                args: [address as Address]
            },
            {
                abi: tsibReferralAbi,
                address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_referral : tsibContractAddresses.pingaksha.tsib_referral,
                functionName: 'getSelfBusiness',
                args: [address as Address]
            },
            {
                abi: tsibReferralAbi,
                address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_referral : tsibContractAddresses.pingaksha.tsib_referral,
                functionName: 'getBusinessInfo',
                args: [address as Address]
            },
        ]
    })
    const resultOfTsibTokenPrice = useReadContract({
        abi: tsibStakingAbi,
        address: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking,
        functionName: 'getTokenPrice',
        args: [],
        account: zeroAddress
    })
    // use to refetch
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: resultOfReferralDetail.queryKey })
        queryClient.invalidateQueries({ queryKey: resultOfTsibTokenPrice.queryKey })
    }, [blockNumber, queryClient,resultOfReferralDetail,resultOfTsibTokenPrice])

    return (
        <Box className={classes.mainDiv}>

            <Refer resultOfTsibTokenPrice={resultOfTsibTokenPrice} resultOfReferralDetail={resultOfReferralDetail} />

            <Box sx={{ width: '100%', border: '1px solid #595c61', borderRadius: '8px', marginTop: '1.5rem' }}>

                <Box sx={{ textTransform: 'capitalize', }}>
                    <Tabs
                        variant="scrollable" // Ensure the tabs take up the full width
                        sx={{
                            backgroundColor: '#311250',
                            borderRadius: '8px',
                            padding: '4px 6px 6px 6px',
                            '.MuiTabs-indicator': {
                                height: 47,
                                color: '#000',
                                background: 'linear-gradient(90deg, rgb(251 239 3) 0%, rgb(251 239 3) 35%, #CEA129 100%)',
                                borderRadius: '8px',
                                backgroundColor: 'transparent',
                            },
                            '.Mui-selected': {
                                color: "#000 !important",
                                textTransform: 'capitalize',
                                zIndex: '1',
                            }
                        }} value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab sx={{ textTransform: 'capitalize', color: "#999",border:'1px solid #595c61',borderRadius:'8px',margin:'0px 0px 0px 0px', flex: 1,'@media(max-width : 600px)':{flex: 'none',} }} label="Direct Referral" {...a11yProps(0)} />
                        <Tab sx={{ textTransform: 'capitalize', color: "#999",border:'1px solid #595c61',borderRadius:'8px',margin:'0px 0px 0px 10px', flex: 1,'@media(max-width : 600px)':{flex: 'none',} }} label="Upline Referral" {...a11yProps(1)} />
                        <Tab sx={{ textTransform: 'capitalize', color: "#999",border:'1px solid #595c61',borderRadius:'8px',margin:'0px 0px 0px 10px', flex: 1,'@media(max-width : 600px)':{flex: 'none',} }} label="Tree View" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box className={classes.boxref} mt={2}>
                        <Referral refTitle={'Direct Referral'} />
                        <Box sx={{ marginTop: '1rem' }}>
                            <Tablereferral resultOfTsibTokenPrice={resultOfTsibTokenPrice} referralsCount={resultOfReferralDetail?.data?.[1].result?.toString() as string} />
                        </Box>


                    </Box>
                </CustomTabPanel>
                {/* <CustomTabPanel value={value} index={1}>
                    <Box className={classes.boxref} mt={2}>
                        <Referral refTitle={'Upline Referral'} />
                        <Box sx={{ marginTop: '1rem' }}>
                            <Tablereferral2 resultOfTsibTokenPrice={resultOfTsibTokenPrice} />
                        </Box>
                    </Box>
                </CustomTabPanel> */}

                {/* <CustomTabPanel value={value} index={2}>
                    <Box className={classes.boxref} mt={2}>
                        <Referral refTitle={'Tree View'} />
                        <Box sx={{ marginTop: '1rem' }}>
                            <Tablereferraldownline />
                        </Box>
                    </Box>
                </CustomTabPanel> */}

            </Box>
        </Box>
    );
}
