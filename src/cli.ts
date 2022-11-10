import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { generateQrcode, createProjectsTree, chalk, dayjs, emoji, prompts, boxen } from './util'
import { playMusicByUrl } from './play'
import profileData from './constants'
import { t, init, i18next } from './i18n'
import Dic from './resources/dic'
// const isGithubCi = Boolean(process.env.GITHUB_CI)

const log = console.log

const { gender, name, nickname, songs, startWorkDay, options } = profileData

const whenToStartWork = dayjs(startWorkDay)

const successExitString = t(Dic.quitsuccessExitString)
const icebreaker = chalk.greenBright(nickname)
// https://stackoverflow.com/questions/23548946/how-can-i-check-if-a-users-computer-supports-emoji

async function main() {
  try {
    await init()

    // try {
    //   if (process.env.TRACE !== '0') {
    //     const { postClue } = await import('./post-clue')
    //     postClue().catch((err) => err)
    //   }
    // } catch (error) {
    //   isGithubCi && console.error(error)
    // }

    log(t(Dic.welcome, { nickname: icebreaker }))
    while (true) {
      const { value } = await prompts(
        {
          type: 'select',
          name: 'value',
          message: t(Dic.promptMsg) as string,
          choices: [
            {
              title: t(Dic.profile),
              value: options.profile,
              description: t(Dic.profiledescription, { nickname: icebreaker })
            },
            {
              title: t(Dic.contact),
              value: options.contact,
              description: t(Dic.contactdescription, { nickname: icebreaker })
            },
            {
              title: t(Dic.photo),
              value: options.photo,
              description: t(Dic.photodescription)
            },
            {
              title: t(Dic.blogWeb),
              value: options.blogWeb,
              description: t(Dic.blogWebdescription)
            },
            {
              title: t(Dic.blogMp),
              value: options.blogMp,
              description: t(Dic.blogMpdescription)
            },
            // {
            //   title: t(Dic.music),
            //   value: options.music,
            //   description: t(Dic.musicdescription)
            // },
            { title: t(Dic.quit), value: options.quit, description: t(Dic.quitdescription) }
          ],
          initial: 0
        },
        {
          async onCancel() {
            const { value } = await prompts({
              type: 'toggle',
              name: 'value',
              message: t(Dic.quitprompt) as string,
              active: 'yes',
              inactive: 'no',
              initial: false
            })
            if (value) {
              log(successExitString)
              process.exit()
            }
            return true
          }
        }
      )
      if (value === options.profile) {
        const boxRow = [
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
          `\n${createProjectsTree().toString()}`,
          '\n> 人生代代无穷已，江月年年只相似',
          '\n 欢迎对技术感兴趣的小伙伴一起交流！'
        ]
        log(
          boxen(boxRow.join(''), {
            borderStyle: 'round',
            padding: 1,
            margin: 1
          })
        )
      } else if (value === options.contact) {
        const qrcode = await generateQrcode('https://u.wechat.com/EAVzgOGBnATKcePfVWr_QyQ')

        const rows = [
          `\n\n${chalk.bold.greenBright('|')} 联系方式`,
          '\nGithub: sonofmagic',
          '\n微信号:\n' +
            boxen(qrcode, {
              borderStyle: 'round',
              padding: 1,
              margin: 1
            })
        ]
        log(rows.join(''))
      } else if (value === options.photo) {
        await new Promise((resolve, reject) => {
          const total = 6
          let idx = 0
          const showPhoto = (idx = 0) => {
            const photo = fs.readFileSync(path.resolve(__dirname, `../assets/photos/${idx}.txt`), {
              encoding: 'utf-8'
            })
            log('\n')
            log(photo)
            log(
              `\n页码: ${idx + 1}/${total} 上一张: ${chalk.bold.greenBright('← ↑')} 下一张: ${chalk.bold.greenBright(
                '→ ↓'
              )} 退出请按: ${chalk.bold.greenBright('ctrl + c')}`
            )
          }

          showPhoto(idx)
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          })
          const onKeypress = function (_str: any, key: { name: 'right' | 'left' | 'up' | 'down' }) {
            if (key.name === 'right' || key.name === 'down') {
              idx++
              if (idx >= total) {
                idx -= total
              }
              showPhoto(idx)
            }
            if (key.name === 'left' || key.name === 'up') {
              idx--
              if (idx < 0) {
                idx += total
              }
              showPhoto(idx)
            }
          }
          process.stdin.on('keypress', onKeypress)
          rl.on('close', () => {
            process.stdin.off('keypress', onKeypress)
            resolve(true)
          })
        })

        // process.stdin.off()
      } else if (value === options.blogWeb) {
        const webSiteUrl = 'https://icebreaker.top'
        const qrcode = await generateQrcode(webSiteUrl)
        const rows = [
          `\n\n${chalk.bold.greenBright('|')} 博客-Web版`,
          `\n直接访问: ${webSiteUrl}`,
          '\n打开微信扫一扫:\n' +
            boxen(qrcode, {
              borderStyle: 'round',
              padding: 1,
              margin: 1
            })
        ]
        log(rows.join(''))
        const { value } = await prompts({
          type: 'toggle',
          name: 'value',
          message: '是否直接用浏览器打开?',
          active: 'yes',
          inactive: 'no',
          initial: true
        })
        if (value) {
          await require('open')(webSiteUrl)
        }
      } else if (value === options.blogMp) {
        const qrcode = await generateQrcode('https://mp.weixin.qq.com/a/~QCyvHLpi7gWkTTw_D45LNg~~')
        const rows = [
          `\n\n${chalk.bold.greenBright('|')} 博客-微信小程序`,
          `\n微信内搜索: ${chalk.bold.greenBright('破冰客')}`,
          '\n打开微信扫一扫:\n' +
            boxen(qrcode, {
              borderStyle: 'round',
              padding: 1,
              margin: 1
            })
        ]
        log(rows.join(''))
      } else if (value === options.music) {
        const response = await prompts({
          type: 'select',
          name: 'play',
          message: '选择曲目',
          choices: songs,
          initial: 0
        })
        const song = songs.find((x) => x.value === response.play)
        if (song) {
          await playMusicByUrl(song.url)
        }
      } else if (value === options.quit) {
        log(successExitString)
        break
      }
    }
  } catch (error) {
    console.error(error)
  }
}

main()

// ;(async () => {

// })()
