import React, { useContext } from 'react';
import styles from './ProtectedRout.module.css';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRout (props) {
  let {token}=useContext(AuthContext)
  if(token){
    return props.children
  }else{
 return <Navigate to='/Login' />
  }
}

export default ProtectedRout;