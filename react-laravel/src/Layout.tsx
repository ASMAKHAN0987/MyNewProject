import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SideBar from './Components/Navbar/Sidebar';
const Layout = () => {
  return (
    <>
    <Box sx={{display:'flex'}}>
      <SideBar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
        
      <Typography variant='h4'>
            <Outlet/>
        </Typography>
      </Box>
    </Box>
    </>
    )
}

export default Layout