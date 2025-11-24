import { useNavigate } from 'react-router-dom'
import { Button, Paper, Stack, Typography } from '@mui/material'

export function StartScreen() {
  const navigate = useNavigate()

  return (
    <Paper
      elevation={18}
      sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: 4,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        backdropFilter: 'blur(32px)',
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={1}>
        <Typography
          variant="overline"
          sx={{ letterSpacing: '0.4em', color: 'text.secondary' }}
        >
          acesso simulado
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          Informe um bug, seja notado.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Explore bounty de segurança, escolha uma empresa e relate problemas sem sair deste sandbox.
        </Typography>
        </Stack>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => navigate('/search')}
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            py: 1.5,
          }}
        >
          ver empresas
        </Button>
        <Typography
          variant="caption"
          align="center"
          sx={{ letterSpacing: '0.2em', color: 'text.secondary' }}
        >
          Procurando informações para empresas?
        </Typography>
      </Stack>
    </Paper>
  )
}
