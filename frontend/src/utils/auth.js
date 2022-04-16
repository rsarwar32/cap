/* eslint-disable no-async-promise-executor */
import decode from 'jwt-decode'
import axios from 'axios'

const AUTH_TOKEN_KEY = 'authToken'

export function loginUser(username, password) {
    return new Promise(async(resolve, reject) => {
        try {
            let res = await axios({
                url: `http://localhost:3000/api/login`,
                method: 'POST',
                data: {
                    username: username,
                    password: password,
                    grant_type: 'password'
                }
            })
            setAuthToken(res.data.accessToken)
            resolve()
        } catch (err) {
            console.error('Caught an error during login:', err)
            reject(err)            
        }
    })
}

export function logoutUser() {
    clearAuthToken()
    return axios.delete(`http://localhost:3000/api/logout`)
}

export function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)    
}

export function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isTokenExpired(authToken)
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken())
    }
}

function getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken)
    if (!token.exp) {
        return null
    }
  
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
  
    return date
}
  
function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}