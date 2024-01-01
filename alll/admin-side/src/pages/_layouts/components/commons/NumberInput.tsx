import React, { useMemo, useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

interface NumberInputProps {
	value?: number;
	onChange?: (value: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({ value = 0, onChange }) => {
	const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newNumber = parseInt(e.target.value || '0', 10);
		if (Number.isNaN(newNumber)) {
			return;
		}
		onChange?.(newNumber);
	};

	return <Input type="text" value={value} onChange={onNumberChange} />;
};
