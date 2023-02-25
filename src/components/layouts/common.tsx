import React from 'react';
import type { LayoutProps } from './main-layout';

export const HomeLayout = ({ children }:LayoutProps): JSX.Element => {
    return <React.Fragment>
        {children}
        <div className='aside'>
            <div className='suggestions'>Suggestions</div>
            <div className='trends'>Trends</div>
        </div>
    </React.Fragment>;
};
