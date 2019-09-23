import React, {createContext, useReducer} from 'react';

export const Store = createContext();

const init = {
  today: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload,
      };
    case 'SET_PAY_STATUS':
      return {
        ...state,
        payStatus: action.payload,
      };
    default:
      return state;
  }
};

export const Provider = props => {
  const [state, dispatch] = useReducer(reducer, init);
  const value = {state, dispatch};
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
