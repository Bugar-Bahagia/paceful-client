import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const baseURL = 'https://hacktiv.fathanabds.online'
  const navigate = useNavigate()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      })
      setIsLoading(false)
      return
    }

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
    } finally {
      setIsLoading(false)
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
    <>
      <style>
        {`
          /* Fade-in effect */
          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 1s ease-out forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Background scrolling */
          .scroll-bg {
            background-size: cover;
            animation: scrollBg 20s linear infinite;
          }

          @keyframes scrollBg {
            from {
              background-position: 0 0;
            }
            to {
              background-position: -300px 0;
            }
          }

          /* Button hover effect */
          button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          /* Typing effect */
          .typing {
            overflow: hidden;
            white-space: nowrap;
            border-right: 3px solid #009688;
            width: 0;
            animation: typing 3s steps(20, end), blink 0.7s step-end infinite;
          }

          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          @keyframes blink {
            50% {
              border-color: transparent;
            }
          }

          /* Loading spinner */
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #009688;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 grid grid-cols-2">
          <div
            className="bg-cover bg-center scroll-bg"
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/d1/ac/62/d1ac623da0e394031ee92f92c7686773.jpg)',
            }}
          />
          <div
            className="bg-cover bg-center scroll-bg"
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/55/93/97/5593977b9c681e458a756b4fda127069.jpg)',
            }}
          />
        </div>
        <div className="relative flex items-center justify-center min-h-screen z-10">
          <div className="w-full max-w-md bg-black bg-opacity-45 backdrop-blur-md rounded-lg shadow-lg p-8 fade-in">
            <h1 className="text-2xl font-bold text-center mb-6 typing" style={{ color: '#ff5722' }}>
              Welcome Back
            </h1>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ color: '#ff5722' }}>
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 bg-opacity-70 border border-[#cddc39] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium" style={{ color: '#ff5722' }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 bg-opacity-70 border border-[#cddc39] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#009688] hover:bg-[#ff5722] focus:ring-4 focus:outline-none focus:ring-[#ff5722] font-medium rounded-lg text-sm px-6 py-3"
              >
                {isLoading ? <div className="spinner"></div> : 'Login'}
              </button>
            </form>
            <div className="mt-6 flex justify-center items-center">
              <GoogleLogin
                onSuccess={responseMessage}
                onError={errorMessage}
                useOneTap
              />
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-white">
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-[#ff5722] hover:text-[#D2E0FB]">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
