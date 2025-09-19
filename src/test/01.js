const sleep = (ms) => {
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve()
    }, ms)
  })
}

const light = (color) =>
  new Promise((resolve) => {
    console.log(color)
    resolve()
  })

const main = () => {
  new Promise((resolve) => resolve())
    .then(() => {
      return light('red')
    })
    .then(() => {
      return sleep(2000)
    })
    .then(() => {
      return light('green')
    })
    .then(() => {
      return sleep(3000)
    })
    .then(() => {
      return light('yellow')
    })
    .then(() => {
      return sleep(1000)
    })
    .then(() => {
      main()
    })
}

main()
