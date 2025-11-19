import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';

interface IProps {
	cbUpdateSettings: (settings: ArticleStateType) => void;
	settings: ArticleStateType;
}

export const ArticleParamsForm = (props: IProps) => {
	const { cbUpdateSettings, settings } = props;

	const [isOpenedSideBar, setIsOpenedSideBar] = useState(false);

	const toggleSideBar = (isOpenedSideBar: boolean) => {
		setIsOpenedSideBar(!isOpenedSideBar);
	};
	const options = [
		{ title: '1 опция', value: '1 опция', className: '' },
		{ title: '2 опция', value: '2 опция', className: '' },
		{ title: '3 опция', value: '3 опция', className: '' },
		{ title: '4 опция', value: '4 опция', className: '' },
	];
	const [selected, setSelected] = useState(settings.fontFamilyOption);

	const setTargetSelect = (options: OptionType) => {
		console.log('options = ', options);
		setSelected(options);
		cbUpdateSettings(settings);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpenedSideBar}
				onClick={() => {
					toggleSideBar(isOpenedSideBar);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpenedSideBar,
				})}>
				<form className={styles.form}>
					<Select
						selected={settings.fontFamilyOption}
						onChange={setTargetSelect}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						name={'radioGroupName'}
						options={options}
						selected={selected}
						onChange={setSelected}
						title='размер шрифта'
					/>

					<Select
						selected={selected}
						onChange={setSelected}
						options={options}
						title='Название выпадающего списка'
					/>
					<br />
					<br />
					<Separator />
					<br />
					<br />
					<Select
						selected={selected}
						onChange={setSelected}
						options={options}
						title='Название выпадающего списка'
					/>

					<Select
						selected={selected}
						onChange={setSelected}
						options={options}
						title='Название выпадающего списка'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
