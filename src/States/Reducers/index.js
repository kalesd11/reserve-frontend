import {combineReducers} from "redux"
import getStates from "./getStates"
import selectedTrip from "./selectedTrip"

const reducers = combineReducers({
    getStates : getStates,
    selectedTrip: selectedTrip
})

export default reducers