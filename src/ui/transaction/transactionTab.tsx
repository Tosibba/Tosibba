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
import TableTransaction from './tableTransaction';


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
        margin: '40px 40px 20px 40px',
        minHeight: '100vh',

        '@media(max-width : 1200px)': {
            margin: '20px 20px 20px 20px',
        }
    },
    box_hding: {

        backgroundColor: '#101012',
        border: '1px solid #1D1D20',
        display: 'flex',
        justifyContent: 'center',
        height: '480px',
        alignItems: 'center',
        borderRadius: '12px'
    }
});

export default function TransactionTab() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const colorMode = React.useContext(ColorModeContext);
    const theme = useTheme();

    return (
        <Box className={classes.mainDiv}>

            <Heading heading={"Transactions"} />

            <Box sx={{ width: '100%', border: '1px solid #1D1D20', borderRadius: '8px', marginTop:'1.5rem' }}>

                <Box sx={{ textTransform: 'capitalize', }}>
                    <Tabs
                        variant="fullWidth" // Ensure the tabs take up the full width
                        sx={{
                            backgroundColor:'#101012',
                            borderRadius:'8px',
                            padding: '4px 6px 6px 6px',
                            '.MuiTabs-indicator': {
                                height: 46,
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
                        <Tab sx={{ textTransform: 'capitalize', color:"#999",border:'1px solid #02b5b56b',borderRadius:'8px',margin:'0px 10px', flex: 1 }} label="My Transaction" {...a11yProps(0)} />
                        <Tab sx={{ textTransform: 'capitalize', color:"#999",border:'1px solid #02b5b56b',borderRadius:'8px',margin:'0px 10px', flex: 1 }} label="Live Transaction" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box mt={3}>
                        <TableTransaction />
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Box mt={3}>
                        <TableTransaction />
                    </Box>
                </CustomTabPanel>
            </Box>
        </Box>
    );
}
