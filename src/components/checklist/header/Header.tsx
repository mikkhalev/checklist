import React, {FC, ReactNode} from 'react';
import * as classes from './header.module.scss'

interface HeaderProps {
    children: ReactNode
}
const Header: FC<HeaderProps> = ({children}) => {
    return (
        <div className={classes.header}>
            {children}
        </div>
    );
};

export default Header;