import dic from './dic'

export type ITranslation = Record<typeof dic[keyof typeof dic], string>

export interface IResource {
  translation: ITranslation
}
