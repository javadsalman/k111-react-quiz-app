import classNames from "classnames";
import React from "react";
import { BsFillCheckCircleFill, BsFillSendCheckFill, BsFillTrashFill, BsPlusCircleFill } from "react-icons/bs";
import { getId } from "../../../../shared/utils/uniqueId";

const LOAD_QUESTION = 'LOAD_QUESTION'
const CHANGE_CONTENT = 'CHANGE_CONTENT'
const CHANGE_OPTION = 'CHANGE_OPTION'
const SELECT_CORRECT = 'SELECT_CORRECT'
const DELETE_OPTION = 'DELETE_OPTION'
const ADD_OPTION = 'ADD_OPTION'

const initialOptions = {
   content: '',
   options: [],
   changed: false,
}

const changeOptionAction = (state, action) => {
   const newState = {...state, changed: true}
   const newOptions = [...newState.options]
   const newOption = {...newOptions[action.index], answer: action.answer}
   newOptions[action.index] = newOption
   newState.options = newOptions
   return newState
}

const selectCorrectAction = (state, action) => {
   const newOptions = state.options.map((o, i) => ({...o, correct: action.index === i}))
   return {...state, changed: true, options: newOptions}
}

const deleteOptionAction = (state, action) => {
   const newState = {...state, changed: true}
   if (newState.options.length < 3) {
      return state
   }
   const newOptions = [...newState.options]
   const deletedArray = newOptions.splice(action.index, 1)
   const deletedOption = deletedArray[0]
   if (deletedOption.correct) {
      newOptions[0] = {...newOptions[0], correct: true}
   }
   newState.options = newOptions
   return newState
}

const addOptionAction = (state, action) => {
   return {
      ...state, 
      changed: true, 
      options: [...state.options, {id: getId(), answer: 'New Option', correct: false}]
   }
}

const reducer = (state, action) => {
   switch(action.type) {
      case LOAD_QUESTION:
         return action.question;
      case CHANGE_CONTENT:
         return {...state, content: action.content, changed: true};
      case CHANGE_OPTION:
         return changeOptionAction(state, action);
      case SELECT_CORRECT:
         return selectCorrectAction(state, action);
      case DELETE_OPTION:
         return deleteOptionAction(state, action);
      case ADD_OPTION:
         return addOptionAction(state, action);
      default:
         return state
   }
}

function EditQuestion(props) {
   const [question, dispatch] = React.useReducer(reducer, initialOptions);
   const textAreaRef = React.useRef()

   const changeContentHandler = React.useCallback((e) => {
      dispatch({type: CHANGE_CONTENT, content: e.target.value})
   }, [])

   React.useEffect(() => {
      dispatch({type: LOAD_QUESTION, question: props.question})
   }, [props.question])

   React.useEffect(() => {
      const textAreaEl = textAreaRef.current
      if (textAreaEl) {
         textAreaEl.style.height = '1px';
         textAreaEl.style.height = textAreaEl.scrollHeight + 'px';
      }
   }, [textAreaRef, question.content])

   const saveQuestion = React.useCallback(() => {
      const questionData = {
         id: props.question.id,
         content: question.content,
         options_data: question.options.map(option => ({answer: option.answer, correct: option.correct}))
      }
      props.onChangeQuestion(questionData)
   }, [props, question])

   return (
      <div className="w-full bg-slate-300 p-3 pl-1 rounded relative">
         <div onClick={props.onDelete} className="self-center absolute right-[-20px] top-[-10px] text-2xl  border p-2 rounded-full bg-red-600 text-white cursor-pointer"><BsFillTrashFill /></div>
         { question.changed && <div onClick={saveQuestion} className="self-center absolute right-[-20px] bottom-0 text-2xl  border p-2 rounded-full bg-green-600 text-white cursor-pointer"><BsFillSendCheckFill /></div>}
         <div className="flex mb-3">
            <div className="w-8 text-center text-xl font-bold">{props.index+1}</div>
            <textarea
               type="text"
               className="resize-none w-full rounded p-3 outline-none"
               value={question.content}
               onChange={changeContentHandler}
               ref={textAreaRef}
            />
         </div>
         <div>
            {question.options.map((option, index) => {
               const onOptionChange = e => dispatch({type: CHANGE_OPTION, index: index, answer: e.target.value})
               const onCheckedClick = e => dispatch({type: SELECT_CORRECT, index: index})
               const onOptionDelete = e => dispatch({type: DELETE_OPTION, index: index})
               return (
                  <div key={option.id} className="flex items-center mb-3">
                     <span className="w-8 text-center">{String.fromCharCode(index+65)})</span>
                     <input value={option.answer} onChange={onOptionChange} type="text" className="w-full rounded p-1 outline-none mr-2" />
                     <div onClick={onCheckedClick} className={classNames("cursor-pointer mr-2", {'text-green-600': option.correct})}>
                        <BsFillCheckCircleFill />
                     </div>
                     <div onClick={onOptionDelete} className="text-red-500 cursor-pointer"><BsFillTrashFill /></div>
                  </div>
               )
            })}
            <div onClick={() => dispatch({type: ADD_OPTION})} className="flex justify-center text-3xl text-gray-600 cursor-pointer">
               <BsPlusCircleFill />
            </div>
         </div>
      </div>
   );
}

export default EditQuestion;
