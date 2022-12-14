import React from 'react'
import UserService from '../services/UserService';

export const RenderOnAuthenticated = ({ children }:any) => ( UserService.isLoggedIn()) ? children : null; 
