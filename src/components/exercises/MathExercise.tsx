import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Calculator, Lightbulb } from "lucide-react";

interface MathQuestion {
  id: string;
  type: 'multiple-choice' | 'input' | 'word-problem';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
  topic: string;
}

const sampleQuestions: MathQuestion[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'What is 3/4 + 1/4?',
    options: ['1/2', '4/8', '1', '2/4'],
    correctAnswer: '1',
    explanation: 'When adding fractions with the same denominator, add the numerators: 3 + 1 = 4, so 4/4 = 1',
    hint: 'Add the top numbers (numerators) when the bottom numbers are the same!',
    topic: 'Fractions'
  },
  {
    id: '2',
    type: 'input',
    question: 'Convert 0.75 to a fraction in its simplest form:',
    correctAnswer: '3/4',
    explanation: '0.75 = 75/100 = 3/4 (dividing both by 25)',
    hint: '0.75 means 75 hundredths. Can you simplify 75/100?',
    topic: 'Decimals & Fractions'
  },
  {
    id: '3',
    type: 'word-problem',
    question: 'Sarah has 24 stickers. She wants to share them equally among 6 friends. How many stickers will each friend get?',
    correctAnswer: '4',
    explanation: '24 ÷ 6 = 4 stickers per friend',
    hint: 'This is a division problem. How many groups of 6 can you make from 24?',
    topic: 'Division'
  },
  {
    id: '4',
    type: 'multiple-choice',
    question: 'What is 35% of 200?',
    options: ['35', '70', '105', '140'],
    correctAnswer: '70',
    explanation: '35% = 35/100 = 0.35, so 0.35 × 200 = 70',
    hint: 'To find a percentage, multiply the decimal form by the number!',
    topic: 'Percentages'
  }
];

export const MathExercise = () => {
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
    if (selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
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

  const isCorrect = selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-math/10 rounded-lg">
              <Calculator className="h-6 w-6 text-math" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Math Practice</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {sampleQuestions.length}</p>
            </div>
          </div>
          <Badge variant="outline" className="border-math text-math">
            Score: {score}/{sampleQuestions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{question.question}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {question.topic}
            </Badge>
          </div>
          {(question.type === 'input' || question.type === 'word-problem') && (
            <CardDescription>Type your answer in the box below</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type === 'multiple-choice' && question.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "math" : "outline"}
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

          {(question.type === 'input' || question.type === 'word-problem') && (
            <div className="space-y-3">
              <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-math focus:border-transparent"
                placeholder="Type your answer here..."
                disabled={showResult}
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleAnswer}
              disabled={!selectedAnswer || showResult}
              variant="math"
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
                    {isCorrect ? 'Excellent work!' : 'Keep trying!'}
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
            variant="math"
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
              <div className="text-sm text-muted-foreground mt-2">
                Great job practicing {question.topic}!
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};