import { AccountApi } from './AccountApi.ts'

export class ScheduledTransactionApi {
  static url(account: number, transaction?: number) {
    return {
      get: `${AccountApi.url(account).show}/scheduled_transaction`,
      show: `${
        AccountApi.url(account).show
      }/scheduled_transaction/${transaction}`,
      create: `${AccountApi.url(account).show}/scheduled_transaction`,
      update: `${
        AccountApi.url(account).show
      }/scheduled_transaction/${transaction}`,
      delete: `${
        AccountApi.url(account).show
      }/scheduled_transaction/${transaction}`,
    }
  }
}
