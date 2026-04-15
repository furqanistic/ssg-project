import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './translations/en'
import de from './translations/de'

const savedLanguage = localStorage.getItem('language')
const fallbackLng = 'en'

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
  lng: savedLanguage || fallbackLng,
  fallbackLng,
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  localStorage.setItem('language', language)
})

export default i18n
