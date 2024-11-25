import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login Manual:", { email, password })
    // Perform validation or call login API
  }

  const responseMessage = (response: CredentialResponse) => {
    console.log(response)
    if (response.credential) {
      localStorage.setItem("token", response.credential)
      // navigate('/')
    }
  }

  const errorMessage = () => {
    console.error("Login Failed")
    alert("Login failed. Please try again.")
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
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-[#009688] rounded bg-gray-50 focus:ring-3 focus:ring-[#009688]"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-600">Remember me</label>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-[#ff5722] hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#ff5722] hover:bg-[#e64a19] focus:ring-4 focus:outline-none focus:ring-[#ff5722] font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out"
            >
              Sign in
            </button>
          </form>

          {/* Google Login */}
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


          {/* Link to Sign Up */}
          <p className="text-sm font-light text-[#cddc39] text-center mt-4">
            Don’t have an account yet? <a href="#" className="font-medium text-[#ff5722] hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
