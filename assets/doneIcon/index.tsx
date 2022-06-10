import React, { FC } from "react"
import Svg, { Path } from "react-native-svg"

export const DoneIcon: FC<{ height?: number; width?: number; color?: string }> = ({ height, width, color }) => (
    <Svg width={height || 24} height={width || 24} viewBox="0 0 24 24" >
        <Path d="M9 19.4l-5.7-5.7 1.4-1.4L9 16.6 20.3 5.3l1.4 1.4z" fill={color || '#000'} />
    </Svg>
)
