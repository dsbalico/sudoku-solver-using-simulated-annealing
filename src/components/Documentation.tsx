import { useState } from 'react';

function Documentation() {
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  return (
    <section className="mt-8 text-gray-800">
      <h1 className="text-3xl xs:text-4xl font-black dark:text-gray-50">Simulated Annealing</h1>
      <p className="text-gray-500 text-justify dark:text-gray-300">is an optimization algorithm that mimics the process of annealing in metallurgy. It explores different solutions, including worse ones, gradually reducing the acceptance of worse solutions over time. This helps it find the best solution to a problem, even in complex scenarios.</p>
      
      <button onClick={() => setShowExplanation(!showExplanation)} className="underline mt-2 text-gray-500 hover:text-sky-500 transition dark:text-gray-50">Detailed Explanation</button>
      {
        showExplanation ? (
          <div className="p-4 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 rounded-sm border border-dashed">
            <p className="mt-2 tracking-wide text-sm text-justify">Imagine you have a metal object and you want to reshape it into a specific form. If you heat the metal too much, it becomes too soft and loses its shape. On the other hand, if you cool it too quickly, it may get stuck in an undesirable shape. The goal is to heat the metal and then cool it slowly to achieve the desired shape.</p>
            <p className="mt-2 tracking-wide text-sm text-justify">Simulated annealing works in a similar way. It starts with an initial solution to a problem, which may not be the best one. The algorithm then explores nearby solutions by making small changes to the current solution. These changes are like heating the metal in the analogy.</p>
            <p className="mt-2 tracking-wide text-sm text-justify">Next, the algorithm evaluates each new solution and compares it to the current one. If a new solution is better, it becomes the new current solution. But here's the interesting part: even if a new solution is worse, the algorithm still considers it. This is like cooling the metal slowly in the annealing process.</p>
            <p className="mt-2 tracking-wide text-sm text-justify">Sometimes, accepting worse solutions allows the algorithm to escape from <span className='text-yellow-600'>local optima (suboptimal solutions)</span> and explore other parts of the solution space that may contain the <span className='text-sky-600'>global optimum (the best solution)</span>. As the algorithm progresses, it gradually reduces the likelihood of accepting worse solutions, emulating the cooling process.</p>
            <p className="mt-2 tracking-wide text-sm text-justify">Simulated annealing continues this process of exploring and gradually reducing the acceptance of worse solutions until it reaches a stopping criterion. This can be a certain number of iterations or when the algorithm has converged to an acceptable solution.</p>
          </div>
        ):<button onClick={() => setShowExplanation(!showExplanation)} className="h-2 w-full bg-gray-100 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 rounded-sm border border-dashed"></button>
      }
      
      <div className='bg-red-300 dark:bg-red-900 rounded-sm px-4 py-2 mt-2'>
        <h4 className='text-2xl text-red-500 dark:text-red-400 font-bold'>Warning</h4>
        <p className='text-red-500 text-xs dark:text-red-400 tracking-wide text-justify'>In order to prevent the page from becoming unresponsive, it is best to avoid raising the initial temperature and reheating it to extremely high levels. Working at excessively high temperatures will consistently produce suboptimal solutions, and when combined with a high number of iterations, it will significantly prolong the time required to complete the task.</p>
      </div>
    </section>
  )
}

export default Documentation