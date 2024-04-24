import { useRouter, useRoute } from 'vue-router'

export function useNavigate() {
  const router = useRouter()
  const route = useRoute()

  async function navigateToEditPlayer(username: string) {
    await router.push({ name: 'players.edit', params: { username } })
  }

  async function navigateToNewPlayer() {
    await router.push({ name: 'players.new' })
  }

  async function navigateToNewMatch() {
    await router.push({ name: 'matches.new' })
  }

  async function navigateToParentRoute() {
    const nameParts = route.name?.toString().split('.') ?? []
    if (nameParts.length > 1) {
      await router.push({ name: nameParts[nameParts.length - 2] })
    }
  }

  return {
    navigateToEditPlayer,
    navigateToNewPlayer,
    navigateToNewMatch,
    navigateToParentRoute
  }
}
