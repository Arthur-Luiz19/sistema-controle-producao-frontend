export interface ApiError {
  data?: {
    message?: string
    error?: string
  }
  error?: string
  message?: string
  status?: number
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && ('data' in error || 'error' in error || 'message' in error)
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.data?.message || error.error || error.message || 'Erro desconhecido'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Erro desconhecido'
}
