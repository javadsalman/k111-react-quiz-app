import React from 'react';
import { appContext } from '../../App';


function Navbar() {

  const {page, setPage} = React.useContext(appContext)


  let quizClassName = 'px-5 py-2 border border-gray-800 hover:bg-cyan-300 duration-500 cursor-pointer'
  let editClassName = 'px-5 py-2 border border-gray-800 hover:bg-cyan-300 duration-500 cursor-pointer'
  let reportClassName = 'px-5 py-2 border border-gray-800 hover:bg-cyan-300 duration-500 cursor-pointer'

  if (page === 'quiz')
    quizClassName += ' bg-cyan-600';
  else if (page === 'edit')
    editClassName += ' bg-cyan-600';
  else if (page === 'report')
    reportClassName += ' bg-cyan-600';

  
  return (
    <div className='flex justify-center gap-x-6 font-bold'>
        <div className={quizClassName} onClick={() => setPage('quiz')}>Quiz</div>
        <div className={editClassName} onClick={() => setPage('edit')}>Edit</div>
        <div className={reportClassName} onClick={() => setPage('report')}>Report</div>
    </div>
  )
}

export default Navbar