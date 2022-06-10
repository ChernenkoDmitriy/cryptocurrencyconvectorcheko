import { observer } from 'mobx-react';
import React, { createContext, FC, useContext } from 'react';
import { colorTheme } from './colors/ColorsController';
import { IColorsController } from './colors/IColorsController';
import { ILocalization } from './localization/ILocalization';
import { localization } from './localization/Localization';

export const UIContext = createContext<IColorsController & ILocalization>({} as any);

export const useUiContext = () => { return useContext(UIContext) };

interface IProps {
    children: React.ReactNode;
}

export const UIProvider: FC<IProps> = observer(({ children }) => {
    const value = {
        locales: localization.locales,
        colors: colorTheme.colors,
        theme: colorTheme.theme,
        saveTheme: colorTheme.saveTheme,
        locale: localization.locale,
        setLocale: localization.setLocale,
        setTranslation: localization.setTranslation,
        t: localization.t,
    };

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
});