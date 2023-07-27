import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isAuth : false,
    userId : null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setIsAuth: (state, action) => {
            state.isAuth = action.payload.isAuth;
        },
        setUserId:(state,action)=>{
            state.userId = action.payload.userId;
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


export const {setIsAuth,setUserId} = authSlice.actions
export default authSlice.reducer