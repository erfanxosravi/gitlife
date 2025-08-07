import React, { useState } from 'react';
import type { Player } from '../types';
import { LifeLog } from './Dashboard';
import { ActionModal } from './ActivityModal';
import { BriefcaseIcon, AssetsIcon, RelationshipsIcon, ActivitiesIcon, AgeIcon, MenuIcon } from './Icons';
import { ProgressBar, HeartIcon, SmileIcon, BrainIcon, LooksIcon, Modal } from './ui';

interface GameScreenProps {
  player: Player;
  history: Record<number, string[]>;
  onNextYear: () => void;
  onAction: (action: string, payload?: any) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<{ player: Player; onMenuClick: () => void; }> = ({ player, onMenuClick }) => {
    
    const getStatusText = (): string => {
        if (player.job) return player.job.title;
        if (player.royalStatus) return player.royalStatus;
        if (player.educationStatus.stage === 'دانشگاه') return `دانشجو (${player.educationStatus.major})`;
        if (['دبستان', 'راهنمایی', 'دبیرستان'].includes(player.educationStatus.stage)) return 'دانش‌آموز';
        return player.educationStatus.stage;
    };
    
    return (
        <header className="flex-shrink-0">
            <div className="bg-red-600 text-white flex justify-between items-center p-2">
                <button onClick={onMenuClick} className="p-2"><MenuIcon /></button>
                <h1 className="font-bold text-2xl">شبیه‌ساز زندگی</h1>
                <span className="font-bold bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-sm">شهروند ویژه</span>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center text-3xl">
                        {player.gender === 'مرد' ? '👨' : '👩‍'}
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">{player.name} {player.countryFlag}</h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">{getStatusText()}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="font-bold text-2xl text-green-600">${player.money.toLocaleString()}</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">موجودی حساب</p>
                </div>
            </div>
        </header>
    );
}


const ActionBar: React.FC<{ onNextYear: () => void, setActiveModal: (modal: string | null) => void }> = ({ onNextYear, setActiveModal }) => {
    const actionItems = [
        { name: 'activities', label: 'فعالیت‌ها', icon: <ActivitiesIcon /> },
        { name: 'relationships', label: 'روابط', icon: <RelationshipsIcon /> },
        { name: 'career', label: 'حرفه', icon: <BriefcaseIcon isActionbar={true} /> },
        { name: 'assets', label: 'دارایی‌ها', icon: <AssetsIcon /> },
    ];

    return (
        <div className="bg-blue-800 p-2 flex justify-around items-center relative text-white">
            {actionItems.slice(0, 2).map(item => (
                <button key={item.name} onClick={() => setActiveModal(item.name)} className="flex flex-col items-center text-xs w-20 hover:scale-110 transition-transform">
                    {item.icon}
                    <span>{item.label}</span>
                </button>
            ))}
            <button onClick={onNextYear} className="absolute left-1/2 -translate-x-1/2 -top-10 bg-green-500 hover:bg-green-600 rounded-full w-20 h-20 flex flex-col items-center justify-center border-4 border-white dark:border-slate-700 shadow-lg transition-transform hover:scale-110">
                <AgeIcon />
                <span className="text-xs font-bold">سن</span>
            </button>
            {actionItems.slice(2, 4).map(item => (
                <button key={item.name} onClick={() => setActiveModal(item.name)} className="flex flex-col items-center text-xs w-20 hover:scale-110 transition-transform">
                    {item.icon}
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
};

const StatsPanel: React.FC<{ player: Player }> = ({ player }) => (
    <div className="bg-white dark:bg-slate-800 p-3 space-y-2.5 shadow-inner">
        <ProgressBar label="شادی" value={player.happiness} icon={<SmileIcon />} />
        <ProgressBar label="سلامتی" value={player.health} icon={<HeartIcon />} />
        <ProgressBar label="هوش" value={player.intelligence} icon={<BrainIcon />} />
        <ProgressBar label="زیبایی" value={player.looks} icon={<LooksIcon />} />
    </div>
);

const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void; theme: string; toggleTheme: () => void; }> = ({ isOpen, onClose, theme, toggleTheme }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="تنظیمات">
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="font-bold text-white">تم تاریک</span>
                <button onClick={toggleTheme} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${theme === 'dark' ? 'bg-green-500' : 'bg-gray-400'}`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
            </div>
        </div>
    </Modal>
);


export const GameScreen: React.FC<GameScreenProps> = ({ player, history, onNextYear, onAction, activeModal, setActiveModal, theme, toggleTheme }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <Header player={player} onMenuClick={() => setSettingsOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
            <LifeLog history={history} />
        </main>
        
        <footer className="flex-shrink-0">
            <ActionBar onNextYear={onNextYear} setActiveModal={setActiveModal} />
            <StatsPanel player={player} />
        </footer>

        {activeModal && (
            <ActionModal 
                activeModal={activeModal} 
                onClose={() => setActiveModal(null)}
                onAction={onAction}
                player={player}
            />
        )}
        
        <SettingsModal 
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            theme={theme}
            toggleTheme={toggleTheme}
        />
    </div>
  );
};