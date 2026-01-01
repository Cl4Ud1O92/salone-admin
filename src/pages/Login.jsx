import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    console.log('🔐 Tentativo login:', formData)

    // ✅ FAKE LOGIN per MVP (dati realistici backend)
    if (formData.username === 'admin' && formData.password === 'admin123') {
      const fakeData = {
        success: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInRpcG8iOiJhZG1pbiJ9.fake.lidia',
        user: {
          id: 1,
          username: 'admin',
          nome: 'Lidia',
          cognome: 'Zucaro',
          tipo: 'admin'
        }
      }
      
      localStorage.setItem('token', fakeData.token)
      localStorage.setItem('role', fakeData.user.tipo)
      localStorage.setItem('username', fakeData.user.username)
      console.log('✅ Login OK → Dashboard')
      navigate('/dashboard')
      return
    }

    setError('Credenziali errate')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <span className="text-3xl">💇‍♀️</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
            Salone Lidia Zucaro
          </h1>
          <p className="text-gray-600 mt-2">Pannello Amministratore</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm"
              placeholder="admin"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm"
              placeholder="admin123"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-800 text-sm font-medium animate-pulse">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
          >
            {loading 
              ? <span>⏳ Verifica credenziali...</span> 
              : <span>🚀 Accedi al Dashboard</span>
            }
          </button>
        </form>

        <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-indigo-50 border-2 border-dashed border-emerald-200 rounded-2xl">
          <p className="text-sm font-mono bg-white px-3 py-2 rounded-xl shadow-sm font-semibold text-emerald-800">
            admin / admin123
          </p>
          <p className="text-xs text-gray-500 mt-2">Backend pronto → API live domani</p>
        </div>
      </div>
    </div>
  )
}
