'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material';
import { ColorModeContext } from '@/context';
import { makeStyles } from '@mui/styles';
import Heading from '@/theme/components/heading';
import Buy from './buy';
import Investing from './investing';
import { formatEther } from 'viem';
import { useEffect, useState } from 'react';
import useCheckAllowance from '@/hooks/useCheckAllowance';
import { useAccount, useBlockNumber, useChainId } from 'wagmi';
import { tsibContractAddresses } from '@/configs';
import { useQueryClient } from '@tanstack/react-query';




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

    box_hding: {

        backgroundColor: '#311250',
        border: '1px solid #595c61',
        display: 'flex',
        justifyContent: 'center',
        height: '480px',
        alignItems: 'center',
        borderRadius: '12px'
    },
    comingsoon: {
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #FBEF03',
        borderRadius: '12px',
        marginTop: '1rem'
    },
    MainHis: {
        margin: '1.5rem 1.5rem 1.5rem 1.5rem'
    }
});

export default function HomeTab({resultOfTsibBalance}:any) {
    const classes = useStyles();
    const { address } = useAccount()
    const chainId = useChainId()
    const queryClient = useQueryClient()
    const { data: blockNumber } = useBlockNumber({ watch: true })
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const colorMode = React.useContext(ColorModeContext);
    const theme = useTheme();

    const resultOfCheckAllowance = useCheckAllowance({
        spenderAddress: chainId === 1370 ? tsibContractAddresses.ramestta.tsib_staking : tsibContractAddresses.pingaksha.tsib_staking
    })


    // use to refetch
    useEffect(() => {

        queryClient.invalidateQueries({ queryKey: resultOfCheckAllowance.queryKey })

    }, [blockNumber, queryClient, resultOfCheckAllowance])


    return (
        <Box  >

            <Investing
                resultOfTsibBalance={resultOfTsibBalance}
                resultOfCheckAllowance={resultOfCheckAllowance}
            />

            {/* <Box sx={{ width: '100%', border: '1px solid #595c61', borderRadius: '8px', padding:'1rem 1rem 2rem 1rem', marginTop: '1.5rem' }}>

                <Box sx={{ textTransform: 'capitalize', }}>
                    <Tabs
                        variant="fullWidth" // Ensure the tabs take up the full width
                        sx={{
                            backgroundColor: '#311250',
                            borderRadius: '8px',
                            padding: '4px 6px 6px 6px',
                            '.MuiTabs-indicator': {
                                height: 47,
                                color: '#000 !important',
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
                        <Tab sx={{ textTransform: 'capitalize', color: "#999", border: '1px solid #595c61', borderRadius: '8px', flex: 1, '@media(max-width : 600px)': { padding: '12px 10px' } }} label="Invest" {...a11yProps(0)} />
                        <Tab sx={{ textTransform: 'capitalize', color: "#999", border: '1px solid #595c61', borderRadius: '8px', margin: '0px 0px 0px 10px', flex: 1, '@media(max-width : 600px)': { padding: '12px 10px' } }} label="Buy" {...a11yProps(1)} />
                        
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                <Investing 
                resultOfRusdBalance={resultOfRusdBalance} 
                resultOftsibTokenPrice={resultOftsibTokenPrice}
                resultOfCheckAllowance={resultOfCheckAllowance}
                />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                <Buy 
                    resultOfRusdBalance={resultOfRusdBalance} 
                    resultOftsibTokenPrice={resultOftsibTokenPrice}
                    resultOfCheckAllowance={resultOfCheckAllowance}
                 />
                </CustomTabPanel>
                 
            </Box> */}
        </Box>
    );
}
