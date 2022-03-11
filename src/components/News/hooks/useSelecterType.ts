import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useSelectorType:TypedUseSelectorHook<RootState> = useSelector;
