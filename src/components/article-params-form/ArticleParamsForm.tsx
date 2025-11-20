import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClick } from '../customHooks/useOutsideClick';

interface IProps {
	cbUpdateSettings: (settings: ArticleStateType) => void;
	settings: ArticleStateType;
	defaultArticleState: ArticleStateType;
}

export const ArticleParamsForm = (props: IProps) => {
	const { cbUpdateSettings, settings, defaultArticleState } = props;

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

	const refForm = useRef<HTMLFormElement | null>(null);

	const toggleSideBar = (isOpenedSideBar: boolean) => {
		setIsOpenedSideBar(!isOpenedSideBar);
	};

	const defaultSetting = () => {
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		cbUpdateSettings({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
		toggleSideBar(true);
	};

	const submitSetting = (e: FormEvent) => {
		e.preventDefault();
		applyValues();
	};

	const applyValues = () => {
		cbUpdateSettings({
			fontFamilyOption: fontFamilyOption,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSizeOption,
		});
		toggleSideBar(true);
	};

	useOutsideClick({
		isCheck: isOpenedSideBar,
		ref: refForm,
		onFnc: () => setIsOpenedSideBar(false),
	});

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
				<form className={styles.form} onSubmit={submitSetting} ref={refForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
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
					<Separator />
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
