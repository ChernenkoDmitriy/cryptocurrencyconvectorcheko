import React, { FC } from "react"
import Svg, { Path } from "react-native-svg";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const ArrowBackIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg width={width || "18"} height={height || "16"} fill="none" viewBox="0 0 18 16"  >
            <Path d="M7 1l-6 6 6 6" stroke={color || "#000"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
)
