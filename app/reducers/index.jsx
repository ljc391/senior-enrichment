import { combineReducers } from 'redux'
const  RECIEVE_POSTS='RECIEVE_POSTS';
const initialState = {posts:[] };

const rootReducer = function(state = initialState, action) {

        console.log("hrere~~~~~", typeof RECIEVE_POSTS);
  switch(action.type) {
    case RECIEVE_POSTS:{

        console.log("hrere");
        return Object.assign({}, state, {posts: action.posts});

    }
    default:{ console.log("defaule"); return state;}
  }
};

export default rootReducer;
