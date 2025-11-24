import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import type { Company, Service } from '../../types/data'

interface Props {
  company: Company
  onSelectCompany: (id: string) => void
  onReport: (companyId: string, service: Service) => void
}

export function CompanyCard({ company, onSelectCompany, onReport }: Props) {
  return (
    <Card
      elevation={10}
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid rgba(148, 163, 184, 0.25)',
        borderRadius: 3,
      }}
    >
      <CardHeader
        onClick={() => onSelectCompany(company.id)}
        sx={{ cursor: 'pointer', pb: 2 }}
        avatar={
          <Avatar sx={{ bgcolor: '#fff', color: '#000' }}>{company.logo}</Avatar>
        }
        title={company.name}
        titleTypographyProps={{ fontWeight: 600 }}
      />
      <Divider />
      <CardContent
        onClick={() => onSelectCompany(company.id)}
        sx={{ cursor: 'pointer', pt: 2 }}
      >
        <Stack direction="row" spacing={4}>
          <Stack spacing={0.5}>
            <Chip label="Bounty total" size="small" color="secondary" />
            <Typography variant="h6">${company.totalBounties.toLocaleString()}</Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Chip label="Último mês" size="small" color="secondary" />
            <Typography variant="h6">${company.lastMonthBounties.toLocaleString()}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Chip
          label={`${company.totalReports} relatórios`}
          size="small"
          sx={{ letterSpacing: '0.3em', borderRadius: 16 }}
        />
      </CardActions>
    </Card>
  )
}
