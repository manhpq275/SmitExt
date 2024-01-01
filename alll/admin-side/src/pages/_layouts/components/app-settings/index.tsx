import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getLinkImage } from 'utils/common';

export default function AppSetting() {
	return (
		<Helmet>
			<meta charSet="utf-8" />
		</Helmet>
	);
}
