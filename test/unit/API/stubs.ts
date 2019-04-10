import { Request } from 'express'

const stubs: {
  req?: {
    auth?: {
      iA?: boolean
      iZ?: boolean
      u?: string
      c?: string
      r?: string
      t?: string
    }
    params?: { [key: string]: string }
  }
} = {
  req: {
    auth: {
      u: 'testtesttesttesttesttesttesttest'
    },
    params: {}
  }
}

export { stubs }
