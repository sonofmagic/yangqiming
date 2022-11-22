import i18next from 'i18next'
import I18nextCLILanguageDetector from 'i18next-cli-language-detector'
import resources from './resources'
import Dic from './resources/dic'
export const init = i18next.use(I18nextCLILanguageDetector).init({
  // lng: 'zh',
  // debug: true,
  resources
})
type tParameters = Parameters<typeof i18next.t>

export function t(
  key: tParameters[0],
  options?: tParameters[2] & Record<string, unknown>,
  defaultValue?: tParameters[1]
) {
  return i18next.t(key, defaultValue, options)
}

export { i18next, Dic }
