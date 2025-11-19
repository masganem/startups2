import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0ea5e9',
      contrastText: '#f8fafc',
    },
    secondary: {
      main: '#1d4ed8',
    },
    background: {
      default: '#05040b',
      paper: 'rgba(9, 16, 31, 0.9)',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    button: {
      fontWeight: 600,
      letterSpacing: '0.3em',
    },
    overline: {
      letterSpacing: '0.4em',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid rgba(148, 163, 184, 0.25)',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          borderColor: 'rgba(148, 163, 184, 0.35)',
          '& fieldset': {
            borderColor: 'rgba(148, 163, 184, 0.35)',
          },
          '&:hover fieldset': {
            borderColor: '#0ea5e9',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0ea5e9',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(148, 163, 184, 0.3)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        },
      },
    },
  },
})
