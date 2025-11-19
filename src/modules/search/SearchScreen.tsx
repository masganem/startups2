import { IconButton, InputAdornment, Stack, TextField, Typography, Button, CircularProgress } from '@mui/material'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CompanyCard } from '../../components/Cards/CompanyCard'
import { useInfiniteCompanies } from '../../hooks/useCompanies'
import { useUIStore } from '../../store/uiStore'
import type { Service } from '../../types/data'

export function SearchScreen() {
  const navigate = useNavigate()
  const setSelectedService = useUIStore((state) => state.setSelectedService)
  const [searchTerm, setSearchTerm] = useState('')
  const companiesQuery = useInfiniteCompanies(searchTerm)

  const companies = useMemo(
    () => companiesQuery.data?.pages.flatMap((page) => page.data) ?? [],
    [companiesQuery.data],
  )

  const handleReport = (companyId: string, service: Service) => {
    setSelectedService(service)
    navigate('/report', { state: { companyId, serviceId: service.id } })
  }

  const handleCompanySelect = (companyId: string) => {
    navigate(`/company/${companyId}`)
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="overline" sx={{ letterSpacing: '0.4em', color: 'text.secondary' }}>
          busca
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <TextField
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Pesquisar empresa ou serviço"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchTerm && (
                    <IconButton
                      aria-label="Limpar busca"
                      onClick={() => setSearchTerm('')}
                      size="small"
                      sx={{ color: 'text.secondary' }}
                    >
                      ✕
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.3em' }}
            onClick={() => setSearchTerm('')}
          >
            limpar
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={3}>
        {companiesQuery.isLoading && (
          <Typography variant="body2" color="text.secondary">
            carregando empresas…
          </Typography>
        )}
        {companies.length === 0 && !companiesQuery.isLoading && (
          <Typography variant="body2" color="text.secondary">
            nenhuma empresa corresponde à busca.
          </Typography>
        )}
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onSelectCompany={handleCompanySelect}
            onReport={handleReport}
          />
        ))}
      </Stack>

      {companiesQuery.hasNextPage && (
        <Button
          variant="contained"
          fullWidth
          sx={{ textTransform: 'uppercase', letterSpacing: '0.3em' }}
          onClick={() => companiesQuery.fetchNextPage()}
          disabled={companiesQuery.isFetchingNextPage}
        >
          {companiesQuery.isFetchingNextPage ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            'carregar mais'
          )}
        </Button>
      )}
    </Stack>
  )
}
