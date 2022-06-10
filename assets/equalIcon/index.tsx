import React, { FC } from "react"
import Svg, { Path } from "react-native-svg";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const EqualIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg
        width={width || 35}
        height={height || 35}
        fill="none" viewBox="0 0 256 256">
        <Path
            fill={color || "#000"}
            d="M222 160a6 6 0 0 1-6 6H40a6 6 0 0 1 0-12h176a6 6 0 0 1 6 6ZM40 102h176a6 6 0 0 0 0-12H40a6 6 0 0 0 0 12Z" />
    </Svg>
)
