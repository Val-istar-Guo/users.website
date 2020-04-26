import { CustomError } from 'ts-custom-error'


export class RequestException extends CustomError {
  status: number
  messages: string[]

  constructor(status: number, messages: string[]) {
    super(messages.join('\n'))
    this.messages = messages
    this.status = status
  }
}
