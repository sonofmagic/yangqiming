import i18next from 'i18next'
import I18nextCLILanguageDetector from 'i18next-cli-language-detector'
import resources from './resources'
import Dic from './resources/dic'
export async function init() {
  await i18next.use(I18nextCLILanguageDetector).init({
    // lng: 'zh',
    // debug: true,
    resources
  })
}
export const t = i18next.t

export { i18next, Dic }
