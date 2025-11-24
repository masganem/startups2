import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { BugReport } from '../../types/data'

interface Props {
  report: BugReport
  onEndorse: (reportId: string) => void
  companyId?: string
}

export function BugReportCard({ report, onEndorse, companyId }: Props) {
  const navigate = useNavigate()

  const handleContribute = () => {
    const reportNumber = Math.floor(Math.random() * 100) + 1
    navigate('/report', {
      state: {
        companyId,
        serviceId: report.serviceId,
        linkedReportTitle: report.title,
        linkedReportNumber: reportNumber,
      },
    })
  }

  return (
    <Card
      elevation={8}
      sx={{
        borderRadius: 3,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography variant="h6">{report.title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(report.createdAt).toLocaleDateString('en-GB')}
            </Typography>
          </Stack>
          <Chip
            label={report.deviceInfo.os}
            size="small"
            sx={{ letterSpacing: '0.4em', textTransform: 'uppercase' }}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {report.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {report.endorsements} reproduções
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={handleContribute}
          sx={{ textTransform: 'uppercase', letterSpacing: '0.3em' }}
        >
          contribuir
        </Button>
      </CardActions>
    </Card>
  )
}
