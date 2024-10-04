"use client"
import { Box, Grid } from "@mui/material";
import Sidebardb from "../dashboard/sidebardb";
import Dsboard from "../dashboard/dsboard";
import DashboardHeader from "../shared/dashboardHeader";
import TransactionTab from "./transactionTab";
import ComingSoon from "../leaderboard/comingSoon";
 














const Transactioncmp = () => {


    return (

        <>
            <Box
                sx={{ backgroundColor: '#1e2329' }}>
                <Grid container spacing={0}>
                    <Grid item lg={2.5} md={2.5} sm={12} xs={12} borderRight={'1px solid #595c61'}>
                        <Box sx={{ '@media(max-width : 900px)': { display: 'none' } }}>
                            <Sidebardb />
                        </Box>

                    </Grid>
                    <Grid item lg={9.5} md={9.5} sm={12} xs={12}>
                        <DashboardHeader />
                         {/* <TransactionTab/> */}
                         <ComingSoon/>
                    </Grid>
                </Grid>
            </Box>
        </>

    );
}


export default Transactioncmp