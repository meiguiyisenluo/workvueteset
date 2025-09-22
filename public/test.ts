type Return<T> = T extends () => infer A ? A : never

const f = () => { }
type A = Return<typeof f>