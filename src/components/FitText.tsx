import React from "react";
import './FitText.css';

interface FitTextProps {
    tailLength: number,
    title?: string,
    className?: string,
    forceOverflow: boolean,
}

const FitText: React.FC<FitTextProps> = (props) => {
    const {title, children, className, tailLength, forceOverflow} = props;
    const text = children as String;
    const hasTail = text.length > tailLength;
    const tail = text.slice(-tailLength);
    const head = text.slice(0, text.length - tailLength);

    return (
        <span className={className + ' fit-text' + (forceOverflow ? ' fit-text--overflow' : '')} title={title}>
            <span className='fit-text--head'>{head}</span>
            <span className='fit-text--ellipses'>…</span>
            <span className='fit-text--tail'>{tail}</span>
        </span>);
};

export default FitText;