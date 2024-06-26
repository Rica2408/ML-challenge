import { Box } from '@mui/material'
import Navbar from './navbar'

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
    </Box>
  )
}