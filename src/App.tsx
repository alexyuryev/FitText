import React from 'react';
import './App.css';
import {longSentence, normalSentence, shortSentence} from './test-data/text';
import FitText from "./components/FitText";
import {PerfTable, TwoTextFieldsRecord} from "./PerfTable";
import {getRandomRecords} from "./test-data/generate";

const rowsCount = 2000;

interface AppState {
    records: TwoTextFieldsRecord[];
    canCrop: boolean;
    tailLength: number;
}

interface AppProps {
}

const boxSizes = ["width-very-long", "width-long", "width-normal", "width-short", "width-micro", "width-nano", "width-pico"];

const sample = (boxSize: string, tailLength: number, text: string) => (
    <div className={"fixed-width-container " + boxSize} key={boxSize}>
        <FitText className="full-box-model"
                 tailLength={tailLength}
                 title={text}>{text}</FitText>
    </div>
);

const getSamplesPerTailLength = (tailLength: number) => (
    <div>
        <h1>{tailLength}</h1>
        <p>{normalSentence}</p>
        {boxSizes.map((w) => sample(w, tailLength, normalSentence))}
        <p>{longSentence}</p>
        {boxSizes.map((w) => sample(w, tailLength, longSentence))}
        <p>{shortSentence}</p>
        {boxSizes.map((w) => sample(w, tailLength, shortSentence))}
    </div>
);

export class App extends React.Component<AppProps, AppState> {
    private generation = 0;

    constructor(props: AppProps) {
        super(props);
        this.updateRecords = this.updateRecords.bind(this);
        this.toggleCrop = this.toggleCrop.bind(this);
        this.switchTailLength = this.switchTailLength.bind(this);
        this.state = {
            records: getRandomRecords(this.generation, rowsCount),
            canCrop: false,
            tailLength: 0
        }
    }

    render() {
        return (
            <div className="App">
                <h1>FitText test page</h1>
                {<div className="row">
                    <div className="column">{getSamplesPerTailLength(0)}</div>
                    <div className="column">{getSamplesPerTailLength(1)}</div>
                    <div className="column">{getSamplesPerTailLength(3)}</div>
                    <div className="column">{getSamplesPerTailLength(5)}</div>
                    <div className="column">{getSamplesPerTailLength(10)}</div>
                </div>}

                <p>Таблица</p>

                {<div className="row">
                    <div className="column">
                        <h1>{rowsCount} rows, canCrop={this.state.canCrop ? 'true' : 'false'}, tailLength={this.state.tailLength}</h1>
                        <button onClick={this.updateRecords}>Update table</button>
                        <button onClick={this.toggleCrop}>Toggle cropMode</button>
                        <button onClick={this.switchTailLength}>Switch tailLength</button>
                        <PerfTable records={this.state.records} tailLength={this.state.tailLength} canCrop={this.state.canCrop} name="full"/>
                    </div>
                </div>}
            </div>
        );
    }

    updateRecords() {
        this.generation += 1;
        this.setState({
            records: getRandomRecords(this.generation, rowsCount)
        });
    }

    toggleCrop() {
        this.setState((s) => ({
            canCrop: !s.canCrop
        }));
    }

    switchTailLength() {
        this.setState((s) => ({
            tailLength: s.tailLength + 2
        }));
    }
}

export default App;
