'use client'

import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { ConfettiButton } from './ConfettiButton';

type Attempt = {
    letter: string;
    status: 'correct' | 'wrong-place' | 'wrong' | 'empty' | 'revealed';
};

export default function Motus() {
    const [word, setWord] = useState<string>('');
    const [tab, setTab] = useState<string[]>([]);
    const [attempts, setAttempts] = useState<Attempt[][]>([]);
    const [currentAttempt, setCurrentAttempt] = useState<number>(0);
    const [currentCell, setCurrentCell] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        apiCallWordSize6();
    }, []);

    useEffect(() => {
        if (word) {
            tabWord();
            initializeAttempts();
        }
    }, [word]);

    useEffect(() => {
        if (
            attempts.length > 0 &&
            attempts[currentAttempt] && 
            attempts[currentAttempt][0] &&
            attempts[currentAttempt][0].status !== 'revealed'
        ) {
            revealFirstLetter();
            setIsLoading(false);
        }
    }, [attempts, currentAttempt]);
    
    const apiCallWordSize6 = async () => {
        try {
            const response = await axios.get('https://trouve-mot.fr/api/sizemax/6');
            let word = response.data[0].name;
            word = word.toUpperCase();
            word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            word = word.replace(/[^A-Z]/g, '');
            setWord(word);
        } catch (error) {
            console.error('Erreur lors de la récupération du mot:', error);
        }
    };

    const tabWord = async () => {
        if (word) {
            const wordArray = word.split('');
            setTab(wordArray);
        } else {
            setTab(["M", "O", "T", "U", "S"])
        }
    };

    const initializeAttempts = () => {
        if (word) {
            const wordLength = word.length;
            const newAttempts: Attempt[][] = Array(6).fill(null).map(() =>
                Array(wordLength).fill(null).map(() => ({ letter: '', status: 'empty' }))
            );
            setAttempts(newAttempts);
        }
    };

    const revealFirstLetter = () => {
        if (currentAttempt < 6 && word && attempts[currentAttempt]) {
            const updatedAttempts = [...attempts];
            updatedAttempts[currentAttempt][0] = { letter: word.charAt(0).toString(), status: 'revealed' };
            setAttempts(updatedAttempts);
        }
    };

    const handleKeyPress = useCallback((key: string) => {
        if (key.match(/^[A-Za-z]$/) && currentCell < word.length) {
            const updatedAttempts = [...attempts];
            const currentGuess = updatedAttempts[currentAttempt];
            if (currentCell > 0 && currentCell < currentGuess.length) {
                currentGuess[currentCell] = { letter: key.toUpperCase(), status: 'empty' };
            }
            setAttempts(updatedAttempts);
            setCurrentCell(currentCell + 1);
        } else if (key === 'Backspace' && currentCell > 1) {
            const updatedAttempts = [...attempts];
            const currentGuess = updatedAttempts[currentAttempt];
            const previousCell = currentCell - 1;
            currentGuess[previousCell] = { letter: '', status: 'empty' };
            setAttempts(updatedAttempts);
            setCurrentCell(previousCell);
        }
    }, [attempts, currentAttempt, currentCell, word.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e.key);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyPress]);

    const checkWinCondition = async () => {
        const currentGuess = attempts[currentAttempt];
        if (currentGuess.slice(1).every(attempt => attempt.status === 'correct')) {
            try {
                await axios.post('/api/user/win');
                setCurrentAttempt(0);
                setCurrentCell(1);
                setIsLoading(true);
                await apiCallWordSize6();
            } catch (error) {
                console.error('Erreur lors de l\'appel API win:', error);
            }
        } else if (currentAttempt === 5) {
            try {
                await axios.post('/api/user/loss');
                setCurrentAttempt(0);
                setCurrentCell(1);
                setIsLoading(true);
                await apiCallWordSize6();
            } catch (error) {
                console.error('Erreur lors de l\'appel API loss:', error);
            }
        }
    };

    const validateAttempt = () => {
        if (currentAttempt < 6) {
            const updatedAttempts = [...attempts];
            const currentGuess = updatedAttempts[currentAttempt];
            const letterCount = new Map<string, number>();
            for (let char of word) {
                letterCount.set(char, (letterCount.get(char) || 0) + 1);
            }
            currentGuess.forEach((attempt, index) => {
                if (attempt.letter === word[index] && attempt.status !== 'revealed') {
                    attempt.status = 'correct';
                    letterCount.set(attempt.letter, letterCount.get(attempt.letter)! - 1);
                }
            });
            currentGuess.forEach((attempt, index) => {
                if (attempt.status !== 'correct' && attempt.status !== 'revealed') {
                    if (letterCount.get(attempt.letter)! > 0) {
                        attempt.status = 'wrong-place';
                        letterCount.set(attempt.letter, letterCount.get(attempt.letter)! - 1);
                    } else {
                        attempt.status = 'wrong';
                    }
                }
            });
            setAttempts(updatedAttempts);
            checkWinCondition();
            setCurrentAttempt(currentAttempt + 1);
            setCurrentCell(1);
        }
    };

    const getBackgroundColor = (status: 'correct' | 'wrong-place' | 'wrong' | 'empty' | 'revealed'): string => {
        switch (status) {
            case 'correct':
                return 'bg-red-500';
            case 'wrong-place':
                return 'bg-yellow-500';
            case 'revealed':
                return 'bg-[#0077c7]';
            case 'wrong':
            case 'empty':
            default:
                return 'bg-[#0077c7]';
        }
    };

    return (
        <div className='flex flex-col items-center justify-center p-4 sm:p-10 lg:p-14 space-y-1 bg-white'>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    {attempts.map((attempt, attemptIndex) => (
                        <div key={attemptIndex} className="flex space-x-1 sm:space-x-2 lg:space-x-3">
                            {attempt.map((attemptObj, letterIndex) => (
                                <div
                                    key={letterIndex}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center ${getBackgroundColor(attemptObj.status)} text-white text-sm sm:text-lg lg:text-xl font-bold`}
                                >
                                    {attemptIndex === currentAttempt ?
                                        (attemptObj.letter !== '' ? attemptObj.letter : '.') :
                                        (attemptObj.letter !== '' ? attemptObj.letter : ' ')}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div onClick={validateAttempt}>
                        <ConfettiButton>
                            Valider
                        </ConfettiButton>
                    </div>
                </>
            )}
        </div>
    );
}
