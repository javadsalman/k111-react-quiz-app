export interface IOption {
   id: number;
   answer: string;
   correct: boolean;
}

export interface IQuestion {
   id: number;
   content: string;
   options: IOption[];
}

export interface IQuiz {
    id: number,
    title: string,
    questions: IQuestion[]
}