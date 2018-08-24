import axios from 'axios'

let token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token')
let username = localStorage.getItem('username') || sessionStorage.getItem('username')

if (token && username)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export const Users = {
    Login: async loginModel => {
        if (loginModel) {
            const params = new URLSearchParams()
            params.append('grant_type', 'password')
            params.append('username', loginModel.Username)
            params.append('password', loginModel.Password)

            const res = await axios.post(`/Token`, params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).catch(err => err)

            if (res && !res.data) {
                console.log('Token Login Failed', res)
                return null
            }

            token = res.data.access_token
            username = res.data.userName

            const storage = loginModel.RememberMe ? localStorage : sessionStorage
            storage.setItem('auth-token', token)
            storage.setItem('username', username)
        }

        if (token && username) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            return await axios.get(`/api/Users/${username}`).catch(err => err)
        }

        return {}
    },
    Logout: async () => {
        const res = await axios.post(`/api/Account/Logout`).catch(err => err)

        sessionStorage.clear()
        localStorage.clear()
        delete axios.defaults.headers.common['Authorization']

        return res
    },
    Register: async registerModel =>
        await axios.post(`/api/Account/Register`, registerModel)
            .catch(err => err),
    Get: async (userId = '') =>
        await axios.get(`/api/Users/${userId}`)
            .catch(err => err),
    Subscribe: async email =>
        await axios.get(`/api/Users/Subscribe/${email}/`)
            .catch(err => err)
}

export const Posts = {
    Get: async (postId = '') =>
        await axios.get(`/api/Posts/${postId}`)
            .catch(err => err),
    Create: async postModel =>
        await axios.post('/api/Posts', postModel)
            .catch(err => err),
    Update: async postModel =>
        await axios.put('/api/Posts', postModel)
            .catch(err => err),
    Delete: async postId =>
        await axios.delete(`/api/Posts/${postId}`)
            .catch(err => err)
}
