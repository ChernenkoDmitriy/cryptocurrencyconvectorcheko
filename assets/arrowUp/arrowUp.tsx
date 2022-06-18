import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

interface IProps {
    height?: number,
    width?: number,
    color?: string
};

export const ArrowUp: FC<IProps> = ({ height, width, color }) => (
    <Svg width={width || 10} height={height || 8} viewBox="0 0 7 5" fill="none">
        <Path d="M2.69704 0.581855C3.09686 0.0432406 3.90314 0.0432401 4.30296 0.581854L6.21236 3.15411C6.70217 3.81396 6.23118 4.75015 5.40941 4.75015H1.59059C0.76882 4.75015 0.29783 3.81396 0.787638 3.15411L2.69704 0.581855Z"
            fill={color || "#099500"} />
    </Svg>
);