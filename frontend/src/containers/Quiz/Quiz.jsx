import React from 'react'
import QuizMenu from './QuizMenu/QuizMenu'
import QuizStart from './QuizStart/QuizStart'

function Quiz() {
  const [page, setPage] = React.useState('menu')
  const [selectedQuizId, setSelectedQuizId] = React.useState(null)
  const [name, setName] = React.useState('')
  const [warning, setWarning] = React.useState(false)

  const selectQuizHandler = React.useCallback((id) => {
    if (!name) {
      setWarning('Ad hissesi bos buraxila bilmez')
      return
    }
    setSelectedQuizId(id)
    setPage('start')
  }, [name])

  const nameChangeHandler = React.useCallback((e) => {
    setWarning(false)
    setName(e.target.value)
  }, [])

  React.useEffect(() => {
    if (localStorage.getItem('quizId')) {
      setPage('start')
    }
  }, [])

  const backToMenuHandler = React.useCallback(() => {
    setPage('menu');
    setName('')
    setSelectedQuizId(null)
  }, [])

  
  return (
    <div>
      {
        page === 'menu'
        ?
        <QuizMenu name={name} onNameChange={nameChangeHandler} onSelectQuiz={selectQuizHandler} warning={warning}/>
        :
        <QuizStart selectedQuizId={selectedQuizId} name={name} onCancel={backToMenuHandler} />
      }
    </div>
  )
}

export default Quiz