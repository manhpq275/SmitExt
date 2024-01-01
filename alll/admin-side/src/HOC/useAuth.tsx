import React from 'react';
import { useSelector } from 'react-redux';
import { AuthSliceModule } from 'pages/_redux/auth';

export default function useAuth() {
	const isAuth = useSelector(AuthSliceModule.getAuthSelector);
	return isAuth;
}
