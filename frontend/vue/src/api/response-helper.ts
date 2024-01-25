import type { AxiosError, AxiosResponse } from 'axios'
import type { FailableAxiosResponse, FailableResponse } from '@/api/request'

export function throwError(value: any): value is Error {
  if (value instanceof Error) {
    throw value
  }
  return false
}

export function isResponseNotFailed<T, D>(subject: FailableResponse<T, D>): subject is T {
  return false === subject instanceof Error
}

export function isDataResponseNotFailed<T, D>(subject: any): subject is AxiosResponse<T, D> {
  return false === subject instanceof Error && 'data' in subject
}

export function getResponseBodyOrError<T, D>(failableResponse: FailableAxiosResponse<T, D>) {
  if (isDataResponseNotFailed<T, D>(failableResponse)) {
    return failableResponse.data
  } else if (isResponseNotFailed<T, D>(failableResponse)) {
    return failableResponse
  } else {
    return failableResponse as AxiosError<T, D>
  }
}
