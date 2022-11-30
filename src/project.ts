import { AsciiTree } from 'oo-ascii-tree'
import { t } from './i18n'
import Dic from './resources/dic'
export function createProjectsTree() {
  const tree = new AsciiTree(t(Dic.profile.position, { interpolation: { escapeValue: false } }))

  tree.add(
    new AsciiTree(
      t(Dic.profile.job),
      new AsciiTree('Vue'),
      new AsciiTree('React'),
      new AsciiTree('Serverless'),
      new AsciiTree('Nodejs'),
      new AsciiTree('Nestjs'),
      new AsciiTree('Nuxtjs'),
      new AsciiTree('Nestjs'),
      new AsciiTree('Umi'),
      new AsciiTree('uniapp'),
      new AsciiTree('weapp')
    )
  )

  // tree.add(new AsciiTree('小程序', new AsciiTree('wepy'), new AsciiTree('uniapp')))

  // tree.add(
  //   new AsciiTree(
  //     '实时通讯IM',
  //     new AsciiTree('websocket'),
  //     new AsciiTree('socket.io'),
  //     new AsciiTree('nodejs')
  //   )
  // )

  return tree
}
