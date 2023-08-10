import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isAuth : false,
    userId : null,
    uName : null,
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
        setUName:(state,action)=>{
            state.uName = action.payload.uName;
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


export const {setIsAuth,setUserId,setUName} = authSlice.actions
export default authSlice.reducer