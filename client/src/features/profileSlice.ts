import { createSlice, Dispatch } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import axios from 'axios';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {
      email: '',
      name: '',
      date: '',
      avatar: '',
    },
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfile } = profileSlice.actions;

export const fetchProfile = () => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.get('https://hacktiv.fathanabds.online/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { name, dateOfBirth, avatar } = data.data;
      const formattedDate = dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : '';

      dispatch(setProfile({ email: data.email, name, avatar, dateOfBirth: formattedDate }));
    } catch (error) {
      console.error('Error fetching profile:', error);
      Swal.fire('Error', 'Failed to fetch profile', 'error');
    }
  };
};

export default profileSlice.reducer;
