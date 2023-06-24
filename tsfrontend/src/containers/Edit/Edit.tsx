import React from 'react'
import EditMenu from './EditMenu/EditMenu'
import EditQuiz from './EditQuiz/EditQuiz'

function Edit() {
  const [page, setPage] = React.useState<string>('menu');
  const [selectedQuizId, setSelectedQuizId] = React.useState<number|null>(null)

  const switchEditQuiz = React.useCallback((id: number) => {
    setPage('edit')
    setSelectedQuizId(id)
  }, [])


  return (
    <div>
      {
        page === 'menu'
        ?
        <EditMenu onQuizSelect={switchEditQuiz} />
        :
        <EditQuiz quizId={selectedQuizId} />
      }
    </div>
  )
}

export default Edit