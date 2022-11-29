describe('util test group', () => {
  it('for in keys', () => {
    const fn = () => {}
    fn.a = 1
    const dic = {
      str: '1',
      num: 12,
      bool: false,
      n: null,
      u: undefined,
      s: Symbol('1'),
      b: BigInt(9007199254740991),
      arr: [
        1,
        2,
        '3',
        {
          a: 1,
          b: '2'
        }
      ],
      obj: {
        a: 1,
        fn,
        arr: [
          1,
          {
            f: 2,
            arr: [2, 3]
          }
        ]
      },
      fn
    }
  })
})
