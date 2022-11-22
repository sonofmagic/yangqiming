import i18next from 'i18next'
import resources from './resources'
import Dic from './resources/dic'
import osLocale from 'os-locale'
export async function init() {
  const locale = await osLocale()
  const lng = locale.startsWith('zh') ? 'zh' : 'en'
  return await i18next.init({
    lng,
    // debug: true,
    resources
  })
}
type tParameters = Parameters<typeof i18next.t>

export function t(
  key: tParameters[0],
  options?: tParameters[2] & Record<string, unknown>,
  defaultValue?: tParameters[1]
) {
  return i18next.t(key, defaultValue, options)
}

export { i18next, Dic }
