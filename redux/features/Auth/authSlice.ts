import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
  isAuth: false,
}

const transportSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { name, value } = action.payload
      state[name] = value
    },
  },
})

export const { login } = transportSlice.actions

export default transportSlice.reducer
