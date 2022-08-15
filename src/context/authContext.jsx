import React, { useReducer, useContext, createContext} from "react";

const initialState = {
    user: null
}

if(localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    initialState.user = token;
}

const AuthContext = createContext({
    user: null,
    login: (userdata) => {},
    logout: () => {}
});

const authReducer = (state, action) => {
    if(action.type === 'LOGIN') {
        console.log(state, action.payload, 'payload');
        return {
            ...state,
            user: action.payload
        }
    }

    if(action.type === 'LOGOUT') {
        return {
            ...state,
            user: null
        }
    }

    return state;
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userdata) => {
        console.log(userdata, 'user data');
        dispatch({
            type: 'LOGIN',
            payload: userdata
        })
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        dispatch({
            type: 'LOGOUT',
            
        })
    }

    return(
        <AuthContext.Provider value={{user: state.user, login, logout}} { ...props }>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider};
