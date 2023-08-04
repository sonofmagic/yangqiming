import QRCode from 'qrcode'
import type { QRCodeToStringOptions } from 'qrcode'
import * as emoji from 'node-emoji'
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
// https://github.com/airbnb/javascript
export function isPrimitivesType(value: unknown) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null ||
    value === undefined ||
    typeof value === 'symbol' ||
    typeof value === 'bigint'
  )
}

export function isComplexType(value: unknown) {
  // 不用 instance of 因为原型链
  return !isPrimitivesType(value) && (typeof value === 'object' || typeof value === 'function' || Array.isArray(value))
}

export { generateQrcode, emoji, chalk, dayjs, prompts, boxen, axios }
