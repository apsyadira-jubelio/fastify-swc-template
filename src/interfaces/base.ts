import { PayloadOrder } from './order'

export interface TransactionLogs {
  action: string
  is_error: boolean
  log_date: string
  log_id: number
  request: PayloadOrder
  response: string
}
