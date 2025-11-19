import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

interface IProps {
	cbUpdateSettings: (settings: ArticleStateType) => void;
	settings: ArticleStateType;
}

export const ArticleParamsForm = (props: IProps) => {
	const { cbUpdateSettings, settings } = props;

	const [isOpenedSideBar, setIsOpenedSideBar] = useState(false);

	const [fontFamilyOption, setFontFamilyOption] = useState<OptionType>(
		settings.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState(settings.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		settings.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(settings.contentWidth);
	const [fontSizeOption, setFontSizeOption] = useState(settings.fontSizeOption);

	const toggleSideBar = (isOpenedSideBar: boolean) => {
		setIsOpenedSideBar(!isOpenedSideBar);
	};

	const defaultSetting = () => {
		setFontFamilyOption(settings.fontFamilyOption);
		setFontColor(settings.fontColor);
		setBackgroundColor(settings.backgroundColor);
		setContentWidth(settings.contentWidth);
		setFontSizeOption(settings.fontSizeOption);
	};

	const submitSetting = (e: FormEvent) => {
		e.preventDefault();
		cbUpdateSettings({
			fontFamilyOption: fontFamilyOption,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSizeOption,
		});
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
				<form className={styles.form} onSubmit={submitSetting}>
					<Select
						selected={fontFamilyOption}
						onChange={setFontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						name={'radioGroupName'}
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={setFontSizeOption}
						title='размер шрифта'
					/>

					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<br />
					<br />
					<Separator />
					<br />
					<br />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>

					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => defaultSetting()}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
