import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";

import { composeWithDevTools } from "redux-devtools-extension";

export const myStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
