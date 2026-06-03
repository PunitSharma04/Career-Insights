import React from 'react'
import {useAuth} from "../hooks/useAuth.js"
import { Navigate  } from 'react-router'

const Protected = ({children}) => {
    const {user , loading } = useAuth();

    if(loading){
        return (<main><h2>Loading...</h2></main>)
    }
    if(!user){
        return <Navigate to="/login" />;
    }
  return children;
}

export default Protected