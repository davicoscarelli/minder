import axios, { post, put, get } from 'axios'
import { Notify } from 'quasar'

export class User {
  static loggedUser = undefined

  static _clearApiAuth () {

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    localStorage.removeItem('matches')
    localStorage.removeItem('theme')
    // localStorage.removeItem('address')
    // localStorage.removeItem('info')

    axios.defaults.headers.Authorization = ''
    this.loggedUser = undefined
    for(let i=0; i<100; i++)
    {
      window.clearTimeout(i);
    }
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
      console.log(credencials)
      if (status === 200) {
          localStorage.user = JSON.stringify(data.user)
          localStorage.setItem('access_token', data.tokens.token)
          localStorage.setItem('refresh_token', data.tokens.refreshToken)
          localStorage.setItem('matches', JSON.stringify(data.matchesUsers))
        
        Notify.create({ type: 'positive', message: `Welcome!` })
        return true
      }
    } catch (e) {
        console.log(e, "AAAAAAAA")
        Notify.create({ 
          type: 'negative',
          message: `Login or password incorrect!`
        })
        return false
      
    }
  }

  static async getMatches(){
    try {
      if (this.isAuthenticated){
        const { data, status } = await get('/matches')
        if (status === 200) {
            let user = localStorage.getItem("user")
            user = JSON.parse(user)
            
            // console.log(JSON.stringify(data.matches), user.matches)
            if (user.matches != JSON.stringify(data.matches)){
              Notify.create({ type: 'positive', message: `Match with ${data.matchesUsers[data.matchesUsers.length - 1].name}!` })
              localStorage.user = JSON.stringify({...user, matches: JSON.stringify(data.matches)})
              localStorage.matches = JSON.stringify(data.matchesUsers)
            }else{
              localStorage.matches = JSON.stringify(data.matchesUsers)
            }
          
            return data.matchesUsers
        }
      }
    } catch (e) {
        console.log(e, "AAAAAAAA")
        return false
      
    }

  }

  static async decide (item, type) {
    let url = 'clients'

    if(type == "like"){
      url = url + '/like'
    }else if (type == "nope"){
      url = url + '/dislike'
    }
    try {
      const { data, status } = await post(url, {target_user: item.id})
      if (status === 200) {
          let user = localStorage.getItem("user")
          if (data.target && (user.matches != data.target.matches)){
            Notify.create({ type: 'positive', message: `Match with ${data.target.name}!` })
            localStorage.user = JSON.stringify(data.user)
            localStorage.matches = JSON.stringify(data.matchesUsers)
          }else{
            localStorage.user = JSON.stringify(data)
          }
          
          
          return true
      }
    } catch (e) {
        console.log(e, "AAAAAAAA")
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
        // if (payload.avatar && payload.avatar.length > 100) {
        //   payload.avatar = data.message
        //   payload.avatar_url = `${data.message}`
        // }
        // payload.avatar = payload.avatar_url
        // payload.payment_info = {}
        // payload.paymentStatus = data.paymentStatus
        localStorage.user = JSON.stringify(payload)
        
        return true
      }
      
    } catch (e) {
      Notify.create({ type: 'negative', message: `User not created!` })
      return e
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

  static async savePhoto (payload) {
    console.log("foi", payload)
    try {
      const url = payload.id ? `user-photos/${payload.id}` : 'user-photos'

      const { status, data } = payload.id
        ? await put(url, payload)
        : await post(url, payload)
      if (status >= 200 && status <= 300) {
        return true
      }
      
    } catch (e) {
      console.log(e.response)
      Notify.create({ type: 'negative', message: `User not created!` })
      return e.response
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
