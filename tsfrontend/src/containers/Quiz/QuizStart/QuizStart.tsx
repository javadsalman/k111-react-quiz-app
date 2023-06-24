import React from 'react'
import { getQuiz, sendReport } from '../../../api/quizApi'
import Question from '../../../components/Question/Question'
import Timer from '../../../components/Timer/Timer'
import type {IQuestion, IOption } from '../../../types'

interface IEditOption extends IOption {
  status?: null | 'selected' | 'correct' | 'info' | 'wrong'
}

interface IEditQuestion extends IQuestion {
  options: IEditOption[]
}

type IQuestionsState = IEditQuestion[]

const initialState: IQuestionsState = []

const loadQuestionsAction = (state: IQuestionsState, action: {questions: IQuestionsState}) => {
  localStorage.setItem('questions', JSON.stringify(action.questions))
  return action.questions
}

const selectOptionAction = (state: IQuestionsState, action: {questionIndex: number, optionIndex: number}) => {
  const newState = [...state]
  const newQuestion = {...newState[action.questionIndex]}
  const newOptions: IEditOption[] = newQuestion.options.map(option => ({...option, status: null}))
  const newOption: IEditOption = {...newOptions[action.optionIndex], status: 'selected'}
  newOptions[action.optionIndex] = newOption
  newQuestion.options = newOptions
  newState[action.questionIndex] = newQuestion
  localStorage.setItem('questions', JSON.stringify(newState))
  return newState
}

const finishAction = (state: IQuestionsState) => {
  const newState = [];
  for (let question of state) {
    const newQuestion = {...question}
    const newOptions = [];
    const hasSelected = newQuestion.options.some(option => option.status === 'selected')
    for (let option of newQuestion.options) {
      const newOption = {...option}
      if (newOption.correct) {
        if (hasSelected)
          newOption.status = 'correct';
        else
          newOption.status = 'info'
      } else if (newOption.status === 'selected' && !newOption.correct) {
        newOption.status = 'wrong';
      }
      newOptions.push(newOption)
    }
    newQuestion.options = newOptions
    newState.push(newQuestion)
  }
  return newState;
}


const reducer = (state: IQuestionsState, action: any) => {
  switch(action.type) {
    case 'LOAD_QUESTIONS':
      return loadQuestionsAction(state, action);
    case 'SELECT_OPTION':
      return selectOptionAction(state, action);
    case 'FINISH':
      return finishAction(state);
    default:
      return state
  }
}

interface IProps {
  selectedQuizId: number|null;
  name: string;
  onCancel(): void
}

function QuizStart(props: IProps) {
  const [questions, dispatch] = React.useReducer(reducer, initialState)
  const [title, setTitle] = React.useState<string>('')
  const [name, setName] = React.useState<string>(props.name)
  const [selectedQuizId, setSelectedQuizId] = React.useState<number|null>(props.selectedQuizId)
  const [finished, setFinsihed] = React.useState(false);


  React.useEffect(() => {
    if (localStorage.getItem('quizId')) {
      const name = localStorage.getItem('name')!;
      const quizId = +localStorage.getItem('quizId')!
      const questions = JSON.parse(localStorage.getItem('questions')!)
      const quizTitle = localStorage.getItem('quizTitle')!

      setName(name)
      setSelectedQuizId(quizId)
      setTitle(quizTitle)
      dispatch({type: 'LOAD_QUESTIONS', questions: questions})
    } else if (selectedQuizId) {
      getQuiz(selectedQuizId).then(response => {
        localStorage.setItem('quizId', selectedQuizId.toString())
        localStorage.setItem('quizTitle', response.data.title)
        localStorage.setItem('name', name)
        setTitle(response.data.title)
        dispatch({type: 'LOAD_QUESTIONS', questions: response.data.questions})
      })
    }
  }, [selectedQuizId, name])

  const submit = React.useCallback(() => {
    if (finished) return;
    let wrong_count = 0;
    let correct_count = 0;
    for (let question of questions) {
      for (let option of question.options) {
        if (option.status === 'selected' && option.correct) {
          correct_count++
        } else if (option.status === 'selected' && !option.correct) {
          wrong_count++
        }
      }
    }

    sendReport(name, selectedQuizId!, questions.length, correct_count, wrong_count).then(() => {
      localStorage.removeItem('quizId')
      localStorage.removeItem('quizTitle')
      localStorage.removeItem('timer')
      localStorage.removeItem('name')
      localStorage.removeItem('questions')
      dispatch({type: 'FINISH'})
      setFinsihed(true)
    })
  }, [questions, name, selectedQuizId, finished])

  const selectOption = React.useCallback((questionIndex: number, optionIndex: number) => {
    if (finished) return;
    dispatch({type: 'SELECT_OPTION', questionIndex, optionIndex})
  }, [finished])

  const cancelHandler = React.useCallback(() => {
      localStorage.removeItem('quizId')
      localStorage.removeItem('quizTitle')
      localStorage.removeItem('timer')
      localStorage.removeItem('name')
      localStorage.removeItem('questions')
      props.onCancel()
  }, [props])

  return (
    <div className='w-9/12 m-auto'>
      <p className='text-center mb-3 text-2xl font-bold'>{title}</p>
      <div className='grid grid-cols-3 gap-3 mx-auto mb-4 text-center'>
        <div className='bg-slate-300 rounded-sm'>Student: {name}</div>
        <div className='bg-slate-300 rounded-sm'>Question Count: {questions.length}</div>
        <div className='bg-slate-300 rounded-sm'><Timer finished={finished} duration={10} onEnd={submit} /></div>
      </div>
      <div className='flex justify-center flex-wrap'>
        {questions.map((question: IQuestion, index: number) => {
          return (
            <div key={question.id} className='mb-10 w-full'>
              <Question index={index} question={question} selectOption={selectOption}/>
            </div>
          )
        })}
      </div>
      <div>
        {finished || <div onClick={submit} className='w-full py-2 px-3 cursor-pointer text-center rounded-sm text-xl text-white bg-emerald-700 mb-1'>FINISH</div>}
        <div onClick={cancelHandler} className='w-full py-2 px-3 cursor-pointer text-center rounded-sm text-xl text-white bg-rose-700'>CANCEL</div>
      </div>
    </div>
  )
}

export default QuizStart