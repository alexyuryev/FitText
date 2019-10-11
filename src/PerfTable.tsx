import React from "react";
// import Perf from 'react-addons-perf';
import FitText from "./components/FitText";

export interface TwoTextFieldsRecord {
	column1: string;
	column2: string;
	id: string;
}

interface PerfTableProps {
	records: TwoTextFieldsRecord[];
}

export class PerfTable extends React.Component<PerfTableProps> {
	render() {
		const rows = this.props.records.map((v: TwoTextFieldsRecord) => (
			<tbody key={v.id}><tr>
				<td>{v.id}</td>
				<td><FitText
					className="full-box-model"
					tailLength={5}
					title={'full:' + v.column1}>{v.column1}
				</FitText></td>
				<td><FitText
					className="full-box-model"
					tailLength={5}
					title={'full:' + v.column2}>{v.column2}
				</FitText></td>
			</tr></tbody>
			)
		);

		return (
			<table className="lyrics-translation">
				{rows}
			</table>
		);
	}

	UNSAFE_componentWillMount() {
		//window.performance.mark('App')
	}

	componentDidMount() {
		/*performance.measure("render", 'App');
		console.log(performance.getEntriesByType("measure")[0].duration);
		performance.clearMarks();
		performance.clearMeasures();*/
	}

	UNSAFE_componentWillUpdate() {
		window.performance.mark('PerfTableUpdate')
	}

	componentDidUpdate(prevProps: Readonly<PerfTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
		performance.measure("update", 'PerfTableUpdate');
		console.log('update time:', performance.getEntriesByType("measure")[0].duration);
		performance.clearMarks();
		performance.clearMeasures();
	}
}