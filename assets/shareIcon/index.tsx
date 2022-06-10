import React, { FC } from "react"
import Svg, { Path } from "react-native-svg";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const ShareIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg width={width || 26} height={height || 26} fill="none" viewBox="0 0 122 122"  >
        <Path
            stroke={color || "#000"}
            fill={color || "#000"}
            d="M61.44 0A61.46 61.46 0 1 1 18 18 61.21 61.21 0 0 1 61.44 0Zm3.06 75.82L50 69.15a11.82 11.82 0 1 1-1-16.44l15.4-6.43a12.7 12.7 0 0 1-.14-1.85A11.81 11.81 0 0 1 76 32.62a11.82 11.82 0 1 1-7.55 20.88L52.76 60q.08.68.09 1.35l16.31 7.55a11.76 11.76 0 1 1-5 9.6 12.11 12.11 0 0 1 .31-2.68ZM97.89 25A51.54 51.54 0 1 0 113 61.44 51.38 51.38 0 0 0 97.89 25Z" />
    </Svg>
)
