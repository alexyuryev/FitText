import React, {Component} from 'react';
import './App.css';
import { longSentence, normalSentence, shortSentence, sourceStrings, translatedStrings } from './test-data/text';
import FitText from "./components/FitText";
import { PerfTable, TwoTextFieldsRecord } from "./PerfTable";

const rowsCount = 2000;

function getRandomRecords(count: number) {
    const offset = Math.floor(count * Math.random());

    return Array.from(
        Array(count).keys(),
        (_v, j: number) => {
            const i = j + offset;

            return {
                id: offset.toString() + '-' + j.toString(), // TODO: id меняется?
                column1: sourceStrings[i % sourceStrings.length],
                column2: translatedStrings[i % translatedStrings.length],
            }
        }
    )
}

interface AppState {
    records: TwoTextFieldsRecord[]
}

interface AppProps {
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.updateTableContent = this.updateTableContent.bind(this);
        this.state = {
            records:  getRandomRecords(rowsCount)
        }
    }

    render() {
        function getInstancesForTailLength(fo: boolean) {
            const tailLength = 5;
            return <>
                <h1>{tailLength}</h1>
                <p>{normalSentence}</p>
                <div className="fixed-width-container width-very-long"><FitText className="full-box-model"
                                                                                tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>
                <div className="fixed-width-container width-long"><FitText className="full-box-model"
                                                                           tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>
                <div className="fixed-width-container width-normal"><FitText className="full-box-model"
                                                                             tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>
                <div className="fixed-width-container width-short"><FitText className="full-box-model"
                                                                            tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>
                <div className="fixed-width-container width-micro"><FitText className="full-box-model"
                                                                            tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>

                <p>{longSentence}</p>
                <div className="fixed-width-container width-very-long"><FitText className="full-box-model"
                                                                                tailLength={tailLength} forceOverflow={fo}>{longSentence}</FitText></div>
                <div className="fixed-width-container width-long"><FitText className="full-box-model" tailLength={tailLength}
                                                                           forceOverflow={fo}>{longSentence}</FitText>
                </div>
                <div className="fixed-width-container width-normal"><FitText className="full-box-model"
                                                                             tailLength={tailLength} forceOverflow={fo}>{longSentence}</FitText></div>
                <div className="fixed-width-container width-short"><FitText className="full-box-model" tailLength={tailLength}
                                                                            forceOverflow={fo}>{longSentence}</FitText>
                </div>
                <div className="fixed-width-container width-micro"><FitText className="full-box-model" tailLength={tailLength}
                                                                            forceOverflow={fo}>{longSentence}</FitText>
                </div>

                <p>{shortSentence}</p>
                <div className="fixed-width-container width-very-long"><FitText className="full-box-model"
                                                                                tailLength={tailLength} forceOverflow={fo}>{shortSentence}</FitText></div>
                <div className="fixed-width-container width-long"><FitText className="full-box-model" tailLength={tailLength}
                                                                           forceOverflow={fo}>{shortSentence}</FitText>
                </div>
                <div className="fixed-width-container width-normal"><FitText className="full-box-model"
                                                                             tailLength={tailLength} forceOverflow={fo}>{shortSentence}</FitText></div>
                <div className="fixed-width-container width-short"><FitText className="full-box-model"
                                                                            tailLength={tailLength} forceOverflow={fo}>{shortSentence}</FitText></div>
                <div className="fixed-width-container width-micro"><FitText className="full-box-model"
                                                                            tailLength={tailLength} forceOverflow={fo}>{shortSentence}</FitText></div>
            </>;
        }

        return (
            <div className="App">
                <div className="row">
                    <div className="column">{getInstancesForTailLength(false)}</div>
                    <div className="column">{getInstancesForTailLength(false)}</div>
                </div>

                <p>Таблица</p>
                <button onClick={this.updateTableContent}>Update table</button>

                <PerfTable records={this.state.records}/>
            </div>
        );
    }

    updateTableContent() {
        this.setState<"records">({
            records: getRandomRecords(rowsCount)
        });
    }
}

export default App;
