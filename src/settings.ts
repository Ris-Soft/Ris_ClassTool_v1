import { createApp } from 'vue'
import App from './settings.vue'

const app = createApp(App)

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
