import React from 'react'
import { changeQuestion, changeQuizName, createQuestion, deleteQuestion, getQuestions } from '../../../api/quizApi'
import EditQuestion from './EditQuestion/EditQuestion'
import { getId } from '../../../shared/utils/uniqueId'

function EditQuiz(props) {
  const [quiz, setQuiz] = React.useState({})
  const [quizTitle, setQuizTitle] = React.useState('')

  React.useEffect(() => {
    getQuestions(props.quizId).then(response => {
      setQuiz(response.data)
      setQuizTitle(response.data.title)
    })
  }, [props.quizId])

  const deleteQuestionHandler = React.useCallback((id) => {
    deleteQuestion(id).then(response => {
      setQuiz(prev => ({...prev, questions: prev.questions.filter(q => q.id !== id)}))
    })
  }, [])

  const changeQuestionHandler = React.useCallback((questionData) => {
    questionData.quiz = props.quizId
    changeQuestion(questionData.id, questionData).then(response => {
      setQuiz(prev => {
        const questionIndex = prev.questions.findIndex(q => q.id === response.data.id)
        const newQuestions = [...prev.questions]
        newQuestions[questionIndex] = response.data
        return {...prev, questions: newQuestions}
      })
    })
  }, [props.quizId])

  const changeQuizNameHandler = () => {
    changeQuizName(props.quizId, quizTitle)
  }

  const addQuestionHandler = React.useCallback(() => {
    const newQuestion = {
      quiz: props.quizId,
      content: 'New Question Content',
      options_data: [
        {answer: 'New Option 1', correct: true},
        {answer: 'New Option 1', correct: false},
      ]
    }
    createQuestion(newQuestion).then(response => {
        setQuiz(prev => {
          prev.questions = [...prev.questions, response.data]
          return {...prev}
        })
    })
  }, [props.quizId])

  return (
    <div>
      <div className='flex justify-center p-3'>
        <input value={quizTitle} onChange={e => setQuizTitle(e.target.value)} className='text-xl outline-none border' />
        <div onClick={changeQuizNameHandler} className='bg-green-500 p-1 px-5 font-bold cursor-pointer'>Save</div>
      </div>
      <div>
        {quiz.questions && quiz.questions.map((question, index) => {
          const onDelete = () => deleteQuestionHandler(question.id)
          return (
            <div key={question.id} className='w-7/12 m-auto mb-5'>
              <EditQuestion question={question} onChangeQuestion={changeQuestionHandler} index={index} onDelete={onDelete} />
            </div>
          )
        })}
      <div className='flex justify-center'>
        <div onClick={addQuestionHandler} className='bg-gray-300 font-bold p-3 rounded cursor-pointer'>Add Question</div>
      </div>
      </div>
    </div>
  )
}

export default EditQuiz