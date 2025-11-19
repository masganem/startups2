import { Avatar, Box, Paper } from '@mui/material'
import type { User } from '../../types/data'

interface Props {
  user: User
}

export function HeaderBar({ user }: Props) {
  return (
    <Paper
      component="header"
      elevation={4}
      square
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        px: 2,
        py: 1.5,
        backgroundColor: '#0b152a',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 -10px 30px rgba(2, 6, 23, 0.8)',
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 1000,
        borderRadius: 0,
      }}
    >
      <Box sx={{ flexGrow: 1 }} />
      <Avatar
        sx={{
          bgcolor: '#fff',
          color: '#000',
          width: 44,
          height: 44,
          fontSize: '1rem',
        }}
      >
        {user.avatar}
      </Avatar>
    </Paper>
  )
}
