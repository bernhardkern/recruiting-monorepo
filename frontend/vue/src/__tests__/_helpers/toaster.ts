import { vi } from 'vitest'

const showErrorMock = vi.fn(() => {
  // console.log('CALL showErrorMock')
})
const showSuccessMock = vi.fn(() => {
  // console.log('CALL showSuccessMock')
})
vi.mock('@/composables/ui/toaster', () => ({
  useToaster: vi.fn(() => {
    return {
      showError: showErrorMock,
      showSuccess: showSuccessMock
    }
  })
}))

export function useMockToaster() {
  return {
    showErrorMock,
    showSuccessMock
  }
}
