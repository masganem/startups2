import { useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { fetchBugReports, fetchCompanyById, endorseBugReport } from '../../services/mockApi'
import { useInfiniteBugReports } from '../../hooks/useBugReports'
import { useUIStore } from '../../store/uiStore'
import { BugReportCard } from '../../components/Cards/BugReportCard'
import { formatCurrency } from '../../utils/formatters'

export function CompanyScreen() {
  const navigate = useNavigate()
  const { companyId } = useParams()
  const queryClient = useQueryClient()
  const setSelectedService = useUIStore((state) => state.setSelectedService)

  const companyQuery = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => fetchCompanyById(companyId ?? ''),
    enabled: Boolean(companyId),
  })

  const serviceId = companyQuery.data?.services[0]?.id ?? ''
  const bugReportsQuery = useInfiniteBugReports(serviceId)

  const handleReport = useCallback(() => {
    const service = companyQuery.data?.services[0]

    if (service && companyId) {
      setSelectedService(service)
      navigate('/report', { state: { companyId, serviceId: service.id } })
    }
  }, [companyId, companyQuery.data, navigate, setSelectedService])

  const handleEndorse = useCallback(
    async (reportId: string) => {
      await endorseBugReport(reportId)
      queryClient.invalidateQueries(['bugReports', serviceId])
    },
    [queryClient, serviceId],
  )

  if (companyQuery.isLoading) {
    return (
      <Typography variant="body2" color="text.secondary">
        carregando empresa…
      </Typography>
    )
  }

  const company = companyQuery.data

  if (!company) {
    return (
      <Typography variant="body2" color="text.secondary">
        empresa não encontrada
      </Typography>
    )
  }

  const reports = bugReportsQuery.data?.pages.flatMap((page) => page.data) ?? []

  return (
    <Stack spacing={4}>
      <Card
        elevation={16}
        sx={{
          borderRadius: 4,
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: '0.4em', color: 'text.secondary' }}>
                empresa
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                {company.name}
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: '#fff',
                color: '#000',
                fontSize: '1.25rem',
              }}
            >
              {company.logo}
            </Avatar>
          </Stack>

          <Divider sx={{ my: 3, borderColor: 'rgba(148, 163, 184, 0.2)' }} />

          <Grid container spacing={2}>
            {[
              { label: 'Bounty total', value: formatCurrency(company.totalBounties) },
              { label: 'Último mês', value: formatCurrency(company.lastMonthBounties) },
              { label: 'Total de relatórios', value: company.totalReports },
              { label: 'Relatórios no último mês', value: company.lastMonthReports },
            ].map((metric) => (
              <Grid item xs={6} key={metric.label}>
                <PaperMetric label={metric.label} value={metric.value.toString()} />
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, letterSpacing: '0.3em', textTransform: 'uppercase' }}
            onClick={handleReport}
          >
            reportar bug
          </Button>
        </CardContent>
      </Card>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="overline" sx={{ letterSpacing: '0.3em', color: 'text.secondary' }}>
            relatórios abertos
          </Typography>
          <Button
            variant="text"
            size="small"
            onClick={() => bugReportsQuery.fetchNextPage()}
            disabled={!bugReportsQuery.hasNextPage || bugReportsQuery.isFetchingNextPage}
            sx={{ letterSpacing: '0.3em' }}
          >
            carregar mais
          </Button>
        </Stack>
        <Stack spacing={3}>
          {reports.map((report) => (
            <BugReportCard key={report.id} report={report} onEndorse={handleEndorse} />
          ))}
          {!reports.length && (
            <Typography variant="body2" color="text.secondary">
              Ainda não há relatórios; seja o primeiro.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

function PaperMetric({ label, value }: { label: string; value: string }) {
  return (
    <Stack
      spacing={0.5}
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        borderRadius: 2,
        p: 2,
        border: '1px solid rgba(148, 163, 184, 0.15)',
        minHeight: 96,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Stack>
  )
}
