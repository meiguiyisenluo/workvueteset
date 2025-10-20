/* eslint-disable @typescript-eslint/no-explicit-any */


type FlowItem<Name extends string, T> = {
  name: Name
  action: () => Promise<T>
  afterAction: (
    res: T,
    resMap: Record<Name, T>,
    next: (name: Name) => void
  ) => void
}

type Options = any

class LYSFlow {
  idx: number = 0;
  arr: any[] = [];
  resMap = {};

  options: Options = {
    onFlowEnd: () => { },
    onFlowError: () => { },
  };

  constructor(arr: any[], options?: Options) {
    this.arr = arr
    if (options) this.options = Object.assign(this.options, options)
  }

  run() {
    const task = this.arr[this.idx]

    let lastOutput
    if (this.idx !== 0) {
      const lastTask = this.arr[this.idx - 1]
      lastOutput = this.resMap[lastTask.name]
    }

    this.idx += 1

    task.action(lastOutput).then((res: any) => {
      this.resMap[task.name] = res

      task.afterAction(res, this.resMap, (flowItemName: any) => {
        if (flowItemName) {
          const idx = this.arr.findIndex(item => item.name === flowItemName)
          if (idx < 0) {
            console.error('flowItemName not found')
          } else {
            this.idx = idx
          }
        }

        if (this.idx < this.arr.length) {
          this.run()
        }
        else {
          this.options?.onFlowEnd(this.resMap)
        }
      })
    }).catch((err: any) => {
      this.options?.onFlowError(err)
    })

  }
}

export default LYSFlow
