import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';


const initialStore = {
    messageList : []
};

const updateDeliver = (store, action) => {
    const updatedMessageList = store.messageList/*.filter(result => result.id !== action.resultElId)*/;
    return updateObject(store, {messageList: updatedMessageList} );
};

const reducer = (store=initialStore, action) => {
    switch (action.type) {
        case actionTypes.SENDTEXT:
            return updateObject(store, {messageList: store.messageList.concat(
                                {id: store.id+1, text: action.text, img: '', file: '', delivered: false})});
        case actionTypes.SENDFILE:
            return updateObject(store, {messageList: store.messageList.concat(
                                {id: store.id+1, text: '', img: '', file: action.file, delivered: false})});
        case actionTypes.SENDIMG:
            return updateObject(store, {messageList: store.messageList.concat(
                                {id: store.id+1, text: '', img: action.img, file: action.file, delivered: false})});
        case actionTypes.UPDATEDELIVER:
            return updateDeliver(store, action);
    }
    return store;
};

export default reducer;