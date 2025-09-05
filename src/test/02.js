const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const main = () => {
  Promise.resolve()
    .then(() => console.log('red'))
    .then(() => sleep(2000))
    .then(() => console.log('green'))
    .then(() => sleep(3000))
    .then(() => console.log('yellow'))
    .then(() => sleep(1000))
    .then(main)
}

main()
