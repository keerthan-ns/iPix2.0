import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isAuth : false,
    // user : null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setIsAuth: (state, action) => {
            state.isAuth = action.payload.isAuth;
        },
        // setLogin:(state,action)=>{
        //     state.user = action.payload.user
        // },
        // setLogout:(state)=>{
        //     state.user = null           
        // },
        // setFriends: (state, action) => {
        //     if (state.user) 
        //       state.user.friends = action.payload.friends
        //     else 
        //       console.error("user friends non-existent :(")
        // },
    }
})


export const {setIsAuth,setLogin,setLogout,setFriends} = authSlice.actions
export default authSlice.reducer