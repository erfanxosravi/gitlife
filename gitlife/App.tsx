import React, { useState, useEffect, useCallback } from 'react';
import type { Player, GameState, GameStage, CharacterConfig, NPC } from './types';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { GameOverScreen } from './components/GameOverScreen';
import * as GameEngine from './gameLogic';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: null,
    stage: 'start',
  });
  const [history, setHistory] = useState<Record<number, string[]>>({});
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hasSave, setHasSave] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('lifeSimTheme') || 'light');

  useEffect(() => {
    setHasSave(GameEngine.hasSavedGame());
    const savedTheme = localStorage.getItem('lifeSimTheme') || 'light';
    setTheme(savedTheme);
  }, []);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('lifeSimTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSaveGame = useCallback((player: Player | null) => {
    if (player && player.alive) {
      GameEngine.saveGame(player);
      setHasSave(true);
    } else {
      GameEngine.deleteSave();
      setHasSave(false);
    }
  }, []);

  useEffect(() => {
    handleSaveGame(gameState.player);
  }, [gameState.player, handleSaveGame]);

  const changeStage = (stage: GameStage) => {
    setGameState(prev => ({ ...prev, stage }));
  };

  const handleStartGame = (config: CharacterConfig) => {
    const newPlayer = GameEngine.createNewPlayer(config);
    setHistory({0: [`تولدت مبارک، ${newPlayer.name}! زندگی جدیدت در شهر ${newPlayer.city}, ${newPlayer.country} شروع شد.`]});
    setGameState({ player: newPlayer, stage: 'playing' });
  };

  const handleLoadGame = () => {
    const loadedPlayer = GameEngine.loadGame();
    if (loadedPlayer) {
      setHistory({ [loadedPlayer.age]: [`خوش برگشتی، ${loadedPlayer.name}!`]})
      setGameState({ player: loadedPlayer, stage: 'playing' });
    }
  };

  const handleNextYear = () => {
    if (!gameState.player) return;

    const { newPlayerState, log: eventLog } = GameEngine.advanceYear(gameState.player);
    
    setGameState(prev => ({ ...prev, player: newPlayerState }));
    setHistory(prevHistory => {
        const newHistory = {...prevHistory};
        newHistory[newPlayerState.age] = eventLog.length > 0 ? eventLog : ["یک سال دیگر گذشت."];
        return newHistory;
    });

    if (!newPlayerState.alive) {
      changeStage('game_over');
    }
  };
  
  const handleAction = useCallback((actionType: string, payload?: any) => {
      if (!gameState.player) return;
      
      let result;
      switch(actionType) {
        case 'studyHarder':
            result = GameEngine.studyHarder(gameState.player);
            break;
        case 'dropOut':
            result = GameEngine.dropOut(gameState.player);
            break;
        case 'interactWithNpc':
            if (payload && payload.npcId && payload.interactionType) {
                result = GameEngine.interactWithNpc(gameState.player, payload.npcId, payload.interactionType);
            }
            break;
        case 'enrollInUniversity':
            result = GameEngine.enrollInUniversity(gameState.player);
            break;
        case 'applyForJob':
            if(payload && payload.jobId) {
                result = GameEngine.applyForJob(gameState.player, payload.jobId);
            }
            break;
        case 'workHarder':
            result = GameEngine.workHarder(gameState.player);
            break;
        case 'askForPromotion':
            result = GameEngine.askForPromotion(gameState.player);
            break;
        case 'quitJob':
            result = GameEngine.quitJob(gameState.player);
            break;
        case 'goToDoctor':
            result = GameEngine.goToDoctor(gameState.player);
            break;
        case 'meditate':
            result = GameEngine.meditate(gameState.player);
            break;
        case 'commitCrime':
            result = GameEngine.commitCrime(gameState.player);
            break;
        case 'buyHouse':
            result = GameEngine.buyHouse(gameState.player);
            break;
        case 'learnSkill':
            if(payload && payload.skillId) {
                result = GameEngine.learnSkill(gameState.player, payload.skillId);
            }
            break;
        case 'doFreelanceGig':
            if(payload && payload.gigId) {
                result = GameEngine.doFreelanceGig(gameState.player, payload.gigId);
            }
            break;
        case 'joinMilitary':
            result = GameEngine.joinMilitary(gameState.player);
            break;
        default:
            console.warn("Unknown action type:", actionType);
            return;
      }
      
      if (result) {
        setGameState(prev => ({...prev, player: result.player}));
        setHistory(prevHistory => {
            const newHistory = {...prevHistory};
            const currentAge = result.player.age;
            if(!newHistory[currentAge]) newHistory[currentAge] = [];
            newHistory[currentAge].push(result.message);
            return newHistory;
        });

        const shouldKeepModalOpen = ['interactWithNpc'].includes(actionType);
        if (!shouldKeepModalOpen) {
            setActiveModal(null);
        }
      }

  }, [gameState.player]);

  const handleRestart = () => {
    GameEngine.deleteSave();
    setHasSave(false);
    setGameState({ player: null, stage: 'start' });
    setHistory({});
    setActiveModal(null);
  };

  const renderContent = () => {
    const { stage, player } = gameState;

    switch (stage) {
      case 'start':
        return <StartScreen onStartGame={handleStartGame} onLoadGame={handleLoadGame} hasSave={hasSave} />;
      case 'playing':
        if (player) {
          return <GameScreen 
                    player={player} 
                    history={history} 
                    onNextYear={handleNextYear} 
                    onAction={handleAction}
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                    theme={theme}
                    toggleTheme={toggleTheme}
                 />;
        }
        return null;
      case 'game_over':
        if (player) {
          return <GameOverScreen player={player} onRestart={handleRestart} />;
        }
        return null;
      default:
        return null;
    }
  };

  return <div className="antialiased h-full">{renderContent()}</div>;
};

export default App;