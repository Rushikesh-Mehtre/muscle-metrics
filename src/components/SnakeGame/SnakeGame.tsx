/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.scss';
import Modal from '../Modal/Modal';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [score, setScore] = useState(0);
  const gameLoop = useRef<any>(null);

  const moveSnake = () => {
    setSnake(prev => {
      const newSnake = [...prev];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      if (head.x >= BOARD_SIZE || head.x < 0 || head.y >= BOARD_SIZE || head.y < 0 || newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        clearInterval(gameLoop.current);
        return prev;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setFood({ x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) });
        setScore(prevScore => prevScore + 1); // Increase score when food is eaten
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gamePaused) {
        switch (e.key) {
          case 'ArrowUp':
            setDirection({ x: 0, y: -1 });
            break;
          case 'ArrowDown':
            setDirection({ x: 0, y: 1 });
            break;
          case 'ArrowLeft':
            setDirection({ x: -1, y: 0 });
            break;
          case 'ArrowRight':
            setDirection({ x: 1, y: 0 });
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (gameStarted && !gamePaused) {
      gameLoop.current = setInterval(moveSnake, 200);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameLoop.current);
    };
  }, [direction, gameStarted, gamePaused]);

  const startGame = () => {
    setGameStarted(true);
    setGamePaused(false);
    setGameOver(false);
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setScore(0); // Reset score when game starts
  };

  const pauseGame = () => {
    setGamePaused(!gamePaused);
  };

  const restartGame = () => {
    setGameStarted(true);
    setGamePaused(false);
    setGameOver(false);
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setScore(0); // Reset score when game restarts
  };

  const handleDirectionChange = (newDirection: { x: number, y: number }) => {
    if (!gamePaused) {
      setDirection(newDirection);
    }
  };

  return (
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <div className="game-container">
        <div className="score">Score: {score}</div>
        <div className="game-board">
          {Array.from({ length: BOARD_SIZE }).map((_, row) => (
            <div key={row} className="board-row">
              {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                const isSnake = snake.some(segment => segment.x === col && segment.y === row);
                const isFood = food.x === col && food.y === row;
                return <div key={col} className={`board-cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`} />;
              })}
            </div>
          ))}
          {gameOver && <div className="game-over">Game Over</div>}
        </div>
        <div className="controls">
          <button onClick={startGame} disabled={gameStarted && !gameOver}>Start</button>
          <button onClick={pauseGame} disabled={!gameStarted || gameOver}>{gamePaused ? 'Resume' : 'Pause'}</button>
          <button onClick={restartGame}>Restart</button>
        </div>
        <div className="direction-controls">
          <button onClick={() => handleDirectionChange({ x: 0, y: -1 })}>&uarr;</button>
          <div>
            <button onClick={() => handleDirectionChange({ x: -1, y: 0 })}>&larr;</button>
            <button onClick={() => handleDirectionChange({ x: 1, y: 0 })}>&rarr;</button>
          </div>
          <button onClick={() => handleDirectionChange({ x: 0, y: 1 })}>&darr;</button>
        </div>
      </div>
    </Modal>
  );
};

export default SnakeGame;
