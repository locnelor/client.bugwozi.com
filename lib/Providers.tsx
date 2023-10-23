'use client';

import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';

const Providers = (props: React.PropsWithChildren) => {
    return (
        <ThemeProvider attribute='class'>
            <Theme appearance='inherit'>
                {props.children}
            </Theme>
        </ThemeProvider>
    );
};

export default Providers