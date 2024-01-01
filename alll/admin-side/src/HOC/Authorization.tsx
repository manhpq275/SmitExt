import React from 'react';
import useRole from './useRole';
// import Cookies from 'universal-cookie';
import { Navigate } from 'react-router';

const permissions: any = {
	admin: [
		'home',
		'banner',
		'product',
		'login',
		'account',
		'account-add',
		'banner-add',
		'product-add',
		'home',
		'login',
		'banner',
		'home-page',
		'home-product',
		'home-product-detail',
		'home-pay',
		'home-card',
		'home-login',
		'home-sign-up',
		'home-forget-password',
	],
	user: [
		'home',
		'login',
		'home-page',
		'home-product',
		'home-product-detail',
		'home-pay',
		'home-card',
		'home-login',
		'home-sign-up',
		'home-forget-password',
	],
};

export default function Authorization(props: any) {
	const role = useRole();

	// const cookies = new Cookies();
	// const checkAuthPermission = (role: string, id: any) => {
	// 	if (role) {
	// 		return (permissions[role] as Array<any>).findIndex(item => item === id) !== -1;
	// 	} else return false;
	// };

	// const isAuthPermission = checkAuthPermission(role, props.id);

	// if (!isAuthPermission && !cookies.get('auth')) {
	// 	return <Navigate to="/un-authorization" />;
	// }

	return props.children;
}
