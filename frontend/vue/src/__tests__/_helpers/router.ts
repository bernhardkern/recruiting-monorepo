import { vi, type Mock } from 'vitest'
import { useRouter, useRoute, type RouteLocationRaw } from 'vue-router'

vi.mock('vue-router', () => {
  return {
    useRoute: vi.fn(),
    useRouter: vi.fn()
  }
})

export function useMockRouter(route: RouteLocationRaw = { name: 'dummy', params: {}, query: {} }) {
  const routerMocks = {
    push: vi.fn(),
    resolve: vi.fn(),
    replace: vi.fn(),
    beforeResolve: vi.fn(),
    beforeEach: vi.fn()
  }
  const mockUseRouter = useRouter as Mock
  mockUseRouter.mockImplementation(() => ({ ...routerMocks }))

  const mockUseRoute = useRoute as Mock
  mockUseRoute.mockImplementation(() => route)

  const mockRouterPlugin = {
    install: (app: any) => {
      app.provide('route location', route)
      app.provide('router', routerMocks)

      app.config.globalProperties.$route = route
      app.config.globalProperties.$router = routerMocks
    },
    ...routerMocks
  }

  return {
    pushSpy: routerMocks.push,
    resolveSpy: routerMocks.resolve,
    replaceSpy: routerMocks.replace,
    beforeResolveSpy: routerMocks.beforeResolve,
    beforeEachSpy: routerMocks.beforeEach,
    mockRouterPlugin
  }
}
