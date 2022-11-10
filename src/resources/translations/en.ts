import type { ITranslation } from '../type'
import { chalk } from '@/util'
export const translation: ITranslation = {
  welcome: 'Welcome to the {{nickname}} information management system',
  promptMsg: `${chalk.greenBright('Please select')} one of the following information entries to query`,
  profile: 'Personal information',
  photodescription: `Display personal information of {{nickname}}`,
  contact: 'Contact information',
  contactdescription: `Methods to get in touch with {{nickname}}`,
  photo: 'My Photo',
  profiledescription: 'generated by sonofmagic/ascii-art-avatar',
  blogWeb: 'Blog - Web',
  blogWebdescription: 'https://www.icebreaker.top/',
  blogMp: 'Blog - WeChat applet',
  blogMpdescription: 'search "破冰客" in Wechat app',
  music: 'Music',
  musicdescription: `Call ${chalk.bold.greenBright('default')} system player`,
  quit: 'Sign out',
  quitdescription: 'Exit the system',
  quitprompt: 'Are you sure you want to exit this system?',
  quitsuccessExitString: `${chalk.green('√')} ${chalk.greenBright.bold('Exit succeeded!')}`
}

export default {
  translation
}
