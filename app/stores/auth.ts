export const useAuthStore = defineStore('auth', () => {
  const authCookie = useCookie('auth_user', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })

  const user: any = ref(authCookie.value || null)
  const isLoggedIn = computed(() => !!user.value)

  function login(username: string) {
    const userData = { name: username }
    authCookie.value = userData as any
    user.value = userData
  }

  function logout() {
    authCookie.value = null
    user.value = null
  }

  return { isLoggedIn, user, login, logout }
})