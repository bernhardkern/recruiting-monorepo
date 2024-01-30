import { vi } from 'vitest'

const navigateToEditPlayerMock = vi.fn()
const navigateToNewPlayerMock = vi.fn()
const navigateToNewMatchMock = vi.fn()
const navigateToParentRouteMock = vi.fn()
vi.mock('@/composables/routing/navigate', () => ({
  useNavigate: vi.fn(() => {
    return {
      navigateToEditPlayer: navigateToEditPlayerMock,
      navigateToNewPlayer: navigateToNewPlayerMock,
      navigateToNewMatch: navigateToNewMatchMock,
      navigateToParentRoute: navigateToParentRouteMock
    }
  })
}))

export function useMockNavigate() {
  return {
    navigateToEditPlayerMock,
    navigateToNewPlayerMock,
    navigateToNewMatchMock,
    navigateToParentRouteMock
  }
}
