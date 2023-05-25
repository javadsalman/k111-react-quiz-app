import iaxios from './iaxios'

export function getQuestions(quizId) {
    return iaxios.get(`quizes/${quizId}/`)
}

export function createQuestion(question) {
    return iaxios.post('questions/', question)
}

export function deleteQuestion(id) {
    return iaxios.delete(`questions/${id}/`)
}

export function changeQuestion(id, questionData) {
    return iaxios.put(`questions/${id}/`, questionData)
}

export function sendReport(name, quizId, count, correct, wrong) {
    const data = {
        full_name: name,
        quiz: quizId,
        count: count,
        correct_answer: correct,
        wrong_answer: wrong
    }
    return iaxios.post('reports/', data)
}

export function getReports() {
    return iaxios.get('reports/')
}

export function getQuizList() {
    return iaxios.get('quizes/')
}

export function createQuiz(title) {
    return iaxios.post('quizes/', {title})
}

export function deleteQuiz(id) {
    return iaxios.delete(`quizes/${id}/`)
}

export function changeQuizName(id, title) {
    return iaxios.patch(`quizes/${id}/`, {title})
}