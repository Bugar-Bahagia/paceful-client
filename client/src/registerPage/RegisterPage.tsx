import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [fullname, setFullname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const navigate = useNavigate()
  const baseURL = 'http://localhost:3000'

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validasi input
    if (!fullname || !email || !password || !dob) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      })
      return
    }

    try {
      const response = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, password, dob }),
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
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium"
                style={{ color: '#009688' }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
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
                name="dob"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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
