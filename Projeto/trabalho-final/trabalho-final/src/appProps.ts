import {Dispatch, SetStateAction} from 'react';

export interface AppProps {
    isLoggedIn?: boolean;
    onLogin: Dispatch<SetStateAction<boolean>>;
}