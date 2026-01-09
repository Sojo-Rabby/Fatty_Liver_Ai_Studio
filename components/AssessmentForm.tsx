
import React, { useState } from 'react';
import { AssessmentState, UserProfile, BodyMetrics, MedicalHistory, ClinicalLabs } from '../types';
import { ChevronRight, ChevronLeft, Save } from 'lucide-react';

interface Props {
  step: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: (data: AssessmentState) => void;
}

const AssessmentForm: React.FC<Props> = ({ step, onNext, onBack, onSubmit }) => {
  const [formData, setFormData] = useState<AssessmentState>({
    profile: { name: '', age: 0, sex: 'M', phone: '', address: '', email: '' },
    metrics: { weightKnown: false, heightKnown: false, waistKnown: false },
    history: { onBPMeds: false, hasDiabetes: false, hasCholesterolIssues: false },
    labs: { hasLabs: false }
  });

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
  };

  const updateMetrics = (field: keyof BodyMetrics, value: any) => {
    setFormData(prev => ({ ...prev, metrics: { ...prev.metrics, [field]: value } }));
  };

  const updateHistory = (field: keyof MedicalHistory, value: any) => {
    setFormData(prev => ({ ...prev, history: { ...prev.history, [field]: value } }));
  };

  const updateLabs = (field: keyof ClinicalLabs, value: any) => {
    setFormData(prev => ({ ...prev, labs: { ...prev.labs, [field]: value } }));
  };

  const isStep1Valid = formData.profile.name && formData.profile.age > 0;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">নিজের সম্পর্কে একটু বলুন</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">নাম</label>
              <input 
                type="text" 
                value={formData.profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                placeholder="আপনার নাম লিখুন"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">বয়স</label>
              <input 
                type="number" 
                value={formData.profile.age || ''}
                onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                placeholder="আপনার বয়স লিখুন"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">লিঙ্গ</label>
              <select 
                value={formData.profile.sex}
                onChange={(e) => updateProfile('sex', e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              >
                <option value="M">পুরুষ</option>
                <option value="F">মহিলা</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">ফোন নম্বর</label>
              <input 
                type="tel" 
                value={formData.profile.phone}
                onChange={(e) => updateProfile('phone', e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                placeholder="ফোন নম্বর"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">ঠিকানা</label>
            <input 
              type="text" 
              value={formData.profile.address}
              onChange={(e) => updateProfile('address', e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              placeholder="আপনার ঠিকানা"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">ইমেইল</label>
            <input 
              type="email" 
              value={formData.profile.email}
              onChange={(e) => updateProfile('email', e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              placeholder="আপনার ইমেইল"
            />
          </div>
        </div>
      )}

      {/* Step 2: Physical Metrics */}
      {step === 2 && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">শারীরিক তথ্য</h2>
          
          <div className="space-y-4">
            <p className="font-semibold text-slate-700">আপনি কি নিজের ওজন জানেন?</p>
            <div className="flex gap-4">
              <button 
                onClick={() => updateMetrics('weightKnown', true)}
                className={`flex-1 py-3 rounded-lg border font-medium ${formData.metrics.weightKnown ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >হ্যাঁ</button>
              <button 
                onClick={() => updateMetrics('weightKnown', false)}
                className={`flex-1 py-3 rounded-lg border font-medium ${!formData.metrics.weightKnown ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >না</button>
            </div>
            {formData.metrics.weightKnown && (
              <div className="animate-in slide-in-from-top-2">
                <input 
                  type="number" 
                  placeholder="ওজন লিখুন (কেজি)" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateMetrics('weight', parseFloat(e.target.value))}
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <p className="font-semibold text-slate-700">আপনি কি নিজের উচ্চতা জানেন?</p>
            <div className="flex gap-4">
              <button 
                onClick={() => updateMetrics('heightKnown', true)}
                className={`flex-1 py-3 rounded-lg border font-medium ${formData.metrics.heightKnown ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >হ্যাঁ</button>
              <button 
                onClick={() => updateMetrics('heightKnown', false)}
                className={`flex-1 py-3 rounded-lg border font-medium ${!formData.metrics.heightKnown ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >না</button>
            </div>
            {formData.metrics.heightKnown && (
              <div className="animate-in slide-in-from-top-2">
                <input 
                  type="number" 
                  placeholder="উচ্চতা লিখুন (সেন্টিমিটার)" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateMetrics('height', parseFloat(e.target.value))}
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <p className="font-semibold text-slate-700">আপনি কি নিজের কোমরের মাপ জানেন?</p>
            <div className="flex gap-4">
              <button 
                onClick={() => updateMetrics('waistKnown', true)}
                className={`flex-1 py-3 rounded-lg border font-medium ${formData.metrics.waistKnown ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >হ্যাঁ</button>
              <button 
                onClick={() => updateMetrics('waistKnown', false)}
                className={`flex-1 py-3 rounded-lg border font-medium ${!formData.metrics.waistKnown ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >না</button>
            </div>
            {formData.metrics.waistKnown && (
              <div className="animate-in slide-in-from-top-2">
                <input 
                  type="number" 
                  placeholder="কোমরের মাপ লিখুন (সেন্টিমিটার)" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateMetrics('waist', parseFloat(e.target.value))}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Medical History */}
      {step === 3 && (
        <div className="space-y-10 animate-in fade-in duration-500">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">স্বাস্থ্যগত ইতিহাস</h2>
          
          <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="font-semibold text-slate-700">আপনি কি রক্তচাপের জন্য প্রেসারের ঔষধ খাচ্ছেন?</p>
            <div className="flex gap-4">
              <button 
                onClick={() => updateHistory('onBPMeds', true)}
                className={`flex-1 py-2 rounded-lg border transition-colors ${formData.history.onBPMeds ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >হ্যাঁ</button>
              <button 
                onClick={() => updateHistory('onBPMeds', false)}
                className={`flex-1 py-2 rounded-lg border transition-colors ${!formData.history.onBPMeds ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >না</button>
            </div>
            {!formData.history.onBPMeds && (
              <div className="space-y-3 pt-2">
                <p className="text-sm font-medium text-slate-500">আপনি কি কখনো প্রেসার বা রক্তচাপ মেপেছেন?</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => updateHistory('bpMeasured', true)}
                    className={`px-6 py-2 rounded-lg border text-sm ${formData.history.bpMeasured ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-slate-200'}`}
                  >হ্যাঁ</button>
                  <button 
                    onClick={() => updateHistory('bpMeasured', false)}
                    className={`px-6 py-2 rounded-lg border text-sm ${formData.history.bpMeasured === false ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-slate-200'}`}
                  >না</button>
                </div>
                {formData.history.bpMeasured && (
                  <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                    <input type="number" placeholder="Systolic (উপরিভাগ)" className="p-3 bg-white border border-slate-200 rounded-lg outline-none" onChange={(e) => updateHistory('bpSystolic', parseInt(e.target.value))} />
                    <input type="number" placeholder="Diastolic (নিম্নভাগ)" className="p-3 bg-white border border-slate-200 rounded-lg outline-none" onChange={(e) => updateHistory('bpDiastolic', parseInt(e.target.value))} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="font-semibold text-slate-700">আপনার কি ডায়াবেটিস আছে বা ডায়াবেটিসের জন্য ঔষধ খাচ্ছেন?</p>
            <div className="flex gap-4">
              <button 
                onClick={() => updateHistory('hasDiabetes', true)}
                className={`flex-1 py-2 rounded-lg border transition-colors ${formData.history.hasDiabetes ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >হ্যাঁ</button>
              <button 
                onClick={() => updateHistory('hasDiabetes', false)}
                className={`flex-1 py-2 rounded-lg border transition-colors ${!formData.history.hasDiabetes ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >না</button>
            </div>
            {!formData.history.hasDiabetes && (
              <div className="space-y-3 pt-2">
                <p className="text-sm font-medium text-slate-500">আপনি কি কখনো ডায়াবেটিস মেপেছেন?</p>
                <div className="flex gap-4">
                  <button onClick={() => updateHistory('diabetesMeasured', true)} className={`px-6 py-2 rounded-lg border text-sm ${formData.history.diabetesMeasured ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-slate-200'}`}>হ্যাঁ</button>
                  <button onClick={() => updateHistory('diabetesMeasured', false)} className={`px-6 py-2 rounded-lg border text-sm ${formData.history.diabetesMeasured === false ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-slate-200'}`}>না</button>
                </div>
                {formData.history.diabetesMeasured && (
                  <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                    <input type="number" placeholder="খাওয়ার আগে (mmol/L)" className="p-3 bg-white border border-slate-200 rounded-lg outline-none" onChange={(e) => updateHistory('glucosePreMeal', parseFloat(e.target.value))} />
                    <input type="number" placeholder="খাওয়ার পরে (mmol/L)" className="p-3 bg-white border border-slate-200 rounded-lg outline-none" onChange={(e) => updateHistory('glucosePostMeal', parseFloat(e.target.value))} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="font-semibold text-slate-700">আপনার কি রক্তে কোলেস্টেরলে সমস্যা আছে বা এই জন্য ঔষধ খাচ্ছেন?</p>
            <div className="flex gap-4">
              <button onClick={() => updateHistory('hasCholesterolIssues', true)} className={`flex-1 py-2 rounded-lg border transition-colors ${formData.history.hasCholesterolIssues ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}>হ্যাঁ</button>
              <button onClick={() => updateHistory('hasCholesterolIssues', false)} className={`flex-1 py-2 rounded-lg border transition-colors ${!formData.history.hasCholesterolIssues ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}>না</button>
            </div>
            {!formData.history.hasCholesterolIssues && (
              <div className="space-y-3 pt-2">
                <p className="text-sm font-medium text-slate-500">আপনি কি কখনো রক্তে কোলেস্টেরল মেপেছেন?</p>
                <div className="flex gap-4">
                  <button onClick={() => updateHistory('cholesterolMeasured', true)} className={`px-6 py-2 rounded-lg border text-sm ${formData.history.cholesterolMeasured ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-slate-200'}`}>হ্যাঁ</button>
                  <button onClick={() => updateHistory('cholesterolMeasured', false)} className={`px-6 py-2 rounded-lg border text-sm ${formData.history.cholesterolMeasured === false ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-slate-200'}`}>না</button>
                </div>
                {formData.history.cholesterolMeasured && (
                  <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                    <input type="number" placeholder="HDL" className="p-3 bg-white border border-slate-200 rounded-lg outline-none" onChange={(e) => updateHistory('hdl', parseFloat(e.target.value))} />
                    <input type="number" placeholder="Triglyceride" className="p-3 bg-white border border-slate-200 rounded-lg outline-none" onChange={(e) => updateHistory('triglycerides', parseFloat(e.target.value))} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 4: Labs (FIB-4) */}
      {step === 4 && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">ক্লিনিক্যাল ল্যাব রিপোর্ট</h2>
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-blue-800 font-medium leading-relaxed">
              আপনার ফ্যাটি লিভারের জন্য স্ক্রিনিং করা উচিত। আপনার কি আল্ট্রাসাউন্ড এবং ফ্যাটি লিভার সংক্রান্ত রক্তের পরীক্ষা (CBC, ALT, AST) করা আছে?
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <button 
                onClick={() => updateLabs('hasLabs', true)}
                className={`flex-1 py-3 rounded-lg border font-medium ${formData.labs.hasLabs ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >হ্যাঁ, রিপোর্ট আছে</button>
              <button 
                onClick={() => updateLabs('hasLabs', false)}
                className={`flex-1 py-3 rounded-lg border font-medium ${!formData.labs.hasLabs ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600'}`}
              >না, নেই</button>
            </div>

            {formData.labs.hasLabs && (
              <div className="space-y-4 animate-in slide-in-from-top-2">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Platelet (প্লাটিলেট)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 250"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                      onChange={(e) => updateLabs('platelet', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">AST (এসজিওটি)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 35"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                      onChange={(e) => updateLabs('ast', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">ALT (এসজিপিটি)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 40"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                      onChange={(e) => updateLabs('alt', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="mt-12 pt-8 border-t flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft size={20} /> আগের ধাপ
        </button>

        {step < 4 ? (
          <button 
            onClick={onNext}
            disabled={step === 1 && !isStep1Valid}
            className={`flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg ${step === 1 && !isStep1Valid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            পরবর্তী <ChevronRight size={20} />
          </button>
        ) : (
          <button 
            onClick={() => onSubmit(formData)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            জমা দিন ও ফলাফল দেখুন <Save size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
