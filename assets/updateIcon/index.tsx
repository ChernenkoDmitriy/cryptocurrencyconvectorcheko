import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { scaleVertical } from "../../src/utils";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const UpdateIcon: FC<IProps> = ({ height, width, color }) => (
    <Svg height={height || scaleVertical(22)} viewBox="0 0 24 24" width={width || scaleVertical(22)}>
        <Path d="M0 0h24v24H0V0z" fill="none" />
        <Path fill={color || "#000"} d="M12 0 8 4l4 4V5c3.859 0 7 3.14 7 7 0 .88-.17 1.72-.469 2.496l1.516 1.514A8.931 8.931 0 0 0 21 12c0-4.962-4.037-9-9-9V0zM3.953 7.99A8.931 8.931 0 0 0 3 12c0 4.962 4.037 9 9 9v3l4-4-4-4v3c-3.859 0-7-3.14-7-7 0-.88.17-1.72.469-2.496L3.953 7.99z" />
    </Svg>
)
