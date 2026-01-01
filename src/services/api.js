const API_BASE = 'https://salone-lidia-backend-1.onrender.com'

export const api = {
  async login(credentials) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return res.json()
  },

  async getStats() {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  }
  // TODO: getClienti(), getAppuntamenti()
}
