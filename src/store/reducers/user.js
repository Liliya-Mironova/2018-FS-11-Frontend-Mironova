import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialStore = {
    user : {
        name: '',
        isAuthorized: false
    }
};

const reducer = (store=initialStore, action) => {
/*	switch (action.type) {
        case actionTypes.AUTHORIZATION : return updateObject(state, {isAuthorised: action.isAuthorised});
    }*/
    return store;
};

export default reducer;
