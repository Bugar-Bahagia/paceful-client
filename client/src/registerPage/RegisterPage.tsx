import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const RegisterPage = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [dateOfBirth, setDateOfBirth] = useState<string>('')
  const navigate = useNavigate()
  const baseURL = 'http://localhost:3000'

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validasi input
    if (!name || !email || !password || !dateOfBirth) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      })
      return
    }

    try {
      const response = await fetch(`${baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, dateOfBirth }),
      })

      const result = await response.json()

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Registration successful!',
        })

        navigate('/login')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message || 'Registration failed!',
        })
      }
    } catch (error) {
      console.error('Error during registration:', error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later!',
      })
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
          <h1
            className="text-2xl font-bold text-center mb-6"
            style={{ color: '#009688' }} // Primary color
          >
            Register account
          </h1>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium"
                style={{ color: '#009688' }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-100 border border-[#cddc39] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2 transition duration-150 ease-in-out"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium"
                style={{ color: '#009688' }} // Primary color
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border border-[#cddc39] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2 transition duration-150 ease-in-out"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
                style={{ color: '#009688' }} // Primary color
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 border border-[#cddc39] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2 transition duration-150 ease-in-out"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium"
                style={{ color: '#009688' }} // Primary color
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="bg-gray-100 border border-[#cddc39] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2 transition duration-150 ease-in-out"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#009688] hover:bg-[#ff5722] focus:ring-4 focus:outline-none focus:ring-[#ff5722] font-medium rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 shadow-md hover:shadow-lg"
            >
              Sign up
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

          <p className="text-sm font-light text-gray-500 text-center mt-4">
            Already have an account?{' '}
            <a href="/login" className="font-medium" style={{ color: '#ff5722' }}> {/* Secondary color */}
              Login here
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
