import React, { useState } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import PizzaFractionGame from './math/PizzaFractionGame';
import NumberBondBuilder from './math/NumberBondBuilder';
import MultiplicationBingo from './math/MultiplicationBingo';
import AdditionRace from './math/AdditionRace';
import DivisionQuest from './math/DivisionQuest';
import DecimalDash from './math/DecimalDash';
import TimeTellerChallenge from './math/TimeTellerChallenge';
import PlaceValuePop from './math/PlaceValuePop';
import ShapesSymmetryMatch from './math/ShapesSymmetryMatch';
import MeasurementMaster from './math/MeasurementMaster';
import WordBuilder from './english/WordBuilder';
import SentenceScrambler from './english/SentenceScrambler';
import SynonymHunt from './english/SynonymHunt';
import SpellingBeeChallenge from './english/SpellingBeeChallenge';

interface GameContainerProps {
  gameId: string;
  onBack: () => void;
  onHome: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ gameId, onBack, onHome }) => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameComplete = (score: number) => {
    setFinalScore(score);
    setGameCompleted(true);
  };

  const renderGame = () => {
    const gameProps = {
      onComplete: handleGameComplete,
      onBack
    };

    switch (gameId) {
      // Math Games
      case 'pizza-fraction':
        return <PizzaFractionGame {...gameProps} />;
      case 'number-bond':
        return <NumberBondBuilder {...gameProps} />;
      case 'multiplication-bingo':
        return <MultiplicationBingo {...gameProps} />;
      case 'addition-race':
        return <AdditionRace {...gameProps} />;
      case 'division-quest':
        return <DivisionQuest {...gameProps} />;
      case 'decimal-dash':
        return <DecimalDash {...gameProps} />;
      case 'time-teller':
        return <TimeTellerChallenge {...gameProps} />;
      case 'place-value-pop':
        return <PlaceValuePop {...gameProps} />;
      case 'shapes-symmetry':
        return <ShapesSymmetryMatch {...gameProps} />;
      case 'measurement-master':
        return <MeasurementMaster {...gameProps} />;
      
      // English Games
      case 'word-builder':
        return <WordBuilder {...gameProps} />;
      case 'sentence-scrambler':
        return <SentenceScrambler {...gameProps} />;
      case 'synonym-hunt':
        return <SynonymHunt {...gameProps} />;
      case 'spelling-bee':
        return <SpellingBeeChallenge {...gameProps} />;
      
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Not Found</h2>
              <button
                onClick={onBack}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              >
                Go Back
              </button>
            </div>
          </div>
        );
    }
  };

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Complete!</h2>
          <p className="text-xl text-gray-600 mb-2">Your Score:</p>
          <p className="text-4xl font-bold text-green-600 mb-6">{finalScore}%</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setGameCompleted(false);
                setFinalScore(0);
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-500 text-white py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors"
            >
              Choose Another Game
            </button>
            <button
              onClick={onHome}
              className="w-full bg-purple-500 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return renderGame();
};

export default GameContainer;