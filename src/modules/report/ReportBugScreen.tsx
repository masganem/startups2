import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Chip, Grid, Stack, TextField, Typography } from '@mui/material'
import { submitBugReport } from '../../services/mockApi'
import { useDeviceInfo } from '../../hooks/useDeviceInfo'
import { useBugReportForm, type BugReportFormValues } from '../../hooks/useBugReportForm'
import { useUIStore } from '../../store/uiStore'
import { companies } from '../../data/mockData'

const deviceFields = ['os', 'browser', 'version', 'locale'] as const

export function ReportBugScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { device, refresh } = useDeviceInfo()
  const setDeviceInfo = useUIStore((state) => state.setDeviceInfo)

  const state = location.state as { companyId?: string; serviceId?: string; linkedReportTitle?: string; linkedReportNumber?: number } | null
  const companyId = state?.companyId ?? companies[0]?.id
  const serviceId = state?.serviceId ?? useUIStore.getState().selectedService?.id
  const linkedReportTitle = state?.linkedReportTitle
  const linkedReportNumber = state?.linkedReportNumber
  const service =
    companies
      .flatMap((company) => company.services)
      .find((candidate) => candidate.id === serviceId) ?? companies[0]?.services[0]

  const defaultDate = new Date().toISOString().slice(0, 10)
  const form = useBugReportForm(device, defaultDate, linkedReportTitle)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form

  useEffect(() => {
    setDeviceInfo(device)
  }, [device, setDeviceInfo])

  const [uploadList, setUploadList] = useState<string[]>([])

  const onSubmit: SubmitHandler<BugReportFormValues> = async (values) => {
    if (!serviceId) return
    await submitBugReport({
      serviceId,
      title: values.title,
      description: values.description,
      deviceInfo: values.deviceInfo,
      attachments: uploadList,
    })
    navigate(companyId ? `/company/${companyId}` : '/search')
  }

  if (!service) {
    return (
      <Typography variant="body2" color="text.secondary">
        Selecione um serviço primeiro.
      </Typography>
    )
  }

  const companyName = companies.find((c) => c.id === companyId)?.name

  return (
    <Stack spacing={4}>
      <Card
        elevation={12}
        sx={{
          borderRadius: 3,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(148, 163, 184, 0.25)',
        }}
      >
        <CardContent>
          <Typography variant="overline" sx={{ letterSpacing: '0.35em', color: 'text.secondary' }}>
            reportando para
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            {service.name}
          </Typography>
          {companyName && (
            <Typography variant="body2" color="text.secondary">
              {companyName}
            </Typography>
          )}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          {linkedReportNumber && (
            <Typography variant="overline" sx={{ letterSpacing: '0.35em', color: 'text.secondary' }}>
              CONTRIBUINDO COM O REPORT{' '}
              <span
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(148, 163, 184, 0.2)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                }}
              >
                #{linkedReportNumber}
              </span>
            </Typography>
          )}
          <TextField
            fullWidth
            label="Título"
            placeholder="Ex.: painel trava ao rotacionar"
            variant="outlined"
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            InputLabelProps={{ shrink: true }}
            {...register('title')}
          />

          <TextField
            fullWidth
            label="Descrição"
            placeholder="Descreva os passos e o esperado"
            variant="outlined"
            multiline
            minRows={4}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            {...register('description')}
          />

          <TextField
            fullWidth
            label="Data"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...register('date')}
          />

          <Stack spacing={1}>
          <Typography variant="overline" sx={{ letterSpacing: '0.35em', color: 'text.secondary' }}>
            informações do dispositivo
          </Typography>
            <Grid container spacing={2}>
              {deviceFields.map((field) => (
                <Grid item xs={6} key={field}>
                  <TextField
                    fullWidth
                    label={
                      field === 'os'
                        ? 'Sistema'
                        : field === 'browser'
                          ? 'Navegador'
                          : field === 'version'
                            ? 'Versão'
                            : 'Localidade'
                    }
                    size="small"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    {...register(`deviceInfo.${field}` as const)}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              variant="outlined"
              size="small"
              onClick={() => refresh()}
              sx={{ alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: '0.3em' }}
            >
              autopreencher do dispositivo
            </Button>
          </Stack>

          <Stack spacing={1}>
          <Typography variant="overline" sx={{ letterSpacing: '0.35em', color: 'text.secondary' }}>
            mídia
          </Typography>
          <Button
            component="label"
            variant="outlined"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.3em' }}
          >
            carregar capturas
            <input
              type="file"
              multiple
              hidden
                onChange={(event) => {
                  const names = Array.from(event.target.files ?? []).map((file) => file.name)
                  setUploadList(names)
                }}
              />
            </Button>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {uploadList.map((filename) => (
                <Chip key={filename} label={filename} variant="outlined" />
              ))}
            </Stack>
          </Stack>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.3em', py: 1.5 }}
          >
            enviar relatório
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
