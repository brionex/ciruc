import '../css/main.css'
import '@tabler/icons-webfont/dist/tabler-icons.min.css'
import { marked } from 'marked'

const content = document.getElementById('content')!

fetch('/doc/doc.md')
  .then((response) => {
    if (!response.ok) throw new Error('Error al cargar el contenido')
    return response.text()
  })
  .then((md) => {
    content.innerHTML = marked.parse(md) as string
  })
  .catch((error) => {
    content.innerHTML = `<div class="flex items-center justify-center py-20 text-error"><i class="ti ti-alert-circle mr-2"></i>Error al cargar la documentación.</div>`
    console.error(error)
  })
