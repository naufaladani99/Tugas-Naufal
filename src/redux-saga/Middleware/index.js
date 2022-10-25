import { takeEvery, all } from "redux-saga/effects";
import * as ActionTypeRegion from '../Constants/RegionConstant'
import { handleAddRegion, handleDelRegion, handleEditRegion, handleGetOneRegion, handleGetRegion } from "./RegionMidle";

function* watchAll(){
    yield all([
        takeEvery(ActionTypeRegion.GET_REGION_REQUEST,handleGetRegion),
        takeEvery(ActionTypeRegion.GETONE_REGION_REQUEST,handleGetOneRegion),
        takeEvery(ActionTypeRegion.ADD_REGION_REQUEST,handleAddRegion),
        takeEvery(ActionTypeRegion.DEL_REGION_REQUEST,handleDelRegion),
        takeEvery(ActionTypeRegion.EDIT_REGION_REQUEST,handleEditRegion)
    ])
}

export default watchAll