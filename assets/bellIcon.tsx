import React, { FC } from "react"
import Svg, { Path } from "react-native-svg";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const BellIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg width={width || 14}
        height={height || 14}
        fill="none"
        viewBox="0 0 20 20">

        <Path
            fill={color || "#000"}
            d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z" />
    </Svg>
)
