import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { generateQrcode, chalk, prompts, boxen, emoji } from './util'
import { createProjectsTree } from './project'
// import { playMusicByUrl } from './play'
import { optionsData, profileData } from './constants'
import { t, init, i18next, Dic } from './i18n'
import { getRepoList } from './repos'
import ora from 'ora'
// const isGithubCi = Boolean(process.env.GITHUB_CI)

const log = console.log

const { nickname } = profileData
const options = optionsData

const icebreaker = chalk.greenBright(nickname)
// https://stackoverflow.com/questions/23548946/how-can-i-check-if-a-users-computer-supports-emoji

export async function main() {
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
    let ptr = 1
    let initial = 0

    while (ptr) {
      const choices = [
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
          title: t(Dic.myRepositories),
          value: options.myRepositories,
          description: t(Dic.myRepositoriesdescription)
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
        {
          title: t(Dic.changeLanguage),
          value: options.changeLanguage,
          description: t(Dic.changeLanguagedescription)
        },

        // {
        //   title: t(Dic.music),
        //   value: options.music,
        //   description: t(Dic.musicdescription)
        // },
        { title: t(Dic.quit), value: options.quit, description: t(Dic.quitdescription) }
      ]
      const idxMap = choices.reduce<Record<typeof choices[number]['value'], number>>((acc, cur, idx) => {
        acc[cur.value] = idx
        return acc
      }, {})

      const fnMap = Object.entries({
        [options.profile]: () => {
          log(
            boxen(
              t(Dic.profilecontent, {
                projectsTree: createProjectsTree().toString(),
                interpolation: { escapeValue: false }
              }),
              {
                borderStyle: 'round',
                padding: 1,
                margin: 1
              }
            )
          )
        },
        [options.contact]: async () => {
          const qrcode = await generateQrcode('https://u.wechat.com/EAVzgOGBnATKcePfVWr_QyQ')

          const rows = [
            `\n\n${chalk.bold.greenBright('|')} ${t(Dic.contact)}`,
            '\nGithub: sonofmagic',
            `\n${t(Dic.wechatId)}:\n` +
              boxen(qrcode, {
                borderStyle: 'round',
                padding: 1,
                margin: 1
              })
          ]
          log(rows.join(''))
        },
        [options.photo]: async () => {
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
                `\n${t(Dic.page)}: ${idx + 1}/${total} ${t(Dic.prev)}: ${chalk.bold.greenBright('← ↑')} ${t(
                  Dic.next
                )}: ${chalk.bold.greenBright('→ ↓')} ${t(Dic.exit)}: ${chalk.bold.greenBright('ctrl + c')}`
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
        },
        [options.myRepositories]: async () => {
          const spinner = ora({
            spinner: 'soccerHeader',
            text: t(Dic.myRepositoriesLoadingText)
          }).start()
          try {
            const repos = await getRepoList()
            spinner.stop()
            let initial = 0
            let repoPtr = 1
            while (repoPtr) {
              await prompts(
                {
                  type: 'select',
                  name: 'url',
                  message: t(Dic.myRepositoriesPromptsMessage),
                  choices: repos.map((x, idx) => {
                    return {
                      title:
                        x.name +
                        ` ${emoji.get('star')}:${x.stargazers_count} ${emoji.get('fork_and_knife')}:${x.forks_count}`,
                      description: x.description,
                      value: {
                        value: x.html_url,
                        index: idx
                      }
                    }
                  }),
                  initial
                },
                {
                  async onSubmit(prompt, url) {
                    initial = url.index
                    await require('open')(url.value)
                  },
                  onCancel() {
                    repoPtr = 0
                  }
                }
              )
              // if (url) {
              //   initial = url.index
              //   await require('open')(url.value)
              // }
            }
          } catch (error) {
            console.warn(t(Dic.myRepositoriesLoadingFailMessage))
          } finally {
            spinner.stop()
          }
        },
        [options.blogWeb]: async () => {
          const webSiteUrl = 'https://icebreaker.top'
          const qrcode = await generateQrcode(webSiteUrl)
          const rows = [
            `\n\n${chalk.bold.greenBright('|')} ${t(Dic.blogWeb)}`,
            `\n${t(Dic.directAccess)}: ${webSiteUrl}`,
            `\n${t(Dic.wechatScan)}:\n` +
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
            message: `${t(Dic.openWithBrower)}`,
            active: 'yes',
            inactive: 'no',
            initial: true
          })
          if (value) {
            await require('open')(webSiteUrl)
          }
        },
        [options.blogMp]: async () => {
          const qrcode = await generateQrcode('https://mp.weixin.qq.com/a/~QCyvHLpi7gWkTTw_D45LNg~~')
          const rows = [
            `\n\n${chalk.bold.greenBright('|')} ${t(Dic.blogMp)}`,
            `\n${t(Dic.wechatSearch)}: ${chalk.bold.greenBright('破冰客')}`,
            `\n${t(Dic.wechatScan)}:\n` +
              boxen(qrcode, {
                borderStyle: 'round',
                padding: 1,
                margin: 1
              })
          ]
          log(rows.join(''))
        },
        [options.changeLanguage]: async () => {
          const response = await prompts({
            type: 'select',
            name: 'lang',
            message: t(Dic.changeLanguageselect) as string,
            choices: [
              {
                title: 'English',
                value: 'en'
              },
              {
                title: '中文',
                value: 'zh'
              }
            ].map((x) => {
              return {
                ...x,
                selected: i18next.language.startsWith(x.value)
              }
            }),
            initial: 0
          })
          await i18next.changeLanguage(response.lang)
        },
        [options.quit]: () => {
          log(t(Dic.quitsuccessExitString))
          ptr = 0
        }
        // [options.music]: async () => {
        //   const response = await prompts({
        //     type: 'select',
        //     name: 'play',
        //     message: '选择曲目',
        //     choices: songs,
        //     initial: 0
        //   })
        //   const song = songs.find((x) => x.value === response.play)
        //   if (song) {
        //     await playMusicByUrl(song.url)
        //   }
        // }
      }).reduce<Record<typeof choices[number]['value'], Function>>((acc, [key, fn]) => {
        acc[key] = () => {
          initial = idxMap[key] ?? 0
          return fn()
        }
        return acc
      }, {})

      const { value } = await prompts(
        {
          type: 'select',
          name: 'value',
          message: t(Dic.promptMsg) as string,
          choices,
          initial
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
              log(t(Dic.quitsuccessExitString))
              process.exit()
            }
            return true
          }
        }
      )

      const fn = fnMap[value]
      if (fn) {
        await fn()
      }
    }
  } catch (error) {
    console.error(error)
  }
}
// @ts-ignore
if (!__TEST__) {
  main()
}
// ;(async () => {

// })()
