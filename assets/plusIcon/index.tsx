import React, { FC } from "react"
import Svg, { Path } from "react-native-svg";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const PlusIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg
        fill="none"
        width={width || 25}
        height={height || 25}
        viewBox="0 0 1024 1024"
    >
        <Path fill={color || "#000"} d="M914.05 467.62H554.93V108.498c0-24.334-19.726-44.029-44.033-44.029-24.303 0-44.031 19.695-44.031 44.03V467.62H107.743c-24.303 0-44.03 19.729-44.03 44.032 0 24.337 19.727 44.034 44.03 44.034h359.123v359.119c0 24.335 19.728 44.032 44.031 44.032 24.307 0 44.032-19.697 44.032-44.032V555.686h359.12c24.306 0 44.032-19.697 44.032-44.034.001-24.303-19.726-44.032-44.032-44.032z" />
    </Svg>
)
