import type { ITranslation } from '../type'
import { chalk } from '@/util'
export const translation: ITranslation = {
  welcome: '欢迎来到 {{nickname}} 信息管理系统',
  promptMsg: `${chalk.greenBright('请选择')} 下列一个信息条目进行查询`,
  profile: '个人信息',
  photodescription: `展示 {{nickname}} 的个人信息`,
  contact: '联系方式',
  contactdescription: `与 {{nickname}} 取得联系的方法`,
  photo: '我的照片',
  profiledescription: '由 sonofmagic/ascii-art-avatar 生成',
  blogWeb: '博客-Web版',
  blogWebdescription: 'https://www.icebreaker.top/',
  blogMp: '博客-微信小程序',
  blogMpdescription: '微信搜索破冰客',
  music: '音乐',
  musicdescription: `调用 ${chalk.bold.greenBright('默认')} 系统播放器`,
  quit: '退出',
  quitdescription: '退出系统',
  quitprompt: '您确定要退出此系统吗?',
  quitsuccessExitString: `${chalk.green('√')} ${chalk.greenBright.bold('退出成功!')}`
}

export default {
  translation
}
