import axios, { post, put, get } from 'axios'
import { Notify } from 'quasar'

export class User {
  static loggedUser = undefined

  static _clearApiAuth () {

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    localStorage.removeItem('address')
    localStorage.removeItem('info')

    axios.defaults.headers.Authorization = ''
    this.loggedUser = undefined
    return true
  }

  static _initApiAuth () {
    const token = localStorage.getItem('access_token')
    if (!token) return false
    axios.defaults.headers.Authorization = `bearer ${token}`
    return true
  }

  constructor(data) {
    Object.assign(this, data)
  }

  async login (credencials) {


    try {
      const { data, status } = await post('auth/login', credencials)
      if (status === 200) {
          localStorage.user = JSON.stringify(data.user)
          localStorage.setItem('access_token', data.tokens.token)
          localStorage.setItem('refresh_token', data.tokens.refreshToken)
        
        Notify.create({ type: 'positive', message: `Bem vindo!` })
        return true
      }
    } catch (e) {
        console.log(e)
        Notify.create({
          type: 'negative',
          message: `Login ou senha incorretos`
        })
        return false
      
    }
  }

  static async logout () {
    try {
      await post('auth/logout')
      return this._clearApiAuth()
    } catch (e) {
      return this._clearApiAuth()
    }
  }

  static getUser () {
    if (!localStorage.user) return {}
    return JSON.parse(localStorage.user)
  }
  static getPlan () {
    if (!localStorage.user) return {}
    let user = JSON.parse(localStorage.user)
    return user.plan
    
  }

  

  static isAuthenticated () {
    try {
      const user = this.user()
      if (typeof user === 'boolean') return false
      let exp = new Date(user.iat * 1000)
      exp = exp.setDate(exp.getDate() + 1)
      return exp > new Date().getTime()
    } catch (e) {
      this._clearApiAuth()
      return false
    }
  }

  static user () {
    try {
      if (this.loggedUser !== undefined) return this.loggedUser
      this._initApiAuth()
      const token = localStorage.getItem('access_token')

      const data = token.split('.')[1]
      this.loggedUser = new User(JSON.parse(atob(data)))
      return this.loggedUser
    } catch (e) {
      return false
    }
  }

  static async register (payload) {
    console.log("psyloadddd", payload)
    try {
      const url = payload.id ? `clients/${payload.id}` : 'clients'

      const { status, data } = payload.id
        ? await put(url, payload)
        : await post(url, payload)
      if (status >= 200 && status <= 300) {
        if (payload.avatar && payload.avatar.length > 100) {
          payload.avatar = data.message
          payload.avatar_url = `${data.message}`
        }
        payload.avatar = payload.avatar_url
        payload.payment_info = {}
        payload.paymentStatus = data.paymentStatus
        localStorage.user = JSON.stringify(payload)
        if (payload.id){
          if (payload.password) {
          }
        }else{
          if (payload.plan.plan_id == 1){
            // Notify.create({ type: 'positive', message: `Usuário Cadastrado!` })
          }
        }
        
        return true
      }
      
    } catch (e) {
      //Notify.create({ type: 'negative', message: `Usuário Não Cadastrado!` })
      return e.response
    }
  }

  static async delete (payload) {
    try {
      const url = `deactivate`

      const { status, data } = await put(url, payload)
        
      if (status >= 200 && status <= 300) {
        return true
      }
      
    } catch (e) {
      //console.log(e)
      //Notify.create({ type: 'negative', message: `Usuário Não Cadastrado!` })
      return false
    }
  }


  static async recoverRequest(payload) {

    try {
      
      const url = 'access-recover-request'
      const { status, message } = await post(url, payload)

      if (status == 200) {
        // Notify.create({ type: 'positive', message: `Um email foi enviado contendo o link para recuperação de email` })
        return true
      }
    
    } catch (e) {
      if (e.response.status === 401){
        // Notify.create({
        //   type: 'negative',
        //   message: `Verifique sua conta`
        // })
        return e.response.status
      }else{
        Notify.create({
          type: 'negative',
          message: e.response.data.message
        })
        return false

      }
    }
  
  }
}
