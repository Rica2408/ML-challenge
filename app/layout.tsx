import { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from './components/navbar';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: "Challenge"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}>
          <Navbar />
          {children}
        </Box>
      </body>
    </html>
  )
}

