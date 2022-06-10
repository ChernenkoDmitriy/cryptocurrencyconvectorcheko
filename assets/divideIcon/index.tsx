import React, { FC } from "react"
import Svg, { Path } from "react-native-svg";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const DivideIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg
        width={width || 30}
        height={height || 30}
        fill="none"
        viewBox="0 0 50 50"
    >
        <Path
            stroke={color || "#000"}
            fill={color || "#000"}
            d="M22 10.5c-1.5 1.8-1 4.5 1.3 5.9 3.4 2.2 7.3-2.7 4.7-5.9-1.6-1.9-4.4-1.9-6 0zM9 25c0 1.9.7 2 16 2s16-.1 16-2-.7-2-16-2-16 .1-16 2zM22 34.5c-2.6 3.2 1.3 8.1 4.8 5.9.9-.6 1.8-1.9 2-2.8.8-3.8-4.3-6.1-6.8-3.1z" />
    </Svg>
)
