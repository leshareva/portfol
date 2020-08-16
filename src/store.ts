
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

// import registerServiceWorker from './sw';
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));