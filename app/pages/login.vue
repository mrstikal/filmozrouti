<script setup>
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (username.value.length > 2) {
    auth.login(username.value)
    router.push('/')
  } else {
    alert('Jméno musí mít aspoň 3 znaky')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Přihlášení do DemoKina</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Uživatelské jméno</label>
          <input
              v-model="username"
              type="text"
              placeholder="Napiš cokoli..."
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Heslo</label>
          <input
              v-model="password"
              type="password"
              placeholder="Není vyžadováno"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Přihlásit se
        </button>
      </form>

      <p class="mt-4 text-xs text-center text-gray-500">
        Tip: Pro toto demo stačí zadat jakékoli jméno delší než 2 znaky.
      </p>
    </div>
  </div>
</template>