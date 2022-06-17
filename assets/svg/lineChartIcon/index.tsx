import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { scaleVertical } from "../../../src/utils";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const LineChartIcon: FC<IProps> = ({ height, width, color }) => (
    <Svg height={height || scaleVertical(24)} viewBox="0 0 122 68" width={width || scaleVertical(24)}>
        <Path fill={color || "#000"} d="M2.03 56.52a6.703 6.703 0 0 0-.13 9.49 6.703 6.703 0 0 0 9.49.13l27.65-26.98 23.12 22.31a6.713 6.713 0 0 0 9.49-.18l37.77-38.22v19.27c0 3.72 3.01 6.73 6.73 6.73s6.73-3.01 6.73-6.73V6.71h-.02c0-1.74-.67-3.47-2-4.78a6.674 6.674 0 0 0-5.13-1.91H82.4c-3.72 0-6.73 3.01-6.73 6.73 0 3.72 3.01 6.73 6.73 6.73h17.63L66.7 47.2 43.67 24.97c-2.6-2.5-6.73-2.51-9.33.03L2.03 56.52z" />
    </Svg>
)
