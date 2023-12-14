const initialState = {};

const selectedTrip = ((state=initialState,{type,payload})=>{
    if(type==="selectedTrip"){
        return {...payload}
    }else{
        return state
    }
})

export default selectedTrip