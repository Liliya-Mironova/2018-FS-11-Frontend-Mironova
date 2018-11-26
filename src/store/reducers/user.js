/*import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';*/


const initialStore = {
    user : {
        name: '',
        isAuthorized: false
    }
};

const reducer = (store=initialStore, action) => {
/*    switch (action.type) {
        case actionTypes.SENDTEXT:
            return updateObject(store, {user: store.concat(
                                {name: store.name, isAuthorized: store.isAuthorized})});
    }*/
    return store;
};

export default reducer;