import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
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
	const [selected, setSelected] = useState(options[0]);

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
						selected={selected}
						onChange={setSelected}
						options={options}
						title='Название выпадающего списка'
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
