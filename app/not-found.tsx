import { Box } from '@mui/material'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
      <h2>Pagina no encontrada</h2>
      <p>No se pudo encontrar el recurso</p>
      <Link href="/">Regresar a Home</Link>
    </Box>
  )
}