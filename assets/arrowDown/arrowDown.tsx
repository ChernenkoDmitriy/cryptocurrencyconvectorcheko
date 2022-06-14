import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

interface IProps {
    height?: number,
    width?: number,
    color?: string
};

export const ArrowDown: FC<IProps> = ({ height, width, color }) => (
    <Svg width={width || 10} height={height || 8} viewBox="0 0 7 5" fill="none">
        <Path d="M4.30296 4.41845C3.90314 4.95706 3.09686 4.95706 2.69704 4.41845L0.787639 1.84619C0.297831 1.18635 0.768823 0.250152 1.59059 0.250152L5.40941 0.250152C6.23118 0.250152 6.70217 1.18635 6.21236 1.84619L4.30296 4.41845Z"
            fill={color || "#FF6D87"} />
    </Svg>
);