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

const fetchConcurrency = (taskQueue) => {
  return new Promise((resolve) => {
    const limit = 3
    let activeTasks = []
    let taskId = 0

    const result = []

    const run = () => {
      if (!(taskQueue.length && activeTasks.length < limit)) return
      const f = taskQueue.shift()
      const tempTaskId = taskId++
      activeTasks.push({
        taskId: tempTaskId,
        promise: f().then((res) => {
          // 收集结果
          console.log(tempTaskId, res)
          result.push(res)
          // 移除任务
          const taskIdx = activeTasks.findIndex((_) => _.taskId === tempTaskId)
          activeTasks.splice(taskIdx, 1)
          // 输出结果
          if (!taskQueue.length && !activeTasks.length) resolve(result)
          run()
        }),
      })
      if (activeTasks.length < limit) run()
    }

    run()
  })
}

fetchConcurrency(fetchs).then((res) => {
  console.log(
    'final result: ',
    res.sort((a, b) => a.id - b.id)
  )
})
