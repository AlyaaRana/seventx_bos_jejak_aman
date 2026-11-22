import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ArrowLeft, LogOut, Heart } from 'lucide-react';

export const WriteNoteScreen: React.FC = () => {
  const { setScreen, addEvidence } = useVaultStore();
  const [mood, setMood] = useState('Lagi cemas');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!content.trim()) return;
    addEvidence({
      id: Date.now().toString(),
      title: `Catatan Kronologi (${mood})`,
      timestamp: 'Hari ini · Otomatis',
      sha256Hex: '27b91573330bc72d16905b95d27be9ef',
    });
    setScreen('s04-vault-home');
  };

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setScreen('s04-vault-home')}
          className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-xs"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-[11px] font-bold text-slate-500">Tulis Cerita</span>
        <button 
          onClick={() => setScreen('s03-calculator')}
          className="w-9 h-9 rounded-full bg-[#FFEDD5] text-[#D97706] flex items-center justify-center shadow-xs"
        >
          <LogOut size={16} />
        </button>
      </div>

      <div className="space-y-4 my-auto flex-1 py-4 flex flex-col">
        {/* Mood Selector */}
        <div>
          <label className="text-[11px] font-bold text-slate-500 block mb-2">Bagaimana perasaanmu sekarang?</label>
          <div className="flex gap-2">
            {['Lagi cemas', 'Capek', 'Mulai tenang'].map((item) => (
              <button
                key={item}
                onClick={() => setMood(item)}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
                  mood === item
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-purple-100'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area Card */}
        <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-sm flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-extrabold text-slate-800">Ceritamu Hari Ini</span>
            <span className="text-[10px] text-slate-400 font-medium">Otomatis tersimpan</span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Hai, hari ini aku mau cerita..."
            className="w-full flex-1 bg-transparent border-none outline-none resize-none text-xs text-slate-700 leading-relaxed placeholder:text-slate-300"
          />
        </div>
      </div>

      <button
        disabled={!content.trim()}
        onClick={handleSave}
        className="w-full h-12 rounded-2xl bg-[#FF6B50] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 disabled:opacity-40 active:scale-95 transition-all"
      >
        <Heart size={18} />
        <span>Simpan Cerita Aman</span>
      </button>
    </MobileContainer>
  );
};