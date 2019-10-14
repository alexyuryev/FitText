export const ellipses = '…';
const canvas = document.createElement("canvas");
const context = canvas ? canvas.getContext("2d") : null;

export function fitTextToWidthWithTail(
    text: string,
    fontStyleValue: string,
    boxWidth: number,
    tailLength: number): string {

    if (!context) {
        throw new Error('canvas API is not supported');
    }

    context.font = fontStyleValue;

    const initialTextWidth = context.measureText(text).width;

    if (initialTextWidth > boxWidth) {
        // Если текст не влезает, значит точно будет многоточие и хвост, поэтому
        // будем решать задачу определения, какая часть "головы" влезет в оставшееся от многоточния и хвоста пространство
        const tail = text.slice(-tailLength);
        const tailWidth = Math.floor(context.measureText(ellipses + tail).width);
        const head = text.slice(0, -tailLength);

        if (tailWidth < boxWidth) {
            const widthLeftForHeadBox = boxWidth - tailWidth;

            return _fitTextToWidth(
                head,
                widthLeftForHeadBox,
                (t: string) => Math.floor(context.measureText(t).width)
            ) + ellipses + tail;
        } else { // даже хвост не влезает, вписываем только начало текста c многоточием
            return _fitTextToWidth(
                text,
                boxWidth,
                (t: string) => Math.floor(context.measureText(t + ellipses).width)
            ) + ellipses;
        }
    } else {
        return text;
    }
}

function _fitTextToWidth(text: string, boxWidth: number, getWidth: (t: string) => number): string { //TODO: хвостовая рекурсия
    if (!text || boxWidth < 4) {
        // Нет смыла работать с пустым текстом и
        // не будем пытаться вписывать что-либо в 3 пикселя - это уменьшает количество замеров, а ушерб небольшой
        return '';
    }

    const textWidth = getWidth(text);

    if (textWidth <= boxWidth) {
        return text; // текст вписывается - отдаём как есть
    } else if (text.length === 1) {
        return ''; // одна буква и она не вписывается
    } else {
        // Апроксимированная граница умещающегося текста (но точная для monospace)
        const splitAt = Math.floor(boxWidth / textWidth * text.length);
        const splitLimited = Math.min(Math.max(1, splitAt), text.length - 1);

        const head = text.slice(0, splitLimited);
        const tail = text.slice(splitLimited);

        const headWidth = getWidth(head);

        // Если вписали голову, то решаем рекурсивно задачу вписывания хвоста в оставшееся от головы пространство
        // иначе, если голова не вписывается, то хвост уже точно не будет отображён -> можем просто его выкинуть
        // и рекурсивно решить задачу для вписывание головы всё в тоже пространство
        return headWidth <= boxWidth ?
            head + _fitTextToWidth(tail, boxWidth - headWidth, getWidth) :
            _fitTextToWidth(head, boxWidth, getWidth);
    }
}

export function getFontStyleValue(element: HTMLElement): string {
    const style = window.getComputedStyle(element, null);

    const font = style.getPropertyValue('font');

    if (!font) {
        const fontStyle = style.getPropertyValue('font-style');
        const fontVariant = style.getPropertyValue('font-variant');
        const fontWeight = style.getPropertyValue('font-weight');
        const fontSize = style.getPropertyValue('font-size');
        const fontFamily = style.getPropertyValue('font-family')
            .split(',').map((f => f.trim().charAt(0) === '-' ? `"${f.trim()}"` : f)).join(',');

        return (`${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`)
            .replace(/ +/g, ' ').trim();
    } else {
        return font;
    }
}

export function getStyle(element: HTMLElement, style: string) {
    return window.getComputedStyle(element, null).getPropertyValue(style);
}

export function measureTextWidth(text: string, fontStyleValue: string) {
    if (!context) {
        throw new Error('canvas API is not supported');
    }
    context.font = fontStyleValue;
    const metrics = context.measureText(text);
    return Math.floor(metrics.width);
}