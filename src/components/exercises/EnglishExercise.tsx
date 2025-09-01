import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, BookOpen, Lightbulb } from "lucide-react";

interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'drag-drop';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'Which word is a synonym for "happy"?',
    options: ['Sad', 'Joyful', 'Angry', 'Tired'],
    correctAnswer: 'Joyful',
    explanation: 'Joyful means feeling great pleasure and happiness.',
    hint: 'Think about words that mean the same as feeling good!'
  },
  {
    id: '2',
    type: 'fill-blank',
    question: 'Complete the sentence: The cat _____ on the mat.',
    correctAnswer: 'sat',
    explanation: 'Past tense of "sit" is "sat".',
    hint: 'What did the cat do in the past?'
  },
  {
    id: '3',
    type: 'multiple-choice',
    question: 'What is the plural form of "child"?',
    options: ['Childs', 'Children', 'Childes', 'Child'],
    correctAnswer: 'Children',
    explanation: 'Children is the irregular plural form of child.',
    hint: 'This is an irregular plural - it doesn\'t follow normal rules!'
  }
];

export const EnglishExercise = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(sampleQuestions.length).fill(false));

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  const handleAnswer = () => {
    setShowResult(true);
    if (selectedAnswer === question.correctAnswer) {
      if (!answeredQuestions[currentQuestion]) {
        setScore(score + 1);
        const newAnswered = [...answeredQuestions];
        newAnswered[currentQuestion] = true;
        setAnsweredQuestions(newAnswered);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
      setShowHint(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setShowHint(false);
    setScore(0);
    setAnsweredQuestions(new Array(sampleQuestions.length).fill(false));
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-english/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-english" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">English Practice</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {sampleQuestions.length}</p>
            </div>
          </div>
          <Badge variant="outline" className="border-english text-english">
            Score: {score}/{sampleQuestions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
          {question.type === 'fill-blank' && (
            <CardDescription>Type your answer in the text box below</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type === 'multiple-choice' && question.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "english" : "outline"}
                  className="h-auto p-4 text-left justify-start"
                  onClick={() => setSelectedAnswer(option)}
                  disabled={showResult}
                >
                  <span className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </Button>
              ))}
            </div>
          )}

          {question.type === 'fill-blank' && (
            <div className="space-y-3">
              <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-english focus:border-transparent"
                placeholder="Type your answer here..."
                disabled={showResult}
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleAnswer}
              disabled={!selectedAnswer || showResult}
              variant="english"
            >
              Submit Answer
            </Button>
            
            {question.hint && !showResult && (
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10"
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
            )}
          </div>

          {showHint && question.hint && (
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm">{question.hint}</p>
              </div>
            </div>
          )}

          {showResult && (
            <div className={`p-4 rounded-lg border ${
              isCorrect 
                ? 'bg-secondary/10 border-secondary/20' 
                : 'bg-destructive/10 border-destructive/20'
            }`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-secondary mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-destructive mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="font-semibold mb-2">
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </div>
                  {!isCorrect && (
                    <div className="text-sm mb-2">
                      The correct answer is: <strong>{question.correctAnswer}</strong>
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground">
                    {question.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={resetQuiz}>
          Restart Quiz
        </Button>
        
        {currentQuestion < sampleQuestions.length - 1 ? (
          <Button 
            onClick={nextQuestion}
            disabled={!showResult}
            variant="english"
          >
            Next Question
          </Button>
        ) : (
          showResult && (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                Quiz Complete! 🎉
              </div>
              <div className="text-lg">
                Final Score: {score}/{sampleQuestions.length}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};