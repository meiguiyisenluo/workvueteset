// Promise.defer
Promise.defer = function (func = () => {}) {
  let resolve, reject
  const promise = new this((a, b) => {
    resolve = a
    reject = b
    func(a, b)
  })
  return { reject, resolve, promise }
}

const {
  resolve: resolve1,
  reject: reject1,
  promise: promise1,
} = Promise.defer()
promise1
  .then(() => {
    console.log('resolve' + '1')
  })
  .catch(() => {
    console.log('reject' + '1')
  })
if (Math.random() > 0.5) {
  resolve1()
} else {
  reject1()
}

const {
  resolve: resolve2,
  reject: reject2,
  promise: promise2,
} = Promise.defer()
promise2
  .then(() => {
    console.log('resolve' + '2')
  })
  .catch(() => {
    console.log('reject' + '2')
  })

if (Math.random() > 0.5) {
  resolve2()
} else {
  reject2()
}
