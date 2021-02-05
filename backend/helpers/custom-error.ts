export class CustomError extends Error {
  refCode?: string
  statusCode?: number
  data?: object

  constructor (message: string, refCode?: string, statusCode?: number, data?: object) {
    super(message)

    this.name = 'CustomError'
    this.message = message
    this.refCode = refCode
    this.statusCode = statusCode
    this.data = data
  }
}

export type CustomErrorParams = {
  message: string
  refCode?: string
  statusCode?: number
  data?: object
}
const customError = (params: CustomErrorParams) => {
  throw new CustomError(
    params.message,
    params.refCode,
    params.statusCode,
    params.data
  )
}

export default customError