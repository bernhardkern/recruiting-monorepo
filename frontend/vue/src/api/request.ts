import type { AxiosError, AxiosResponse } from 'axios'
// eslint-disable-next-line no-duplicate-imports
import axios from 'axios'

import requestHelper from '@/api/request-helper'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FailableAxiosResponse<T, D = any> = AxiosResponse<T, D> | AxiosError<T, D>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FailableResponse<T, D = any> = T | AxiosError<T, D>

export default {
  async get<T>(url: string, params = {}, headers = {}): Promise<FailableAxiosResponse<T>> {
    const urlSearchParams = requestHelper.getUrlSearchParams(params)
    let response: FailableAxiosResponse<T>
    try {
      response = await axios.get(url, { params: urlSearchParams, headers })
    } catch (error: any) {
      response = error
    }
    return response
  },

  async post<T, P = unknown>(
    url: string,
    data?: P,
    config?: any
  ): Promise<FailableAxiosResponse<T, P>> {
    let response: FailableAxiosResponse<T>
    try {
      response = await axios.post(url, data, config)
    } catch (error: any) {
      response = error
    }
    return response
  },

  async put<T, P = unknown>(
    url: string,
    data?: P,
    config?: any
  ): Promise<FailableAxiosResponse<T, P>> {
    let response: FailableAxiosResponse<T>
    try {
      response = await axios.put(url, data, config)
    } catch (error: any) {
      response = error
    }
    return response
  }
}
