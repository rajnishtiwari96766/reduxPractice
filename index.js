const redux=require('redux');
const { default: logger } = require('redux-logger');
const reduxLogger=require('redux-logger') 
const createStore=redux.createStore
const combineReducers=redux.combineReducers

const applyMiddleware=redux.applyMiddleware
const logger=reduxLogger.createLogger()

const Buy_cake = "Buy_cake";
const Buy_icecream="Buy_icecream"

function cake_shop() {
  return {
    type: Buy_cake,  
    info: "First redux action",
  };
}

function icecream_shop(){
  return{
    type:Buy_icecream
  }
}
//defining the initial state
const initialState_cakes={
  numOfCakes:10,
}

const initialState_icecream={
  numOfIceCreams:5
}

//defining the reducer function
const cakeReducer=(state=initialState_cakes,action)=>{
  switch(action.type){
    case Buy_cake:
      return{
        ...state,
        numOfCakes:state.numOfCakes-1,
      }
      default:return state
  }
}

//defining the reducer function
const iceCreamReducer=(state=initialState_icecream,action)=>{
  switch(action.type){
    case Buy_icecream:
      return{
        ...state,
        numOfIceCreams:state.numOfIceCreams-1,
      }

      default:return state
  }
}

//This is a root-reducer to manage multiple reducers
const rootReducer=combineReducers({
  cake:cakeReducer,
  icecaem:iceCreamReducer
})

//This is a redux-store to manage the state
const store=createStore(rootReducer, applyMiddleware(logger))
console.log('InitialState:',store.getState())
const unsubscribe=store.subscribe(()=>console.log("Updated State:",store.getState()))

store.dispatch(cake_shop())
store.dispatch(cake_shop())
store.dispatch(cake_shop())
store.dispatch(cake_shop())
store.dispatch(icecream_shop())
store.dispatch(icecream_shop())
store.dispatch(icecream_shop())

unsubscribe()

