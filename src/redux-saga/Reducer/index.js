import { combineReducers } from "redux";
import RegionReduce from "./RegionReducer";

const rootReducer = combineReducers({
    regionStated: RegionReduce
})

export default rootReducer