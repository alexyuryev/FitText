import React from "react";
import FitText from "./components/FitText";

export interface TwoTextFieldsRecord {
	column1: string;
	column2: string;
	id: string;
}

interface PerfTableProps {
	records: TwoTextFieldsRecord[];
	tailLength: number;
	canCrop: boolean;
	name: string;
}

export class PerfTable extends React.Component<PerfTableProps> {
	render() {
		const {tailLength, canCrop} = this.props;
		const rows = this.props.records.map((v: TwoTextFieldsRecord) => (
			<tbody key={v.id}><tr>
				<td>{v.id}</td>
				<td><FitText
                    className="full-box-model"
					tailLength={tailLength}
					title={'full:' + v.column1}
					canCrop={canCrop}>{v.column1}</FitText></td>
				<td><FitText
					className="full-box-model"
					tailLength={tailLength}
					title={'full:' + v.column2}
					canCrop={canCrop}>{v.column2}</FitText></td>
			</tr></tbody>
			)
		);

		return (
			<div>
				<table className="lyrics-translation">
					<thead><tr><th>Key</th><th>Source</th><th>Translation</th></tr></thead>
					{rows}
				</table>
			</div>
		);
	}

	UNSAFE_componentWillMount() {
		window.performance.mark(this.props.name)
	}

	componentDidMount() {
		performance.measure("render", this.props.name);
		this.log(`mount: ${performance.getEntriesByType("measure")[0].duration.toString()}ms`);
		performance.clearMarks(this.props.name);
		performance.clearMeasures();
	}

	UNSAFE_componentWillUpdate() {
		window.performance.mark(this.props.name)
	}

	componentDidUpdate(prevProps: Readonly<PerfTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
		performance.measure("update", this.props.name);
		this.log(`update: ${performance.getEntriesByType("measure")[0].duration.toString()}ms`);
		performance.clearMarks(this.props.name);
		performance.clearMeasures();
	}

	private log(s: string) {
		console.log(this.props.name, s);
	}
}