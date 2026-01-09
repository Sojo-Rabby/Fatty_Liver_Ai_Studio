
import React, { useState, useCallback } from 'react';
import { 
  Activity, 
  Stethoscope, 
  ClipboardList, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle,
  Download,
  ShieldAlert
} from 'lucide-react';
import { AssessmentState } from './types';
import AssessmentForm from './components/AssessmentForm';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [isAssessmentDone, setIsAssessmentDone] = useState(false);
  const [formData, setFormData] = useState<AssessmentState>({
    profile: { name: '', age: 0, sex: 'M', phone: '', address: '', email: '' },
    metrics: { weightKnown: false, heightKnown: false, waistKnown: false },
    history: { onBPMeds: false, hasDiabetes: false, hasCholesterolIssues: false },
    labs: { hasLabs: false }
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => Math.max(0, prev - 1));

  const handleStart = () => setStep(1);

  const handleSubmit = (data: AssessmentState) => {
    setFormData(data);
    setIsAssessmentDone(true);
  };

  const handleReset = () => {
    setStep(0);
    setIsAssessmentDone(false);
    setFormData({
      profile: { name: '', age: 0, sex: 'M', phone: '', address: '', email: '' },
      metrics: { weightKnown: false, heightKnown: false, waistKnown: false },
      history: { onBPMeds: false, hasDiabetes: false, hasCholesterolIssues: false },
      labs: { hasLabs: false }
    });
  };

  if (isAssessmentDone) {
    return <ResultDisplay data={formData} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Activity size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-800">লিভার রিস্ক মিটার</h1>
          </div>
          {step > 0 && (
            <div className="text-sm font-medium text-slate-500">
              ধাপ {step} / 4
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {step === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 text-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <Stethoscope className="mx-auto mb-4" size={64} />
              <h2 className="text-3xl font-bold mb-4">ফ্যাটি লিভার রিস্ক চেকআপ</h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
                আপনার লাইফস্টাইল এবং স্বাস্থ্য তথ্যের ভিত্তিতে আপনি কি ফ্যাটি লিভারের ঝুঁকিতে আছেন? এই সহজ টুলটি ব্যবহার করে কয়েক মিনিটেই আপনার লিভারের স্বাস্থ্য সম্পর্কে জানুন।
              </p>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8 text-center">
                <div className="p-4 rounded-xl bg-slate-50">
                  <ClipboardList className="mx-auto text-blue-600 mb-2" />
                  <h3 className="font-bold">সহজ প্রশ্নাবলি</h3>
                  <p className="text-sm text-slate-600">আপনার শারীরিক তথ্য প্রদান করুন</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50">
                  <Activity className="mx-auto text-blue-600 mb-2" />
                  <h3 className="font-bold">সঠিক ফলাফল</h3>
                  <p className="text-sm text-slate-600">FIB-4 স্কোর ও রিস্ক এনালাইসিস</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50">
                  <ShieldAlert className="mx-auto text-blue-600 mb-2" />
                  <h3 className="font-bold">বিশেষজ্ঞ পরামর্শ</h3>
                  <p className="text-sm text-slate-600">পরবর্তী পদক্ষেপের নির্দেশনা</p>
                </div>
              </div>
              <button 
                onClick={handleStart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                রিস্ক সম্পর্কে জানতে চাই 
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <AssessmentForm 
            step={step} 
            onNext={handleNext} 
            onBack={handleBack} 
            onSubmit={handleSubmit}
          />
        )}
      </main>

      <footer className="py-8 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} লিভার হেলথ সেন্টার। এই অ্যাপ্লিকেশনটি শুধুমাত্র সচেতনতার জন্য। চূড়ান্ত সিদ্ধান্তের জন্য চিকিৎসকের পরামর্শ নিন।</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
