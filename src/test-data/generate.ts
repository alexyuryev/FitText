import {sourceStrings, translatedStrings} from "./text";

const newRecordsCoeffPerGeneration = 0;

export function getRandomRecords(generation: number, count: number) {
    const offset = generation * (count * newRecordsCoeffPerGeneration);
    const contentMutation = Math.floor(Math.pow(10,Math.random() * 20)).toString();
    return Array.apply(null, Array(count)).map((_v, j: number) => {
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