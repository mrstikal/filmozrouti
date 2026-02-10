export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (!auth.isLoggedIn && to.path !== '/login' && to.path !== '/') {
    return navigateTo('/login')
  }
})