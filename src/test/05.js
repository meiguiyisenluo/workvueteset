// promise控制并发

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.9) reject('error')
      else resolve(random(1, 100))
    }, random(100, 2000))
  })

const fetchs = Array.from(
  { length: 10 },
  (v, i) => () =>
    fetchData()
      .then((_) => ({ id: i, data: _ }))
      .catch((_) => ({ id: i, data: _ }))
)

const fetchConcurrency = (fetchs) => {
  return new Promise((resolve) => {
    const limit = 3
    let arr = []
    let id = 0

    const result = []

    const run = () => {
      if (!(fetchs.length && arr.length < limit)) return
      const f = fetchs.shift()
      const tempId = id++
      arr.push({
        id: tempId,
        promise: f().then((res) => {
          result.push(res)
          arr = arr.filter((_) => _.id !== tempId)
          if (!fetchs.length && !arr.length) resolve(result)
          run()
        }),
      })
      if (arr.length < limit) run()
    }

    run()
  })
}

fetchConcurrency(fetchs).then((res) => {
  console.log(res.sort((a, b) => a.id - b.id))
})
