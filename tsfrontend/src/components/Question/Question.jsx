import React from "react";
import classNames from 'classnames'

function Question(props) {
   return (
      <div className="w-full bg-slate-200 p-3 relative rounded-sm">
         <div className="flex">
            <div className="font-bold mr-2">{props.index + 1}.</div>
            <div className="mb-2 grow">{props.question.content}</div>
         </div>
         <div>
            {props.question.options.map((option, index) => {
               const optionLetter = String.fromCharCode(65 + index);
               const selectOption = () => {
                  props.selectOption(props.index, index)
               }
               return (
                  <div key={option.id} className={classNames(
                     "mb-2  p-2 rounded-sm cursor-pointer",
                     {'bg-slate-300': !option.status},
                     {'bg-slate-400': option.status === 'selected'},
                     {'bg-emerald-500': option.status === 'correct'},
                     {'bg-rose-600': option.status === 'wrong'},
                     {'bg-yellow-500': option.status === 'info'},
                     )}
                     onClick={selectOption}>
                     <strong className="mr-2">{optionLetter})</strong>
                     <span>{option.answer}</span>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Question;
