import { ApiNamespace } from '@/plugins/enum/ApiNamespace'

const { CHESS_ELO_CALCULATOR } = ApiNamespace

const baseURL = {
  [CHESS_ELO_CALCULATOR]: import.meta.env.VITE_ENDPOINT_CHESS_ELO_CALCULATOR
}

export default {
  install: (app: any) => {
    app.config.globalProperties.$baseUrl = baseURL
  }
}

export { ApiNamespace, baseURL }
