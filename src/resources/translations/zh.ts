import type { ITranslation } from '../type'
import { chalk, emoji, dayjs } from '@/util'
import { profileData } from '@/constants'
const { gender, name, nickname, whenToStartWork } = profileData

export const translation: ITranslation = {
  welcome: '欢迎来到 {{nickname}} 信息管理系统',
  promptMsg: `${chalk.greenBright('请选择')} 下列一个信息条目进行查询`,
  profile: '个人信息',
  profiledescription: `展示 {{nickname}} 的个人信息`,
  profilecontent: [
    `${chalk.bold(name)} ${chalk.greenBright(nickname)} ${chalk.bold.blueBright(gender)}`,
    `\n\n${emoji.get('handbag')} ${chalk.bold.greenBright(
      dayjs().year() - whenToStartWork.year()
    )} 年经验 | ${emoji.get('mortar_board')} 扬州大学-软件工程-本科`,
    `\n\n${chalk.bold.greenBright('|')} 个人优势`,
    '\n总是很靠谱，对技术还算热爱',
    `\n\n${chalk.bold.greenBright('|')} 个人技能`,
    '\n基本功好都能写',
    `\n\n${chalk.bold.greenBright('|')} 期望职位`,
    `\n${emoji.get('art')} 钱多 | ${emoji.get('moneybag')} 事少 | ${emoji.get('point_right')} 离家近 ${emoji.get(
      'laughing'
    )}${emoji.get('joy')}`,
    `\n\n${chalk.bold.greenBright('|')} 工作经历`,
    '\n经历过作为打工人,被压榨到看不到希望 \n也经历过作为合伙人,为了一张空头支票而奋不顾身', // ,最终被踢出局
    `\n\n${chalk.bold.greenBright('|')} 项目经历`,
    `\n{{projectsTree}}`,
    '\n> 人生代代无穷已，江月年年只相似',
    '\n 欢迎对技术感兴趣的小伙伴一起交流！'
  ].join(''),
  profileposition: '创业者/核心开发',
  profilejob: '作为前端开发工程师',
  contact: '联系方式',
  contactdescription: `与 {{nickname}} 取得联系的方法`,

  photo: '我的照片',
  photodescription: '由 sonofmagic/ascii-art-avatar 生成',

  blogWeb: '博客-Web版',
  blogWebdescription: 'https://www.icebreaker.top/',
  blogMp: '博客-微信小程序',
  blogMpdescription: '微信搜索破冰客',
  music: '音乐',
  musicdescription: `调用 ${chalk.bold.greenBright('默认')} 系统播放器`,
  quit: '退出',
  quitdescription: '退出系统',
  quitprompt: '您确定要退出此系统吗?',
  quitsuccessExitString: `${chalk.green('√')} ${chalk.greenBright.bold('退出成功!')}`,
  changeLanguage: '切换语言',
  changeLanguagedescription: '目前支持中文和英文',
  changeLanguageselect: '选择你的语言',

  wechatId: '微信号',
  page: '页码',
  next: '下一张',
  prev: '上一张',
  exit: '退出请按',

  directAccess: '直接访问',
  wechatScan: '打开微信扫一扫',
  openWithBrowser: '是否直接用浏览器打开?',
  wechatSearch: '微信内搜索'
}

export default {
  translation
}
