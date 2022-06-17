import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { scaleVertical } from "../../../src/utils";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const ChartIcon: FC<IProps> = ({ height, width, color }) => (
    <Svg height={height || scaleVertical(22)} viewBox="0 0 135 122" width={width || scaleVertical(22)}>
        <Path fill={color || "#000"} d="M65.62 14.08h20.23a2 2 0 0 1 2 2v79.48a2 2 0 0 1-2 2H65.62a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2Zm69.8 108.8H9.93A9.89 9.89 0 0 1 0 113V0h12.69v110.19h122.73v12.69ZM103.05 53.8h20.23a2 2 0 0 1 2 2v39.76a2 2 0 0 1-2 2h-20.23a2 2 0 0 1-2-2V55.75a2 2 0 0 1 2-2ZM28.19 29.44h20.23a2 2 0 0 1 1.95 1.95v64.17a2 2 0 0 1-1.95 2H28.19a2 2 0 0 1-2-2V31.39a2 2 0 0 1 2-1.95Z" />
    </Svg>
)
