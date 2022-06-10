import React, { FC } from "react"
import Svg, { Path } from "react-native-svg";

interface IProps {
    width?: number,
    height?: number,
    color?: string
}

export const MultiplyIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg
        style={{
            overflow: "hidden",
        }}
        width={width || 25}
        height={height || 25}
        fill="none"
        viewBox="0 0 1024 1024"
    >
        <Path fill={color || "#000"} d="m572.16 512 268.8-268.373a42.667 42.667 0 1 0-60.587-60.587L512 451.84l-268.373-268.8a42.667 42.667 0 0 0-60.587 60.587L451.84 512l-268.8 268.373a42.667 42.667 0 0 0 0 60.587 42.667 42.667 0 0 0 60.587 0L512 572.16l268.373 268.8a42.667 42.667 0 0 0 60.587 0 42.667 42.667 0 0 0 0-60.587z" />
    </Svg >
)
