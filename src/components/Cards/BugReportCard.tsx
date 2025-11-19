import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import type { BugReport } from '../../types/data'

interface Props {
  report: BugReport
  onEndorse: (reportId: string) => void
}

export function BugReportCard({ report, onEndorse }: Props) {
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
              {new Date(report.createdAt).toLocaleDateString()}
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
          {report.endorsements} endorsements
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => onEndorse(report.id)}
          sx={{ textTransform: 'uppercase', letterSpacing: '0.3em' }}
        >
          apoiar
        </Button>
      </CardActions>
    </Card>
  )
}
