/*import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';*/


const initialStore = {
    chatList : []
};

const reducer = (store=initialStore, action) => {
/*    switch (action.type) {
        case actionTypes.SENDTEXT:
            return updateObject(store, {chatList: store.chatList.concat(
                                {name: '', unreadNum: 0})});
    }*/
    return store;
};

export default reducer;