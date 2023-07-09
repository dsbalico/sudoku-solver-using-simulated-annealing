export default {
	board: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
	loading: {
		solve: false,
		easy: false,
		medium: false,
		hard: false,
	},
	openAS: false,
	solved: false,
	notSolved: false,
	iterations: 0,
	maxIter: 500000,
	initTemp: 0.85,
	coolingRate: 0.999,
	reheatTo: 0.65,
	reheatForX: 5000,
}

export interface State {
	board: number[][];
	emptyCells?: [number, number][];
	loading: {
		solve: boolean;
		easy: boolean;
		medium: boolean;
		hard: boolean;
	};
	openAS: boolean;
	solved: boolean;
	notSolved: boolean;
	iterations: number;
	maxIter: number;
	initTemp: number;
	coolingRate: number;
	reheatTo: number;
	reheatForX: number;
}