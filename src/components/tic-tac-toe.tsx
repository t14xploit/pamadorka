'use client';

import React, { useState } from 'react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const handlePlayerMove = (index: number) => {
    if (board[index] !== '' || winner || isDraw || !isPlayerTurn || isComputerThinking) return;

    const newBoard = [...board];
    newBoard[index] = 'X'; // Player is always X
    setBoard(newBoard);

    const winLine = checkWin(newBoard);
    if (winLine) {
      setWinner('X');
      setWinningLine(winLine);
    } else if (newBoard.every(cell => cell !== '')) {
      setIsDraw(true);
    } else {
      setIsPlayerTurn(false);
      // Computer move after a short delay for better UX
      setTimeout(() => makeComputerMove(newBoard), 500);
    }
  };

  const makeComputerMove = (currentBoard: string[]) => {
    setIsComputerThinking(true);

    const bestMove = getBestMove(currentBoard);
    if (bestMove !== -1) {
      const newBoard = [...currentBoard];
      newBoard[bestMove] = 'O'; // Computer is always O
      setBoard(newBoard);

      const winLine = checkWin(newBoard);
      if (winLine) {
        setWinner('O');
        setWinningLine(winLine);
      } else if (newBoard.every(cell => cell !== '')) {
        setIsDraw(true);
      } else {
        setIsPlayerTurn(true);
      }
    }

    setIsComputerThinking(false);
  };

  const getBestMove = (board: string[]): number => {
    // Check if computer can win
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        if (checkWin(board)) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }

    // Check if computer needs to block player from winning
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        if (checkWin(board)) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }

    // Take center if available
    if (board[4] === '') {
      return 4;
    }

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === '');
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available space
    const availableSpaces = board.map((cell, index) => cell === '' ? index : -1).filter(i => i !== -1);
    if (availableSpaces.length > 0) {
      return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    }

    return -1;
  };

  const checkWin = (b: string[]): number[] | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b_, c] = line;
      if (b[a] !== '' && b[a] === b[b_] && b[a] === b[c]) {
        return line;
      }
    }
    return null;
  };

  const reset = () => {
    setBoard(Array(9).fill(''));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setIsComputerThinking(false);
  };

  const getStatusMessage = () => {
    if (winner) {
      return winner === 'X' ? '[PLAYER WINS]' : '[COMPUTER WINS]';
    } else if (isDraw) {
      return "[SYSTEM DRAW]";
    } else if (isComputerThinking) {
      return "[COMPUTER PROCESSING...]";
    } else if (isPlayerTurn) {
      return "[YOUR TURN]";
    } else {
      return "[COMPUTER TURN]";
    }
  };

  const getCellContent = (cell: string, index: number) => {
    if (!cell) return '';

    const isWinningCell = winningLine?.includes(index);
    const baseClass = cell === 'X' ? 'text-cyan-400' : 'text-green-400';
    const winClass = isWinningCell ? 'animate-pulse text-yellow-400' : baseClass;

    return (
      <span className={`${winClass} transition-all duration-300 font-mono font-bold`}>
        {cell}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 max-w-md mx-auto">
      {/* Status Display */}
      <div className="mb-6 p-4 bg-black/60 backdrop-blur-md border border-green-500/30 rounded-lg">
        <div className="text-center">
          <div className="text-green-400 font-mono text-lg font-bold mb-2">
            {getStatusMessage()}
          </div>
          {!winner && !isDraw && isPlayerTurn && !isComputerThinking && (
            <div className="text-green-300/70 font-mono text-sm">
              Neural interface active. Select your coordinates.
            </div>
          )}
          {!winner && !isDraw && isComputerThinking && (
            <div className="text-green-300/70 font-mono text-sm animate-pulse">
              AI calculating optimal strategy...
            </div>
          )}
          {!winner && !isDraw && !isPlayerTurn && !isComputerThinking && (
            <div className="text-green-300/70 font-mono text-sm">
              Computer analyzing board state...
            </div>
          )}
          {(winner || isDraw) && (
            <div className="text-green-300/70 font-mono text-sm">
              Game sequence complete. Reset to continue.
            </div>
          )}
        </div>
      </div>

      {/* Game Board */}
      <div className="relative p-6 bg-black/60 backdrop-blur-xl border border-green-500/30 rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 rounded-2xl"></div>

        <div className="relative grid grid-cols-3 gap-3">
          {board.map((cell, i) => {
            const isWinningCell = winningLine?.includes(i);
            return (
              <button
                key={i}
                className={`
                  relative w-20 h-20 text-4xl font-bold flex items-center justify-center
                  bg-black/80 backdrop-blur-md border-2 rounded-lg
                  transition-all duration-300 transform hover:scale-105
                  ${cell === ''
                    ? 'border-green-500/30 hover:border-green-500/60 hover:bg-green-500/10 cursor-pointer'
                    : 'border-green-500/50 cursor-default'
                  }
                  ${isWinningCell ? 'border-yellow-400/80 bg-yellow-400/20 shadow-lg shadow-yellow-400/30' : ''}
                  ${winner || isDraw ? 'cursor-not-allowed opacity-75' : ''}
                  group
                `}
                onClick={() => handlePlayerMove(i)}
                disabled={winner !== null || isDraw || !isPlayerTurn || isComputerThinking}
              >
                {/* Hover glow effect */}
                {cell === '' && !winner && !isDraw && (
                  <div className="absolute inset-0 rounded-lg bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300"></div>
                )}

                {/* Cell content */}
                <div className="relative z-10">
                  {getCellContent(cell, i)}
                </div>

                {/* Grid coordinates for cyberpunk feel */}
                <div className="absolute top-1 left-1 text-xs text-green-500/40 font-mono">
                  {String.fromCharCode(65 + Math.floor(i / 3))}{(i % 3) + 1}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Panel */}
      {(winner || isDraw) && (
        <div className="mt-6 p-4 bg-black/60 backdrop-blur-md border border-green-500/30 rounded-lg">
          <button
            onClick={reset}
            className="
              px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg
              text-green-400 font-mono font-bold
              hover:bg-green-500/30 hover:border-green-500/70
              transition-all duration-300 transform hover:scale-105
              shadow-lg hover:shadow-green-500/20
            "
          >
            [RESET GAME]
          </button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
