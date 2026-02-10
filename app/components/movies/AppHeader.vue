<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from '#app'
import { useAuthStore } from '~/stores/auth'

type NavItem = { to: string; label: string }

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Domů' },
  { to: '/movies', label: 'Filmy' },
  { to: '/tv', label: 'Seriály' },
  { to: '/people', label: 'Herci' },
]

const auth = useAuthStore()
const router = useRouter()

const isMobileNavOpen = ref(false)
const headerRef = ref<HTMLElement | null>(null)

const closeMobileNav = () => {
  isMobileNavOpen.value = false
}

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value
}

const onDocumentClick = (e: MouseEvent) => {
  if (!isMobileNavOpen.value) return
  const target = e.target as Node | null
  if (!target) return

  const headerEl = headerRef.value
  if (!headerEl) return

  if (!headerEl.contains(target)) closeMobileNav()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})

router.afterEach(() => {
  closeMobileNav()
})

const logout = () => {
  auth.logout()
  closeMobileNav()
  router.push('/login')
}
</script>

<template>
  <header ref="headerRef" class="bg-gray-800 text-white p-4 px-8 shadow-xl">
    <div class="mx-auto flex justify-between items-center">
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="text-xl font-bold text-lime-400" @click="closeMobileNav">
          <img
            :alt="'Filmožrouti'"
            :title="'Filmožrouti'"
            src="~/assets/images/logo.svg"
            class="w-16 mr-0"
          />
        </NuxtLink>

        <nav class="hidden md:flex gap-6">
          <NuxtLink
            v-for="item in NAV_ITEMS"
            :key="item.to"
            :to="item.to"
            class="menu-item"
            active-class="menu-item-active"
            @click="closeMobileNav"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <span v-if="auth.isLoggedIn" class="text-sm border-r pr-4 border-gray-700 hidden md:inline">
          Uživatel: <strong>{{ auth.user?.name }}</strong>
        </span>

        <button
          v-if="auth.isLoggedIn"
          @click="logout"
          class="text-sm leading-none bg-red-900 hover:bg-red-800 px-3 py-2 rounded transition hidden md:inline-flex"
        >
          Odhlásit
        </button>

        <NuxtLink
          v-else
          to="/login"
          class="bg-lime-600 px-4 py-1 rounded hover:bg-lime-500 hidden md:inline-flex"
          @click="closeMobileNav"
        >
          Přihlásit se
        </NuxtLink>

        <div class="hamburger-menu" @click.stop="toggleMobileNav" aria-label="Menu" role="button" tabindex="0">
          <div class="w-7 h-0 border-t-3 border-gray-400"></div>
          <div class="w-7 h-0 border-t-3 border-gray-400"></div>
          <div class="w-7 h-0 border-t-3 border-gray-400"></div>
        </div>
      </div>
    </div>

    <div v-if="isMobileNavOpen" class="md:hidden mt-2">
      <nav class="flex flex-col gap-4 text-right">
        <NuxtLink
          v-for="item in NAV_ITEMS"
          :key="`m-${item.to}`"
          :to="item.to"
          class="menu-item"
          active-class="menu-item-active"
          @click="closeMobileNav"
        >
          {{ item.label }}
        </NuxtLink>

        <div class="pt-2 border-t border-gray-700">
          <span v-if="auth.isLoggedIn" class="text-sm text-center pb-2 pt-1 block">
            Uživatel: <strong>{{ auth.user?.name }}</strong>
          </span>

          <button
            v-if="auth.isLoggedIn"
            @click="logout"
            class="text-sm leading-none bg-red-900 hover:bg-red-800 px-3 py-2 rounded transition w-full"
          >
            Odhlásit
          </button>
          <NuxtLink
            v-else
            to="/login"
            class="bg-lime-600 px-4 py-2 rounded hover:bg-lime-500 inline-flex w-full justify-center"
            @click="closeMobileNav"
          >
            Přihlásit se
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>