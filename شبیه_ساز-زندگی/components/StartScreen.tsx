import React, { useState, useEffect, useMemo } from 'react';
import type { CharacterConfig } from '../types';
import { PrimaryButton, Modal, CrownIcon } from './ui';
import { createNewPlayer, COUNTRIES, CITIES, ROYAL_TITLES } from '../gameLogic';

interface StartScreenProps {
  onStartGame: (config: CharacterConfig) => void;
  onLoadGame: () => void;
  hasSave: boolean;
}

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const ActionButton: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
    colorClass?: string;
}> = ({ onClick, children, colorClass = 'bg-sky-500 hover:bg-sky-600' }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-center px-4 py-3 rounded-lg font-bold transition-all duration-200 shadow-sm text-white ${colorClass}`}
        >
            {children}
        </button>
    );
}

const SelectionButton: React.FC<{
  label: string;
  value: string;
  icon?: React.ReactNode;
  onClick: () => void;
  colorClass?: string;
}> = ({ label, value, icon, onClick, colorClass = 'bg-sky-500' }) => (
    <button onClick={onClick} className={`w-full p-3 rounded-full text-white shadow-lg border-2 border-white/50 flex items-center gap-4 transition-transform transform hover:scale-105 ${colorClass}`}>
        {icon && <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">{icon}</div>}
        <div className="text-right flex-grow">
            <div className="font-bold text-lg">{value}</div>
            <div className="text-sm opacity-80">{label}</div>
        </div>
    </button>
);


export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, onLoadGame, hasSave }) => {
  const [character, setCharacter] = useState<CharacterConfig>({});
  const [activeModal, setActiveModal] = useState<null | 'name' | 'country' | 'city' | 'gender' | 'royal'>(null);
  const [tempName, setTempName] = useState({ first: '', last: '' });

  useEffect(() => {
    // Generate a random character on initial load
    setCharacter(createNewPlayer());
  }, []);
  
  const selectedCountryData = useMemo(() => {
    return COUNTRIES.find(c => c.name === character.country);
  }, [character.country]);

  const handleNameChange = () => {
    const fullName = `${tempName.first.trim()} ${tempName.last.trim()}`.trim();
    if(fullName) {
        setCharacter(c => ({...c, name: fullName}));
    }
    setActiveModal(null);
  }

  const handleCountrySelect = (countryName: string) => {
    const countryData = COUNTRIES.find(c => c.name === countryName);
    if(countryData) {
        const newCity = CITIES[countryData.name][getRandom(0, CITIES[countryData.name].length - 1)];
        setCharacter(c => ({
            ...c, 
            country: countryData.name, 
            city: newCity,
            royalStatus: countryData.isRoyal ? c.royalStatus : null, // Reset royal status if country is not royal
        }));
    }
    setActiveModal(null);
  }

  const baseColorClass = character.gender === 'زن' ? 'bg-pink-500' : 'bg-sky-500';

  if (!character.name) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">در حال بارگذاری...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900 text-white">
        <div className="w-full max-w-sm mx-auto space-y-4">
            <h1 className="text-4xl font-bold text-center mb-6">ساخت شخصیت</h1>
            
            <SelectionButton label="نام" value={character.name || ''} onClick={() => {
                const parts = character.name?.split(' ') || ['',''];
                setTempName({first: parts[0], last: parts.slice(1).join(' ')});
                setActiveModal('name');
            }} colorClass={baseColorClass} />
            <SelectionButton label="جنسیت" value={character.gender || ''} onClick={() => setActiveModal('gender')} colorClass={baseColorClass} />
            <SelectionButton label="کشور" value={`${selectedCountryData?.flag || ''} ${character.country || ''}`} onClick={() => setActiveModal('country')} colorClass={baseColorClass} />
            <SelectionButton label="شهر" value={`${selectedCountryData?.flag || ''} ${character.city || ''}`} onClick={() => setActiveModal('city')} colorClass={baseColorClass} />
            
            {selectedCountryData?.isRoyal && (
                 <SelectionButton 
                    label="مقام سلطنتی" 
                    value={character.royalStatus || 'عادی'}
                    icon={<CrownIcon/>}
                    onClick={() => setActiveModal('royal')}
                    colorClass="bg-indigo-600"
                 />
            )}
            
            <div className="pt-6 space-y-3">
                 <PrimaryButton onClick={() => onStartGame(character)} className="!bg-emerald-500 hover:!bg-emerald-600">
                    شروع زندگی
                </PrimaryButton>
                {hasSave && (
                     <button onClick={onLoadGame} className="w-full text-center px-4 py-3 rounded-xl font-bold transition-all duration-200 bg-slate-700 hover:bg-slate-600 text-white shadow-md">
                        ادامه بازی قبل
                    </button>
                )}
            </div>
        </div>

        {/* --- MODALS --- */}
        <Modal isOpen={activeModal === 'name'} onClose={() => setActiveModal(null)} title="تغییر نام">
            <div className="space-y-4">
                <input type="text" placeholder="نام" value={tempName.first} onChange={e => setTempName(n => ({...n, first: e.target.value}))} className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-sky-500"/>
                <input type="text" placeholder="نام خانوادگی" value={tempName.last} onChange={e => setTempName(n => ({...n, last: e.target.value}))} className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-sky-500"/>
                <PrimaryButton onClick={handleNameChange} className={`!${baseColorClass}`}>ذخیره</PrimaryButton>
            </div>
        </Modal>

        <Modal isOpen={activeModal === 'gender'} onClose={() => setActiveModal(null)} title="انتخاب جنسیت">
            <div className="space-y-3">
                <ActionButton onClick={() => { setCharacter(c => ({...c, gender: 'مرد'})); setActiveModal(null); }} colorClass="bg-sky-500 hover:bg-sky-600">مرد</ActionButton>
                <ActionButton onClick={() => { setCharacter(c => ({...c, gender: 'زن'})); setActiveModal(null); }} colorClass="bg-pink-500 hover:bg-pink-600">زن</ActionButton>
            </div>
        </Modal>

        <Modal isOpen={activeModal === 'country'} onClose={() => setActiveModal(null)} title="انتخاب کشور">
            <div className="space-y-2">
                {COUNTRIES.map(c => <ActionButton key={c.name} onClick={() => handleCountrySelect(c.name)}>{c.flag} {c.name}</ActionButton>)}
            </div>
        </Modal>
        
        <Modal isOpen={activeModal === 'city'} onClose={() => setActiveModal(null)} title={`انتخاب شهر (${character.country})`}>
            <div className="space-y-2">
                {CITIES[character.country || '']?.map(cityName => <ActionButton key={cityName} onClick={() => { setCharacter(c => ({...c, city: cityName})); setActiveModal(null); }}>{cityName}</ActionButton>)}
            </div>
        </Modal>
        
        <Modal isOpen={activeModal === 'royal'} onClose={() => setActiveModal(null)} title="انتخاب مقام سلطنتی">
             <div className="space-y-2">
                <ActionButton onClick={() => { setCharacter(c => ({...c, royalStatus: null})); setActiveModal(null); }}>عادی</ActionButton>
                {(ROYAL_TITLES[character.gender || 'مرد'] || []).map(title => (
                    <ActionButton key={title} onClick={() => { setCharacter(c => ({...c, royalStatus: title})); setActiveModal(null); }}>{title}</ActionButton>
                ))}
            </div>
        </Modal>

    </div>
  );
};