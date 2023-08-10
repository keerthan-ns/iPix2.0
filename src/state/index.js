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
    }
})


export const {setIsAuth,setUserId,setUName} = authSlice.actions
export default authSlice.reducer