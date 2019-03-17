export interface IEmailMessage {
  sys_id?: string
  friendly_name?: string
  sender_name?: string
  sender_address?: string
  html?: boolean
  body?: string
  subject?: string
  last_updated?: Date
}
