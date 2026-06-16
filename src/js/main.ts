import '../css/main.css'
import '@tabler/icons-webfont/dist/tabler-icons.min.css'
import { validateEcuadorianID, validateRUC } from './validations.ts'

const tabsCont = document.querySelector('.tabs') as HTMLElement
const formsCont = document.querySelector('.tabs__forms') as HTMLElement
const tabsItems = tabsCont.querySelectorAll<HTMLElement>('.tabs__list [data-tab]')
const forms = formsCont.querySelectorAll<HTMLFormElement>('form')
const valElem = document.querySelector('.tabs__val') as HTMLElement

function clearInputs(): void {
  setStatus()
  forms.forEach((form) => {
    (form[0] as HTMLInputElement).value = ''
  })
}

function setStatus(status?: string, message?: string): void {
  valElem.dataset.status = status ?? ''
  valElem.querySelector('span')!.textContent = message ?? ''
}

function setInputValidity(input: HTMLInputElement, isValid: boolean | null = null): void {
  if (isValid === null) {
    delete input.dataset.valid
  } else {
    input.dataset.valid = String(isValid)
  }
}

tabsCont.addEventListener('click', ({ target }) => {
  const tab = (target as HTMLElement).closest<HTMLElement>('[data-tab]')
  if (!tab) return

  const tabId = tab.dataset.tab!

  tabsItems.forEach((t) => {
    t.dataset.active = String(t.dataset.tab === tabId)
  })
  forms.forEach((f) => {
    f.classList.toggle('hidden', f.dataset.form !== tabId)
  })

  clearInputs()
})

formsCont.addEventListener('input', ({ target }) => {
  const input = target as HTMLInputElement
  const id = input.id
  if (id !== 'input-cedula' && id !== 'input-ruc') return

  input.value = input.value.replace(/\D/g, '')
  const maxLen = id === 'input-cedula' ? 10 : 13
  input.value = input.value.slice(0, maxLen)

  setInputValidity(input)
  setStatus()

  if (input.value.length > 0) setStatus('load', 'Validando…')

  if (id === 'input-cedula' && input.value.length === 10) {
    const isValid = validateEcuadorianID(input.value)
    setInputValidity(input, isValid)
    setStatus(isValid ? 'success' : 'error', isValid ? 'Cédula válida' : 'Cédula no válida')
  }

  if (id === 'input-ruc' && input.value.length === 13) {
    const res = validateRUC(input.value)
    setInputValidity(input, res.isValid)
    setStatus(
      res.isValid ? 'success' : 'error',
      res.isValid ? `${res.type} válido` : 'RUC no válido',
    )
  }
})
