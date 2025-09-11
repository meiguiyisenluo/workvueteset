const sleep = (ms) => new Promise((_) => setTimeout(_, ms))
;(async () => {
  console.time('test')
  const p1 = sleep(2000)
  const p2 = sleep(2000)
  const res = await Promise.all([p1, p2])
  console.timeEnd('test')

  console.log(res)
  const { header = {}, data = {} } = res[1]
  console.log(header, data)
})()
