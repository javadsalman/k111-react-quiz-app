import React from 'react'
import { createQuiz, getQuizList, deleteQuiz } from '../../../api/quizApi';
import classNames from 'classnames';

function EditMenu(props) {
  const [quizes, setQuizes] = React.useState([]);
  const [newTitle, setNewTitle] = React.useState('');
  const [warning, setWarning] = React.useState(false)

  const addQuizHandler = React.useCallback(() => {
    if (!newTitle) {
      setWarning(true);
      return
    }
    createQuiz(newTitle).then(response => {
      setQuizes(prev => [...prev, response.data])
      setNewTitle('')
    })
  }, [newTitle])

  const titleChangeHandler = React.useCallback((e) => {
    setWarning(false);
    setNewTitle(e.target.value)
  }, [])

  const deleteQuizHandler = React.useCallback((id) => {
    deleteQuiz(id).then(() => {
      setQuizes(prev => prev.filter(q => q.id !== id))
    })
  }, [])


  React.useEffect(() => {
    getQuizList().then(response => {
      setQuizes(response.data)
    })
  }, [])
  return (
    <div>
      <div className="text-2xl font-bold text-center">Quizes</div>
      <div>
        {
          quizes.map((quiz, index) => {
            const onDeleteQuiz = () => deleteQuizHandler(quiz.id)
            const selectQuiz = () => props.onQuizSelect(quiz.id)
            
            return (
              <div key={quiz.id} className='flex bg-slate-300 p-3 text-xl font-semibold gap-x-5 items-center mb-2'>
                <div className='mr-5'>{index+1}</div>
                <div className='grow'>{quiz.title}</div>
                <div className=''>{quiz.question_count} Questions</div>
                <div onClick={selectQuiz} className='basis-1/12 bg-green-300 text-center p-2 rounded-sm cursor-pointer'>Edit</div>
                <div onClick={onDeleteQuiz} className='basis-1/12 bg-red-300 text-center p-2 rounded-sm cursor-pointer'>Delete</div>
              </div>
            )
          })
        }
        
      </div>
      <div className='flex justify-end'>
        <input value={newTitle} onChange={titleChangeHandler} type="text" className={classNames('text-xl p-2 grow outline-none border ', {'border-stone-400': !warning, 'border-red-600 border-2': warning})} />
        <div onClick={addQuizHandler} className='p-3 bg-sky-600 text-xl font-bold text-white cursor-pointer rounded-sm'>Add Quiz</div>
      </div>
    </div>
  )
}

export default EditMenu