"use client"
import { useTheme } from 'next-themes';
import React from 'react';
import ReactSelect from "react-select";
interface SelectProps {
	label: string;
	value?: Record<string, any>;
    onChange: (value:Record<string,any>) => void;
	options: Record<string, any>[];
    disabled?:boolean
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, disabled }) => {
    const themeData = useTheme()
    const isDarkMode = themeData.theme === "dark";

	return (
		<div className="z-[100]">
			<label className="block text-sm font-medium leading-6">{label}</label>
			<div className="mt-2">
				<ReactSelect
					isDisabled={disabled}
					value={value}
					onChange={onChange}
					isMulti
					options={options}
					menuPortalTarget={document.body}
					theme={(theme) => ({
						...theme,
						colors: isDarkMode
							? {
									...theme.colors,
									neutral0: "#FFF5F", // Light mode color
									primary25: "#141c39",
									primary: "#080e24",
							  }
							: theme.colors, // Default colors for other modes
					})}
					styles={{
						menuPortal: (base) => ({
							...base,
							zIndex: 9999,
						}),
					}}
					classNames={{
						control: () => "text-sm bg-white",
					}}
				></ReactSelect>
			</div>
		</div>
	);
};

export default Select;
