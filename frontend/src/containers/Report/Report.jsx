import React from 'react'
import { getReports } from '../../api/quizApi'
import classNames from 'classnames'

function Report() {
  const [reports, setReports] = React.useState([])

  React.useEffect(() => {
    getReports().then(response => {
      setReports(response.data)
    })
  }, [])

  return (
    <div className='mt-5'>
      <div className='mb-3 text-center text-2xl font-bold'>Reports</div>
      <div className='grid grid-cols-[auto_auto_auto_auto_auto_auto_auto]'>
          <div className='bg-slate-400 px-2 py-1 border border-slate-600'>#</div>
          <div className='bg-slate-400 px-2 py-1 border border-slate-600'>Name</div>
          <div className='bg-slate-400 px-2 py-1 border border-slate-600'>Quiz Title</div>
          <div className='bg-slate-400 px-2 py-1 border border-slate-600'>Count</div>
          <div className='bg-slate-400 px-2 py-1 border border-slate-600'>Correct Answers</div>
          <div className='bg-slate-400 px-2 py-1 border border-slate-600'>Wrong Answers</div>
          <div className='bg-slate-400 px-2 py-1 border border-slate-600'>Empty Answers</div>
          {reports.map((report, index) => {
            return (
              <React.Fragment key={report.id}>
                <div className={classNames('px-2 py-1 border border-slate-600', {'bg-slate-200': index%2})}>{index+1}</div>
                <div className={classNames('px-2 py-1 border border-slate-600', {'bg-slate-200': index%2})}>{report.full_name}</div>
                <div className={classNames('px-2 py-1 border border-slate-600', {'bg-slate-200': index%2})}>{report.quiz_title}</div>
                <div className={classNames('px-2 py-1 border border-slate-600', {'bg-slate-200': index%2})}>{report.count}</div>
                <div className={classNames('px-2 py-1 border border-slate-600', {'bg-slate-200': index%2})}>{report.correct_answer}</div>
                <div className={classNames('px-2 py-1 border border-slate-600', {'bg-slate-200': index%2})}>{report.wrong_answer}</div>
                <div className={classNames('px-2 py-1 border border-slate-600', {'bg-slate-200': index%2})}>{report.count - (report.correct_answer + report.wrong_answer)}</div>
              </React.Fragment>
            )
          })}
      </div>
    </div>
  )
}

export default Report