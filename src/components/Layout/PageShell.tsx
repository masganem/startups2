import type { PropsWithChildren } from 'react'
import { Box, Stack } from '@mui/material'

export function PageShell({ children }: PropsWithChildren) {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Stack spacing={5}>{children}</Stack>
    </Box>
  )
}
