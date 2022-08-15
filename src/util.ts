import QRCode from 'qrcode'
import type { QRCodeToStringOptions } from 'qrcode'
import { AsciiTree } from 'oo-ascii-tree'
import emoji from 'node-emoji'
import chalk from 'chalk'
import dayjs from 'dayjs'
import prompts from 'prompts'
import boxen from 'boxen'

import axios from 'axios'
import { isUnicodeSupported } from './support'

// const isSupported = isUnicodeSupported()
// console.log(`[isSupported]:${isSupported}`)
async function generateQrcode (input: string) {
  const opt: QRCodeToStringOptions & { small: boolean } = {
    type: 'terminal',
    errorCorrectionLevel: 'L',
    version: 3,
    scale: 1,
    small: isUnicodeSupported
  }
  const str = await QRCode.toString(input, opt as QRCodeToStringOptions)
  return str
}

function createProjectsTree () {
  const tree = new AsciiTree('创业者/核心开发')

  tree.add(
    new AsciiTree(
      '官网前后端',
      new AsciiTree('Nuxtjs'),
      new AsciiTree('Nestjs')
    )
  )

  tree.add(
    new AsciiTree(
      '产品前后端',
      new AsciiTree('Vue'),
      new AsciiTree('React'),
      new AsciiTree('Umi'),
      new AsciiTree('Nodejs')
    )
  )

  tree.add(
    new AsciiTree('诸多小程序', new AsciiTree('wepy'), new AsciiTree('uniapp'))
  )

  tree.add(
    new AsciiTree(
      '实时通讯IM',
      new AsciiTree('websocket'),
      new AsciiTree('socket.io'),
      new AsciiTree('nodejs')
    )
  )

  return tree
}

export {
  generateQrcode,
  createProjectsTree,
  emoji,
  chalk,
  dayjs,
  prompts,
  boxen,
  axios
}
