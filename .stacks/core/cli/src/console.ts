import { log } from '@stacksjs/logging'
import prompts from 'prompts'

export class Prompt {
  private required: boolean

  constructor() {
    this.required = false
  }

  require() {
    this.required = true
    return this
  }

  isRequired() {
    return this.required
  }

  async select(message: any, options: any) {
    if (this.isRequired())
      return log.prompt(message, { ...options, type: 'select', required: true })

    return log.prompt(message, { ...options, type: 'select' })
  }

  async checkbox(message: any, options: any) {
    if (this.isRequired())
      return log.prompt(message, { ...options, type: 'multiselect', required: true })

    return log.prompt(message, { ...options, type: 'multiselect' })
  }

  async confirm(message: any, options: any) {
    if (this.isRequired())
      return log.prompt(message, { ...options, type: 'confirm', required: true })

    return log.prompt(message, { ...options, type: 'confirm' })
  }

  async input(message: any, options: any) {
    if (this.isRequired())
      return log.prompt(message, { ...options, type: 'text', required: true })

    return log.prompt(message, { ...options, type: 'text' })
  }

  async password(message: any, options: any) {
    if (this.isRequired())
      return log.prompt(message, { ...options, type: 'password', required: true })

    return log.prompt(message, { ...options, type: 'password' })
  }

  async number(message: any, options: any) {
    if (this.isRequired())
      return log.prompt(message, { ...options, type: 'numeral', required: true })

    return log.prompt(message, { ...options, type: 'numeral' })
  }

  async multiselect(message: any, options: any) {
    if (this.isRequired())
      return log.prompt(message, { ...options, type: 'multiselect', required: true })

    return log.prompt(message, { ...options, type: 'multiselect' })
  }

  async autocomplete(message: any, options: any) {
    if (this.isRequired())
      return log.prompt(message, { ...options, type: 'autocomplete', required: true })

    return log.prompt(message, { ...options, type: 'autocomplete' })
  }
}

const dd = log.dd
export { prompts, log, dd }

export const prompt = new Prompt()
