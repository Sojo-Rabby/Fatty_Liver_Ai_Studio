
import React, { useMemo } from 'react';
import { AssessmentState } from '../types';
import { AlertCircle, CheckCircle2, ShieldAlert, Download, RefreshCw, Info } from 'lucide-react';

interface Props {
  data: AssessmentState;
  onReset: () => void;
}

const ResultDisplay: React.FC<Props> = ({ data, onReset }) => {
  const bmi = useMemo(() => {
    if (data.metrics.weight && data.metrics.height) {
      const heightInMeters = data.metrics.height / 100;
      return parseFloat((data.metrics.weight / (heightInMeters * heightInMeters)).toFixed(1));
    }
    return null;
  }, [data.metrics]);

  const fib4Score = useMemo(() => {
    const { platelet, ast, alt } = data.labs;
    const { age } = data.profile;
    if (age && platelet && ast && alt) {
      // FIB-4 = (Age * AST) / (Platelet * SQRT(ALT))
      const score = (age * ast) / (platelet * Math.sqrt(alt));
      return parseFloat(score.toFixed(2));
    }
    return null;
  }, [data.labs, data.profile]);

  const getRiskLevel = () => {
    if (!fib4Score) return null;
    if (fib4Score < 1.3) return 'low';
    if (fib4Score <= 2.67) return 'moderate';
    return 'high';
  };

  const riskLevel = getRiskLevel();

  const adultCriteriaMet = useMemo(() => {
    const criteria = [];
    if (bmi && bmi >= 25) criteria.push('BMI ≥ 25 kg/m²');
    if (data.metrics.waist) {
      if (data.profile.sex === 'M' && data.metrics.waist > 94) criteria.push('Waist > 94 cm (M)');
      if (data.profile.sex === 'F' && data.metrics.waist > 80) criteria.push('Waist > 80 cm (F)');
    }
    if (data.history.onBPMeds || (data.history.bpSystolic && data.history.bpSystolic >= 130)) criteria.push('প্রেসার/রক্তচাপ ঝুঁকি');
    if (data.history.hasDiabetes || (data.history.glucosePreMeal && data.history.glucosePreMeal >= 5.6)) criteria.push('ডায়াবেটিস ঝুঁকি');
    if (data.history.triglycerides && data.history.triglycerides >= 1.7) criteria.push('ট্রাইগ্লিসারাইড ঝুঁকি');
    return criteria;
  }, [data, bmi]);

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-12 animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="bg-slate-900 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">আপনার রিস্ক এস্টিমেশন রিপোর্ট</h2>
          <p className="text-slate-400">প্রস্তুত করা হয়েছে: {new Date().toLocaleDateString('bn-BD')}</p>
        </div>

        <div className="p-8 space-y-8">
          {/* FIB-4 Score Display */}
          {fib4Score !== null ? (
            <div className={`p-8 rounded-2xl border-2 flex flex-col md:flex-row items-center gap-8 ${
              riskLevel === 'low' ? 'bg-green-50 border-green-200' : 
              riskLevel === 'moderate' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="text-center md:text-left flex-1">
                <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">আপনার FIB-4 স্কোর</p>
                <div className={`text-6xl font-black mb-2 ${
                  riskLevel === 'low' ? 'text-green-600' : 
                  riskLevel === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {fib4Score}
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-bold ${
                  riskLevel === 'low' ? 'bg-green-600 text-white' : 
                  riskLevel === 'moderate' ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {riskLevel === 'low' ? 'কম ঝুঁকি (Low Risk)' : 
                   riskLevel === 'moderate' ? 'মাঝারি ঝুঁকি (Indeterminate)' : 'উচ্চ ঝুঁকি (High Risk)'}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <h3 className="font-bold text-slate-800 text-lg">পরামর্শ:</h3>
                <p className="text-slate-700 leading-relaxed">
                  {riskLevel === 'low' && '১) আপনার ফ্যাটি লিভারের জন্য এই মুহূর্তে চিন্তিত হবার কিছু নেই। কিছু স্বাস্থ্যকর নিয়ম মেনে চলুন যেমন পরিমিত খাবার ও নিয়মিত ব্যায়াম।'}
                  {riskLevel === 'moderate' && '২) আপনার ফ্যাটি লিভারের জন্য গ্যাস্ট্রোএন্টারোলজিস্ট বা হেপাটোলজিস্টের পরামর্শ নেওয়া উচিত এবং কিছু পরীক্ষা নিরীক্ষা করতে হবে, পাশাপাশি কিছু নিয়ম মানতে হবে।'}
                  {riskLevel === 'high' && '৩) আপনার ফ্যাটি লিভারের সমস্যা গুরুতর, আপনি দ্রুত গ্যাস্ট্রোএন্টারোলজিস্ট বা হেপাটোলজিস্টের পরামর্শ নিন। পাশাপাশি কিছু স্বাস্থ্যকর নিয়ম মানতে হবে।'}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4">
              <Info className="text-blue-600 shrink-0" size={24} />
              <div>
                <p className="font-bold text-slate-800">FIB-4 স্কোর গণনা করা সম্ভব হয়নি</p>
                <p className="text-slate-600 text-sm">সঠিক স্কোরের জন্য আপনার রক্তের প্লাটিলেট, AST এবং ALT এর মান প্রয়োজন।</p>
              </div>
            </div>
          )}

          {/* Risk Factors Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle className="text-orange-500" size={20} />
                ঝুঁকির কারণসমূহ
              </h3>
              {adultCriteriaMet.length > 0 ? (
                <ul className="space-y-3">
                  {adultCriteriaMet.map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <CheckCircle2 size={16} /> কোনো উল্লেখযোগ্য ঝুঁকি পাওয়া যায়নি।
                </p>
              )}
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldAlert className="text-blue-600" size={20} />
                পরবর্তী স্ক্রিনিং
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                আপনার ফ্যাটি লিভারের স্ক্রিনিং-এর জন্য নিম্নলিখিত পরীক্ষাগুলো করার পরামর্শ দেওয়া হচ্ছে:
              </p>
              <div className="flex flex-wrap gap-2">
                {['আল্ট্রাসাউন্ড', 'CBC', 'ALT', 'AST'].map(t => (
                  <span key={t} className="bg-white px-3 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="pt-8 border-t space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => window.print()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} /> রিপোর্ট ডাউনলোড করুন
              </button>
              <button 
                onClick={onReset}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold py-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} /> পুনরায় পরীক্ষা করুন
              </button>
            </div>
            <p className="text-center text-xs text-slate-400">
              আপনার সকল তথ্য আমাদের ডাটাবেজে সংরক্ষিত হয়েছে। আমরা এটি আপনার পরবর্তী ভিজিটের জন্য ব্যবহার করতে পারি।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
