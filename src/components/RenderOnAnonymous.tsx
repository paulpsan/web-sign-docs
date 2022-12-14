import React from 'react'
import UserService from '../services/UserService';

export const RenderOnAnonymous = ( {children}:any ) => ( !UserService.isLoggedIn()) ? children : null; 
