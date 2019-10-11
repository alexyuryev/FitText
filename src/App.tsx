import React from 'react';
import './App.css';
import {longSentence, normalSentence, shortSentence, sourceStrings, translatedStrings} from './test-data/text';
import FitText from "./components/FitText";
import {PerfTable, TwoTextFieldsRecord} from "./PerfTable";

const rowsCount = 2000;
const newRecordsCountPerGeneration = 150;

function getRandomRecords(generation: number, count: number) {
    const offset = generation * newRecordsCountPerGeneration;
    const contentMutation = Math.floor(Math.random() * 1000000000).toString();
    return Array.from(
        Array(count).keys(),
        (_v, j: number) => {
            const i = j + offset;
            const indexInSource = i % sourceStrings.length;
            const repeatValue = Math.floor(i / sourceStrings.length);

            return {
                id: `${indexInSource.toString()}-${repeatValue.toString()}`,
                column1: contentMutation + ' ' + sourceStrings[indexInSource],
                column2: contentMutation + ' ' + translatedStrings[indexInSource],
            }
        }
    )
}

interface AppState {
    records: TwoTextFieldsRecord[]
}

interface AppProps {
}

function getInstancesForTailLength() {
    const tailLength = 5;
    return <>
        <h1>{tailLength}</h1>
        <p>{normalSentence}</p>
        <div className="fixed-width-container width-very-long">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={normalSentence}>{normalSentence}</FitText>
        </div>
        <div className="fixed-width-container width-long">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={normalSentence}>{normalSentence}</FitText>
        </div>
        <div className="fixed-width-container width-normal">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={normalSentence}>{normalSentence}</FitText>
        </div>
        <div className="fixed-width-container width-short">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={normalSentence}>{normalSentence}</FitText>
        </div>
        <div className="fixed-width-container width-micro">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={normalSentence}>{normalSentence}</FitText>
        </div>

        <p>{longSentence}</p>
        <div className="fixed-width-container width-very-long">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={longSentence}>{longSentence}</FitText>
        </div>
        <div className="fixed-width-container width-long">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={longSentence}>{longSentence}</FitText>
        </div>
        <div className="fixed-width-container width-normal">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={longSentence}>{longSentence}</FitText>
        </div>
        <div className="fixed-width-container width-short">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={longSentence}>{longSentence}</FitText>
        </div>
        <div className="fixed-width-container width-micro">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={longSentence}>{longSentence}</FitText>
        </div>

        <p>{shortSentence}</p>
        <div className="fixed-width-container width-very-long">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={shortSentence}>{shortSentence}</FitText>
        </div>
        <div className="fixed-width-container width-long">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={shortSentence}>{shortSentence}</FitText>
        </div>
        <div className="fixed-width-container width-normal">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={shortSentence}>{shortSentence}</FitText>
        </div>
        <div className="fixed-width-container width-short">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={shortSentence}>{shortSentence}</FitText>
        </div>
        <div className="fixed-width-container width-micro">
            <FitText className="full-box-model"
                     tailLength={tailLength}
                     title={shortSentence}>{shortSentence}</FitText>
        </div>
    </>;
}

export class App extends React.Component<AppProps, AppState> {
    private generation = 0;

    constructor(props: AppProps) {
        super(props);
        this.updateTableContent = this.updateTableContent.bind(this);
        this.state = {
            records: getRandomRecords(this.generation, rowsCount)
        }
    }

    render() {
        return (
            <div className="App">
                {/*<div className="row">
                    <div className="column">{getInstancesForTailLength()}</div>
                    <div className="column">{getInstancesForTailLength()}</div>
                </div>*/}

                <p>Таблица</p>
                <button onClick={this.updateTableContent}>Update table</button>

                <PerfTable records={this.state.records}/>
            </div>
        );
    }

    updateTableContent() {
        this.generation += 1;
        this.setState<"records">({
            records: getRandomRecords(this.generation, rowsCount)
        });
    }
}

export default App;
