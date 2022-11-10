import QRCode from 'qrcode'
import type { QRCodeToStringOptions } from 'qrcode'
import emoji from 'node-emoji'
import chalk from 'chalk'
import dayjs from 'dayjs'
import prompts from 'prompts'
import boxen from 'boxen'

import axios from 'axios'
import { isUnicodeSupported } from './support'

// const isSupported = isUnicodeSupported()
// console.log(`[isSupported]:${isSupported}`)
async function generateQrcode(input: string) {
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

export { generateQrcode, emoji, chalk, dayjs, prompts, boxen, axios }
