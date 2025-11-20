import { useEffect } from 'react';

type Props = {
	isCheck: boolean;
	ref: React.RefObject<HTMLElement>;
	onFnc: () => void;
};

export const useOutsideClick = ({ isCheck, ref, onFnc }: Props) => {
	useEffect(() => {
		if (!isCheck) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onFnc();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isCheck]);
};
