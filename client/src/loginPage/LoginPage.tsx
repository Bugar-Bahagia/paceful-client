import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const baseURL = 'http://localhost:3000'
  const navigate = useNavigate()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      })
      const { access_token } = response.data

      const responseProfile = await axios.get(`${baseURL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${access_token}`, // Pass the Bearer token here
        },
      })

      localStorage.setItem('token', access_token)
      localStorage.setItem('userProfile', JSON.stringify(responseProfile.data))
      Swal.fire('Login successful', '', 'success')
      navigate('/')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || 'Login failed'
        console.error('Error:', errorMsg)
        Swal.fire('Error', errorMsg, 'error')
      } else {
        Swal.fire('Error', 'An unexpected error occurred', 'error')
      }
    }
  }

  const responseMessage = async (response: CredentialResponse) => {
    if (response.credential) {
      console.log("Google Token:", response.credential)
      try {
        const backendResponse = await axios.post(
          `${baseURL}/auth/googlelogin`,
          {},
          {
            headers: {
              Authorization: `Bearer ${response.credential}`,
            }
          }
        )

        const { access_token } = backendResponse.data
        localStorage.setItem('token', access_token)
        Swal.fire('Google login successful', '', 'success')
        navigate('/')
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const errorMsg = error.response?.data?.message || 'Google login failed'
          console.error('Error:', errorMsg)
          Swal.fire('Error', errorMsg, 'error')
        }
      }
    }
  }

  const errorMessage = () => {
    Swal.fire('Error', 'Google login failed. Please try again.', 'error')
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-center min-h-screen px-6 py-8 mx-auto">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-[#009688] mb-6">
            Sign in to your account
          </h1>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#009688]">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border border-[#009688] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2 transition duration-150 ease-in-out"
                placeholder=""
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#009688]">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 border border-[#009688] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2 transition duration-150 ease-in-out"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#ff5722] hover:bg-[#e64a19] focus:ring-4 focus:outline-none focus:ring-[#ff5722] font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 flex justify-center items-center">
            <GoogleLogin
              onSuccess={responseMessage}
              onError={errorMessage}
              shape="pill"
              useOneTap
              theme="filled_blue"
              size="large"
            />
          </div>

          <p className="text-sm font-light text-[#cddc39] text-center mt-4">
            Don’t have an account yet? <a href="/register" className="font-medium text-[#ff5722] hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
