import withNuxt from './.nuxt/eslint.config.mjs'
import vuePlugin from 'eslint-plugin-vue'

export default withNuxt(
  vuePlugin.configs['flat/recommended']
)
