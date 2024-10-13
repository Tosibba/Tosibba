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
import Earning from './earning';
import Community from './community';
import Bounty from './bounty';
import Footer from '../shared/footer';



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
        minHeight: '100vh',
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

export default function EarningTab() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const colorMode = React.useContext(ColorModeContext);
    const theme = useTheme();

    return (
        <Box className={classes.mainDiv}>



            <Box sx={{ width: '100%', border: '1px solid #595c61', borderRadius: '8px', marginTop: '1.5rem' }}>

                <Box sx={{ textTransform: 'capitalize', }}>
                    <Tabs
                         variant="fullWidth"
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
                        <Tab sx={{ textTransform: 'capitalize', color: "#999", border: '1px solid #595c61', borderRadius: '8px', flex: 1, '@media(max-width : 600px)': { padding: '12px 5px',flex: 'none', } }} label="My Package" {...a11yProps(0)} />
                        {/* <Tab sx={{ textTransform: 'capitalize', color: "#999", border: '1px solid #595c61', borderRadius: '8px', margin: '0px 0px 0px 10px', flex: 1, '@media(max-width : 600px)': { padding: '12px 5px',flex: 'none', } }} label="Team" {...a11yProps(1)} /> */}
                        <Tab sx={{ textTransform: 'capitalize', color: "#999", border: '1px solid #595c61', borderRadius: '8px', margin: '0px 0px 0px 10px', flex: 1, '@media(max-width : 600px)': { padding: '12px 5px',flex: 'none', } }} label="History" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box mt={3}>
                        <Earning Earning={'Self Reward'} />
                        <Footer/>
                    </Box>
                </CustomTabPanel>
                {/* <CustomTabPanel value={value} index={1}>
                    <Box mt={3}>

                        <Community />
                        <Footer/>
                    </Box>
                </CustomTabPanel> */}
               
                <CustomTabPanel value={value} index={1}>
                    <Box className={classes.MainHis}>
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
                            variant="h4">History</Typography>
                        <Box className={classes.comingsoon}>
                            <Typography variant='h6' color={'#FBEF03'}>Coming Soon</Typography>
                        </Box>
                        <Footer/>
                    </Box>
                </CustomTabPanel>
            </Box>
        </Box>
    );
}
