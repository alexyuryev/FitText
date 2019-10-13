import React, {useRef, useState} from "react";
import './FitText.css';

interface FitTextProps {
    children: string,
    tailLength: number,
    title?: string,
    className?: string,
    logId: string
}

const canvas = document.createElement("canvas");
const context = canvas ? canvas.getContext("2d") : null;

function measureTextWidth(text: string, fontStyleValue: string) {
    if (!context) {
        throw new Error('canvas API is not supported');
    }
    context.font = fontStyleValue;
    const metrics = context.measureText(text);
    return metrics.width;
}

function getStyle(element: HTMLElement, style: string) {
    return window.getComputedStyle(element, null).getPropertyValue(style);
}

export const FitText: React.FC<FitTextProps> = (props: FitTextProps) => {
    const rootRef = useRef<HTMLSpanElement>(null);
    const boxWidthRef = useRef<number>(0);
    const [hasOverflow, setHasOverflow] = useState<boolean>(false);
    const {title, children: text, className, tailLength} = props;

    React.useLayoutEffect(() => {
        if (!rootRef.current) {
            throw new Error('no root element ref');
        }

        // Размер контейнера может меняться. Мониторинг и распространение такого события по дереву компонентов оставляем за рамками
        // данного компонента - это вопрос архитектуры всей страницы.
        if (!boxWidthRef.current) {
            boxWidthRef.current = rootRef.current.clientWidth;
        }

        const boxWidth = boxWidthRef.current;

        const fontStyleValue: string = getStyle(rootRef.current, 'font');
        const textWidth = measureTextWidth(text, fontStyleValue);

        //console.log(`layout: textWidth=${textWidth}px, boxWidth=${boxWidth} font: ${fontStyleValue}`);

        setHasOverflow(textWidth > boxWidth);
    }, [text, className]);

    const tail = text.slice(-tailLength);
    const head = text.slice(0, text.length - tailLength);

    return (
        <span className={className + ' fit-text ' + (hasOverflow ? 'fit-text_overflow' : '')}
              title={title} ref={rootRef}>
                <span className='fit-text--head'>{head}</span>
                <span className='fit-text--ellipses'>…</span>
                <span className='fit-text--tail'>{tail}</span>
            </span>
    );
};

export default FitText;
