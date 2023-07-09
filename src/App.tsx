import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiErrorAlt } from 'react-icons/bi';
import INITIAL_STATE, { State } from './INITIAL_STATE';
import Darkmode from './components/Darkmode';
import Documentation from './components/Documentation';
import Interactions from './components/Interactions';
import SudokuBoard from './components/SudokuBoard';

function App() {
	const [state, setState] = useState<State>(INITIAL_STATE);

	return (
		<div className='pt-12 dark:bg-gray-800'>
			<h1 className='text-center font-black text-3xl text-gray-800 dark:text-gray-50'><Darkmode /> Sudoku Solver</h1>
			<p className='text-center px-4 lg:px-0 text-gray-500 w-full lg:w-[820px] mx-auto text-xs mt-1'>Please be aware that this solver may not always solve the Sudoku, as it uses <a href="https://en.wikipedia.org/wiki/Simulated_annealing" target='_blank' className='text-sky-500 dark:text-sky-600 hover:underline'>simulated annealing</a> for solving, a local search algorithm.</p>

			<section className='w-full px-4 lg:px-0 lg:w-[820px] mx-auto mt-4'>
				<div className='lg:grid lg:grid-cols-2 gap-2 '>
					<SudokuBoard state={state} setState={setState} />
					<Interactions state={state} setState={setState} />
				</div>
				
				{ // Result Info
					state.notSolved ? (
						<p className='mt-4 bg-gray-100 py-2 rounded-sm text-gray-500 dark:bg-gray-900 flex gap-1 justify-center px-4'>
							<BiErrorAlt className="self-center h-8 w-8 sm:h-4 sm:w-4 text-red-500 dark:text-red-600" />
							<span className='text-xs self-center'>Sudoku board may be invalid or there's is something wrong with my parameters.</span>
						</p>
					) : state.solved ? (
						<p className='mt-4 bg-gray-100 py-2 rounded-sm text-gray-500 dark:bg-gray-900 flex gap-1 justify-center px-4'>
							<AiFillCheckCircle className="self-center h-4 w-4 text-green-500 dark:text-green-600" />
							<span className='text-xs self-center'>Iterations: {state.iterations}</span>
						</p>
					) : <div className='h-2 bg-gray-100 mt-4 dark:bg-gray-900 ml-1'></div>
				}

				<Documentation />
			</section>

			<footer className='py-4 mt-12'>
				<p className='text-center text-gray-800 dark:text-gray-300 text-xs'>
					Made with <span className='text-red-500 dark:text-red-600'>❤️</span> by Daniel Shan Balico - {' '}
					<a className='bg-gray-800 px-2 py-1 text-gray-50 rounded-sm dark:bg-gray-900 hover:bg-gray-700 cursor-pointer dark:hover:bg-gray-950 transition'>⭐ Star me on Github</a>
				</p>
			</footer>
		</div>
	)
}

export default App
