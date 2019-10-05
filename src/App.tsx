import React, {Component} from 'react';
import Perf from 'react-addons-perf'; // ES6
import './App.css';
import {longSentence, normalSentence, shortSentence, sourceStrings, translatedStrings} from './test-data/lyrics';
import FitText from "./components/FitText";

export class App extends Component {
    render() {
        const rowsCount = 3000;
        const rows = Array.from(
            Array(rowsCount).keys(),
            (_v, i: number) => <tbody><tr>
                <td>{i}</td>
                <td><FitText forceOverflow={true} tailLength={5}>{sourceStrings[i % sourceStrings.length]}</FitText>
                </td>
                <td><FitText forceOverflow={false}
                             tailLength={5}>{translatedStrings[i % translatedStrings.length]}</FitText></td>
            </tr></tbody>
        );

        function getInstancesForTailLength(fo: boolean) {
            const tailLength = 5;
            return <>
                <h1>{tailLength}</h1>
                <p>{normalSentence}</p>
                <div className="fixed-width-container width-very-long"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>
                <div className="fixed-width-container width-long"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>
                <div className="fixed-width-container width-normal"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>
                <div className="fixed-width-container width-short"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>
                <div className="fixed-width-container width-micro"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{normalSentence}</FitText></div>

                <p>{longSentence}</p>
                <div className="fixed-width-container width-very-long"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{longSentence}</FitText></div>
                <div className="fixed-width-container width-long"><FitText tailLength={tailLength}
                                                                           forceOverflow={fo}>{longSentence}</FitText>
                </div>
                <div className="fixed-width-container width-normal"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{longSentence}</FitText></div>
                <div className="fixed-width-container width-short"><FitText tailLength={tailLength}
                                                                            forceOverflow={fo}>{longSentence}</FitText>
                </div>
                <div className="fixed-width-container width-micro"><FitText tailLength={tailLength}
                                                                            forceOverflow={fo}>{longSentence}</FitText>
                </div>

                <p>{shortSentence}</p>
                <div className="fixed-width-container width-very-long"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{shortSentence}</FitText></div>
                <div className="fixed-width-container width-long"><FitText tailLength={tailLength}
                                                                           forceOverflow={fo}>{shortSentence}</FitText>
                </div>
                <div className="fixed-width-container width-normal"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{shortSentence}</FitText></div>
                <div className="fixed-width-container width-short"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{shortSentence}</FitText></div>
                <div className="fixed-width-container width-micro"><FitText
                    tailLength={tailLength} forceOverflow={fo}>{shortSentence}</FitText></div>
            </>;
        }

        return (
            <div className="App">
                <div className="row">
                    <div className="column">{getInstancesForTailLength(false)}</div>
                    <div className="column">{getInstancesForTailLength(true)}</div>
                </div>

                <p>Таблица</p>
                <table className="lyrics-translation">
                    {rows}
                </table>
            </div>
        );
    }

    UNSAFE_componentWillMount() {
        window.performance.mark('App')
    }

    componentDidMount() {
        performance.measure("render", 'App');
        console.log(performance.getEntriesByType("measure")[0].duration);
        performance.clearMarks();
        performance.clearMeasures();
    }
}

export default App;
