// Layar kalkulator kamuflase fungsional yang membuka brankas jika memasukkan PIN rahasia disusul tombol =.
import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';

export const CalculatorDisguise: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const { unlockVaultWithPIN, setScreen } = useVaultStore();

  const handleInput = (val: string) => {
    if (val === 'AC') {
      setDisplay('0');
      setExpression('');
      return;
    }

    if (val === '=') {
      // Cek apakah PIN Rahasia cocok
      const isUnlocked = unlockVaultWithPIN(expression);
      if (isUnlocked) {
        setDisplay('0');
        setExpression('');
        return;
      }

      // Evaluasi Aritmatika Biasa
      try {
        const evalResult = Function(`'use strict'; return (${expression})`)();
        setDisplay(String(evalResult));
        setExpression(String(evalResult));
      } catch {
        setDisplay('0');
        setExpression('');
      }
      return;
    }

    const nextExpr = expression === '0' ? val : expression + val;
    setExpression(nextExpr);
    setDisplay(nextExpr);
  };

  const padKeys = [
    ['AC', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <MobileContainer className="bg-[#0F172A] text-white p-6 justify-end">
      {/* Visual Header */}
      <div className="flex justify-between items-center text-xs text-slate-500 mb-auto pt-2">
        <span>Kalkulator</span>
        <button 
          onClick={() => setScreen('s09-responder-verify')}
          className="text-slate-400 hover:text-slate-200 underline"
        >
          Portal Pendamping
        </button>
      </div>

      {/* Dynamic Display */}
      <div className="text-right mb-6">
        <div className="text-sm text-slate-400 h-6 truncate">{expression}</div>
        <div className="text-5xl font-light tracking-tight text-white mt-1 break-all">{display}</div>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-4 gap-3">
        {padKeys.flat().map((btn) => {
          const isOp = ['÷', '×', '-', '+', '='].includes(btn);
          const isAC = btn === 'AC';
          const isZero = btn === '0';

          return (
            <button
              key={btn}
              onClick={() => handleInput(btn === '÷' ? '/' : btn === '×' ? '*' : btn)}
              className={`min-h-[64px] rounded-2xl text-2xl font-semibold transition-all active:scale-95 ${
                isZero ? 'col-span-2 text-left pl-7' : ''
              } ${
                isOp
                  ? 'bg-[#F97316] text-slate-950'
                  : isAC
                  ? 'bg-slate-700 text-emerald-400'
                  : 'bg-[#334155] text-slate-100 hover:bg-slate-600'
              }`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </MobileContainer>
  );
};