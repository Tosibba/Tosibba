"use client"
import { Box, Grid } from "@mui/material";
import Sidebardb from "../dashboard/sidebardb";
import Dsboard from "../dashboard/dsboard";
import DashboardHeader from "../shared/dashboardHeader";
import ComingSoon from "./comingSoon";
import Leadeboard from "./leadeboard";
import Footer from "../shared/footer";
 
 
 














const Leaderboardcmp = () => {


    return (

        <>
            <Box
                 >
                <Grid container spacing={0}>
                    <Grid item lg={2.5} md={2.5} sm={12} xs={12} borderRight={'1px solid #595c61'}>
                        <Box sx={{ '@media(max-width : 900px)': { display: 'none' } }}>
                            <Sidebardb />
                        </Box>

                    </Grid>
                    <Grid item lg={9.5} md={9.5} sm={12} xs={12}>
                      <Box sx={{overflowY:'scroll',
                        height:'100vh'
                    }}>
                      <DashboardHeader />
                      <Leadeboard/>
                      <Footer/>
                      {/* <ComingSoon/> */}
                      </Box>
                    </Grid>
                </Grid>
            </Box>
        </>

    );
}


export default Leaderboardcmp