'use client'
import { Box, Grid } from "@mui/material";
import Sidebardb from "../dashboard/sidebardb";
import DashboardHeader from "../shared/dashboardHeader";
import dynamic from "next/dynamic"
import ComingSoon from "../leaderboard/comingSoon";
import Footer from "../shared/footer";

const EarningTab = dynamic(
  () => import("@/ui/earning/earningTab"),
  {
    ssr: false,
  }
)
 

const Earningcmp = () => {


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
                        <EarningTab/>
                        
                        {/* <ComingSoon/> */}
                    </Box>
                       
                    </Grid>
                </Grid>
            </Box>
        </>

    );
}


export default Earningcmp