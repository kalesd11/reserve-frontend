const initialState = {}

const getStates = (state = initialState, { type, payload }) => {
  //  console.log(state)
 if(type==="initialSearch"){
    return {...payload}
 }else{
   return state
 }
}
export default  getStates