import React from 'react';
import type { Player } from '../types';
import { PrimaryButton } from './ui';

interface GameOverScreenProps {
  player: Player;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ player, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100 dark:bg-slate-900">
        <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6 text-center">
            <h1 className="text-4xl font-bold text-rose-600">پایان زندگی</h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
                {player.name} در سن {player.age} سالگی از دنیا رفت.
            </p>

            <div className="text-right bg-slate-50 dark:bg-slate-700 p-4 rounded-lg space-y-2 border border-slate-200 dark:border-slate-600">
                <h3 className="font-bold text-center mb-3 text-slate-800 dark:text-slate-100">خلاصه زندگی</h3>
                 <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-slate-100">سن نهایی:</span> {player.age} سال</p>
                <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-slate-100">دارایی نهایی:</span> {player.money.toLocaleString()} تومان</p>
                <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-slate-100">تحصیلات:</span> {player.educationStatus.stage}</p>
                <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-slate-100">شغل:</span> {player.job?.title || 'بیکار'}</p>
                <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-slate-100">وضعیت تاهل:</span> {player.isMarried ? 'متاهل در زمان مرگ' : 'مجرد'}</p>
                <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-slate-100">تعداد فرزندان:</span> {player.childrenCount}</p>
                <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-slate-100">سابقه کیفری:</span> {player.criminalRecord ? 'دارد' : 'ندارد'}</p>
            </div>
            
            <PrimaryButton onClick={onRestart} className="!bg-slate-700 hover:!bg-slate-800 dark:!bg-sky-700 dark:hover:!bg-sky-800">
                شروع دوباره
            </PrimaryButton>
        </div>
    </div>
  );
};