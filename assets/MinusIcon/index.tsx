import React, { FC } from "react"
import Svg, { Path } from "react-native-svg";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const MinusIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg
        fill="none"
        width={width || 30}
        height={height || 30}
        viewBox="0 0 1024 1024"
    >
        <Path fill={color || "#000"} d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
    </Svg>
)
