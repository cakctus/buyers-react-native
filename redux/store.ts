import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import authSlice from "./features/Auth/authSlice"
import { authApi } from "./api/Auth/auth"

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
