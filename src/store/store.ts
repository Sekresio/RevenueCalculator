import {configureStore} from '@reduxjs/toolkit'
import clientPaymentSlice from "./clientPaymentSlice";


export const store = configureStore({
    reducer: {
        clientPayments: clientPaymentSlice.reducer 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export const clientPaymentActions = clientPaymentSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
