describe('cli test', () => {
  it('common', async () => {
    const { main } = await import('@/cli')
    // process.stdout.addListener('data', (...args) => {
    //   console.log(args)
    // })
    // process.stderr.on('data', (...args) => {
    //   console.log(args)
    // })
    await main()
  })
})
