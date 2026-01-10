import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizQuestion {
  character: string;
  correctPronunciation: string;
  options: string[];
}

const vowels = [
  { character: 'অ', pronunciation: 'ô' },
  { character: 'আ', pronunciation: 'a' },
  { character: 'ই', pronunciation: 'i' },
  { character: 'ঈ', pronunciation: 'ee' },
  { character: 'উ', pronunciation: 'u' },
  { character: 'ঊ', pronunciation: 'oo' },
];

const consonants = [
  { character: 'ক', pronunciation: 'kô' },
  { character: 'খ', pronunciation: 'khô' },
  { character: 'গ', pronunciation: 'gô' },
  { character: 'ম', pronunciation: 'mô' },
  { character: 'ন', pronunciation: 'nô' },
  { character: 'প', pronunciation: 'pô' },
  { character: 'র', pronunciation: 'rô' },
  { character: 'স', pronunciation: 'sô' },
];

const allLetters = [...vowels, ...consonants];

function generateQuestions(count: number): QuizQuestion[] {
  const shuffled = [...allLetters].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return selected.map((letter) => {
    const otherPronunciations = allLetters
      .filter((l) => l.pronunciation !== letter.pronunciation)
      .map((l) => l.pronunciation)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [letter.pronunciation, ...otherPronunciations].sort(
      () => Math.random() - 0.5
    );

    return {
      character: letter.character,
      correctPronunciation: letter.pronunciation,
      options,
    };
  });
}

export function LanguageQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    startQuiz();
  }, []);

  const startQuiz = () => {
    setQuestions(generateQuestions(10));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === questions[currentQuestion].correctPronunciation) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  if (questions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  if (quizComplete) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="text-6xl mb-4"
            >
              {score >= 8 ? '🎉' : score >= 5 ? '👏' : '💪'}
            </motion.div>
            <h3 className="text-3xl mb-2">
              Your Score: {score} / {questions.length}
            </h3>
            <p className="text-gray-600 mb-4">
              {score >= 8
                ? 'Excellent! You have mastered the Bengali script!'
                : score >= 5
                ? 'Good job! Keep practicing to improve.'
                : 'Keep learning! Practice makes perfect.'}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(score / questions.length) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full"
              />
            </div>
          </div>
          <Button onClick={startQuiz} className="w-full" size="lg">
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Script Recognition Quiz</CardTitle>
          <Badge variant="secondary">
            Question {currentQuestion + 1} / {questions.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm text-gray-600">Score:</span>
          <Badge variant="outline">{score}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">What is the pronunciation of this letter?</p>
          <motion.div
            key={currentQuestion}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-8xl mb-8 p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg"
          >
            {question.character}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="wait">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correctPronunciation;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={
                      showCorrect
                        ? 'default'
                        : showWrong
                        ? 'destructive'
                        : 'outline'
                    }
                    className={`w-full h-16 text-lg ${
                      showCorrect
                        ? 'bg-green-500 hover:bg-green-600'
                        : showWrong
                        ? 'bg-red-500 hover:bg-red-600'
                        : ''
                    }`}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedAnswer}
                  >
                    <span className="flex items-center gap-2">
                      {option}
                      {showCorrect && <CheckCircle2 className="w-5 h-5" />}
                      {showWrong && <XCircle className="w-5 h-5" />}
                    </span>
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {selectedAnswer === question.correctPronunciation ? (
              <p className="text-green-600">Correct! Well done! 🎉</p>
            ) : (
              <p className="text-red-600">
                Incorrect. The correct answer is: {question.correctPronunciation}
              </p>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
