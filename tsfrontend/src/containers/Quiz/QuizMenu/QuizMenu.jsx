import React from 'react'
import useApi from '../../../hooks/useApi'


function QuizMenu(props) {
  const {quizes, loadQuizes} = useApi()

  React.useEffect(() => {
    loadQuizes()
  }, [loadQuizes])
  
  return (
    <div>
      <div className='p-2'>
        { props.warning && <div className='text-red-700'>{props.warning}!</div>}
        <div>First Name & Last Name</div>
        <input type="text" className='w-full p-2'  value={props.name} onChange={props.onNameChange}/>
      </div>
      <div>
        {
          quizes.map((quiz, index) => {
            const startHandler = () => {
              props.onSelectQuiz(quiz.id)
            }
            return (
              <div key={quiz.id} className='flex p-3 items-center mb-2 bg-cyan-700 text-white'>
                <div className='mr-3'>{index+1}</div>
                <div className='grow'>{quiz.title}</div>
                <div>
                  <div className='border border-gray-300 px-3 py-1 cursor-pointer' onClick={startHandler}>Basla</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default QuizMenu