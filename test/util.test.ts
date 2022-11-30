import { isComplexType } from '@/util'
import { set } from 'lodash'
describe('util test group', () => {
  function pr(p: string, k: string) {
    return p ? p + '.' + k : k
  }

  function setObjPath(dic: Record<string, unknown>, res: Record<string, unknown>, p: string = '') {
    const keys = Reflect.ownKeys(dic).filter((x) => {
      return typeof x === 'string'
    }) as string[]
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]

      if (isComplexType(dic[k])) {
        setObjPath(dic[k] as Record<string, unknown>, res, pr(p, k))
      } else {
        set(res, pr(p, k), pr(p, k))
      }
    }
  }
  it('for in keys', () => {
    const fn = () => {}
    fn.a = 1
    const dic = {
      // str: '1',
      // num: 12,
      // bool: false,
      // n: null,
      // u: undefined,
      // s: Symbol('1'),
      // b: BigInt(9007199254740991),
      // arr: [
      //   1,
      //   2,
      //   '3',
      //   {
      //     a: 1,
      //     b: '2'
      //   }
      // ],
      obj: {
        a: 1,
        b: {
          c: 1,
          d: {
            e: '1'
          }
        }
        // arr: [
        //   1,
        //   {
        //     f: 2,
        //     arr: [2, 3]
        //   }
        // ]
      }
      // fn
    }
    const obj = {}

    setObjPath(dic, obj)
    console.log(obj)

    // a:
    // 'fn.a'
    // length:
    // 'fn.length'
    // name:
    // 'fn.name'
  })
})
