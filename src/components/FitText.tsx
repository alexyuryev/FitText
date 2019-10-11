import React, { Component } from "react";
import './FitText.css';

interface FitTextProps {
    children: string,
    tailLength: number,
    title?: string,
    className?: string
}

export class FitText extends Component<FitTextProps> {
    constructor(props: FitTextProps) {
        super(props);
        this.rootRef = React.createRef();
    }

    render() {
        const { title, children, className, tailLength } = this.props;
        const text = children as String;
        const hasTail = text.length > tailLength; //TODO:
        const tail = text.slice(-tailLength);
        const head = text.slice(0, text.length - tailLength);

        return (
            <span className={className + ' fit-text'} title={title} ref={this.rootRef}>
                <span className='fit-text--head'>{head}</span>
                <span className='fit-text--ellipses'>…</span>
                <span className='fit-text--tail'>{tail}</span>
            </span>
            );
    }

    componentDidMount() {
        this.updateOverflow();
        /*<span className={className + ' fit-text'} title={title} ref={this.rootRef}>
                <span className='fit-text--head'>{head}</span>
                <span className='fit-text--ellipses'>…</span>
                <span className='fit-text--tail'>{tail}</span>
            </span>*/
    }

    componentDidUpdate(prevProps: Readonly<FitTextProps>, prevState: Readonly<{}>, snapshot?: any): void {
        this.updateOverflow();
    }

    private updateOverflow() {
        const rootElement = this.rootRef.current;

        if (!rootElement) {
            throw new Error('no root element')
        }

        if (!rootElement.parentElement) {
            throw new Error('no parent element')
        }

        const parentElement = rootElement.parentElement;
        const contentWidth = parentElement.scrollWidth;
        const availableWidth = parentElement.clientWidth;

       /* if (contentWidth > availableWidth) {
            rootElement.classList.add('fit-text_overflow');
        }*/
    }

    private rootRef: React.RefObject<HTMLSpanElement>;
}

export default FitText;