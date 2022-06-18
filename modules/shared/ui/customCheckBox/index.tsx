import React, { FC, useMemo } from 'react';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';
 import { getStyle } from './styles';
 
interface Props {
    colors: IColors;
    value: boolean;
    onChoose: () => void
}

export const CustomCheckBox: FC<Props> = ({ colors, onChoose, value }) => {
    const styles = useMemo(() => getStyle(colors), [colors]);

    return ( null
        // <CheckBox
        //     hitSlop={{ right: 40, left: 40, top: 40, bottom: 40 }}
        //     disabled={false}
        //     value={value}
        //     onValueChange={onChoose}
        //     tintColors={{ true: colors.accentColorLight }}
        //     tintColor={colors.inactiveText}
        //     boxType={'square'}
        //     style={styles.checkBox}
        // />
    );
}
