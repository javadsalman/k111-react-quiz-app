import iaxios from './iaxios'
import type { IQuiz } from '../types';
import { AxiosResponse } from 'axios';

export function getQuiz(quizId: number) {
    return iaxios.get<IQuiz>(`quizes/${quizId}/`)
}


interface IQuestionParameter {
    content: string;
    options: {answer: string; correct: boolean}[]
}
export function createQuestion(question: IQuestionParameter) {
    return iaxios.post('questions/', question)
}

export function deleteQuestion(id: number) {
    return iaxios.delete(`questions/${id}/`)
}

export function changeQuestion(id: number, questionData: IQuestionParameter) {
    return iaxios.put(`questions/${id}/`, questionData)
}

export function sendReport(name: string, quizId: number, count: number, correct: number, wrong: number) {
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

export function createQuiz(title: string) {
    return iaxios.post('quizes/', {title})
}

export function deleteQuiz(id: number) {
    return iaxios.delete(`quizes/${id}/`)
}

export function changeQuizName(id: number, title: string) {
    return iaxios.patch(`quizes/${id}/`, {title})
}