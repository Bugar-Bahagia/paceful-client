import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

interface UserProfile {
  email: string
  name: string
  dateOfBirth: string
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        Swal.fire('Error', 'You need to login first', 'error')
        navigate('/login')
        return
      }

      try {
        const response = await axios.get('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const { email } = response.data
        const { name, dateOfBirth } = response.data.data
        console.log("CHECKDATA", response.data)
        // Format dateOfBirth ke format YYYY-MM-DD
        const formattedDate = dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : ''

        setProfile({ email, name, dateOfBirth: formattedDate }) // Simpan format tanggal yang valid
      } catch (error) {
        console.error('Error fetching profile:', error)
        Swal.fire('Error', 'Failed to fetch profile', 'error')
        navigate('/login')
      }
    }

    fetchProfile()
  }, [navigate])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await axios.put(
        'http://localhost:3000/users/profile',
        { name: profile.name, dateOfBirth: profile.dateOfBirth },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      Swal.fire('Success', response.data.message, 'success')
    } catch (error) {
      console.error('Error updating profile:', error)
      Swal.fire('Error', 'Failed to update profile', 'error')
    }
  }

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    })

    if (confirmation.isConfirmed) {
      try {
        const response = await axios.delete('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        Swal.fire('Success', response.data.message, 'success')
        localStorage.clear()
        navigate('/register') // Redirect ke halaman registrasi setelah menghapus akun
      } catch (error) {
        console.error('Error deleting profile:', error)
        Swal.fire('Error', 'Failed to delete profile', 'error')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-[#009688] mb-6">Your Profile</h1>

        {profile ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#009688]">Email</label>
              <input
                type="email"
                id="email"
                value={profile.email}
                disabled
                className="bg-gray-200 border border-gray-300 text-gray-700 rounded-lg block w-full p-2"
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#009688]">Name</label>
              <input
                type="text"
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-gray-100 border border-[#009688] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-[#009688]">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                value={profile.dateOfBirth}
                onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                className="bg-gray-100 border border-[#009688] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#009688] block w-full p-2"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full text-white bg-[#ff5722] hover:bg-[#e64a19] font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Update Profile
              </button>
              <button
                type="button"
                onClick={handleDeleteProfile}
                className="w-full text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Delete Account
              </button>
            </div>
          </form>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  )
}

export default UserProfile
