import React, { FC } from "react"
import Svg, { Path } from "react-native-svg";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const ResetCalculateIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg
        width={width || 35}
        height={height || 35}
        fill="none"
        viewBox="0 0 50 50"
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            fill={color || "#000"}
            d="M31.071 16.929a10 10 0 1 0 0 14.142A2 2 0 1 1 33.9 33.9a14 14 0 1 1 0-19.8 2 2 0 0 1-2.829 2.829Z"
        />
    </Svg>
)
