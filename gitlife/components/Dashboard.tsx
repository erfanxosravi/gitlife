import React, { useEffect, useRef } from 'react';

interface LifeLogProps {
  history: Record<number, string[]>;
}

export const LifeLog: React.FC<LifeLogProps> = ({ history }) => {
  const logEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const sortedAges = Object.keys(history).map(Number).sort((a, b) => a - b);

  return (
    <div className="p-4 space-y-6">
      {sortedAges.map(age => (
        <div key={age}>
          <h3 className="font-bold text-lg text-blue-700 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-700 pb-1 mb-2">
            سن: {age} سال
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-slate-300 list-disc list-inside">
            {history[age].map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      ))}
      <div ref={logEndRef} />
    </div>
  );
};