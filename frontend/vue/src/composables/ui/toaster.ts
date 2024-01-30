import { useToast } from 'primevue/usetoast'

export function useToaster() {
  const toast = useToast()

  const showError = (message: string) => {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 10000
    })
  }

  const showSuccess = (message: string) => {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 10000
    })
  }

  return {
    showError,
    showSuccess
  }
}
