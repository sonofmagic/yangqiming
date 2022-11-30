import Dic from '@/resources/dic'

describe('dic test group', () => {
  it('i18n dic', () => {
    const dic = Dic
    expect(dic).toMatchObject({})
  })
})
