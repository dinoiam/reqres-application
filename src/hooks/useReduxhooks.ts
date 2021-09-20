import { AppDispatch, RootState } from '@src/redux';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
