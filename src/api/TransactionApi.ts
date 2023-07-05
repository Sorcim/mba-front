import { AccountApi } from './AccountApi.ts'

export class TransactionApi {
  static url(account: number, transaction?: number) {
    return {
      get: `${AccountApi.url(account).show}/transaction`,
      show: `${AccountApi.url(account).show}/transaction/${transaction}`,
      create: `${AccountApi.url(account).show}/transaction`,
      update: `${AccountApi.url(account).show}/transaction/${transaction}`,
      delete: `${AccountApi.url(account).show}/transaction/${transaction}`,
    }
  }
}
