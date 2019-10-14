import React, {useRef, useState} from "react";
import './FitText.css';
import {ellipses, fitTextToWidthWithTail, getFontStyleValue, getStyle, measureTextWidth} from "../utils/utils";

interface FitTextProps {
    children: string,
    tailLength: number,
    title?: string,
    className?: string,
    canCrop?: boolean // true - более производительное решение, но, в общем случае, буква перед многоточием
    // обрезается так, что будет видна только её часть. false - честное нахождение видимой части текста
}

export const FitText: React.FC<FitTextProps> = (props: FitTextProps) => {
    const rootRef = useRef<HTMLSpanElement>(null);
    const clientWidthRef = useRef<number>(0);

    const {title, children: text, className, tailLength, canCrop} = props;

    const [adjustedText, setAdjustedText] = useState<string>(text);
    const [overflowMode, setOverflowMode] = useState<boolean>(false);

    React.useLayoutEffect(() => {
        if (tailLength === 0) {
            setAdjustedText(text);
            return;
        }

        if (!rootRef.current) {
            throw new Error('no root element ref');
        }

        // Размер контейнера может меняться. Мониторинг и распространение такого события по дереву компонентов оставляем за рамками
        // данного компонента - это вопрос архитектуры всей страницы.
        if (!clientWidthRef.current) {
            clientWidthRef.current = rootRef.current.clientWidth;
        }

        const paddingStyleValue: number =
            parseInt(getStyle(rootRef.current, 'padding-left')) +
            parseInt(getStyle(rootRef.current, 'padding-right'));

        const fontStyleValue: string = getFontStyleValue(rootRef.current);
        const boxWidth = clientWidthRef.current - paddingStyleValue;

        if (canCrop) {
            setOverflowMode(measureTextWidth(text, fontStyleValue) > boxWidth);
        } else {
            setAdjustedText(fitTextToWidthWithTail(text, fontStyleValue, boxWidth, tailLength));
        }
    }, [text, className, tailLength, canCrop]);

    if (canCrop && tailLength) {
        const tail = text.slice(-tailLength);
        const head = text.slice(0, text.length - tailLength);

        return (
            <span className={className + ' fit-text ' + (overflowMode ? 'fit-text_head-overflow' : '')}
                  title={title} ref={rootRef}>

                <span className='fit-text--head'>{head}</span>
                <span className='fit-text--ellipses'>{ellipses}</span>
                <span className='fit-text--tail'>{tail}</span>
            </span>
        )
    } else {
        return (
            <span className={className + ' fit-text ' + (!tailLength ? 'fit-text_simple-overflow' : '')}
                  title={title} ref={rootRef}>
            {adjustedText}
        </span>)
    }
};

export default FitText;
