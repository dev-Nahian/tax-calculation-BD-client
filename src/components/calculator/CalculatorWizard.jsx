import React, { useState, useEffect } from 'react';
import {
  Calendar,
  User,
  DollarSign,
  PiggyBank,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useTax } from '../../hooks/useTax';
import StepAssessmentYear from './StepAssessmentYear';
import StepAboutYou from './StepAboutYou';
import StepIncome from './StepIncome';
import StepDeductions from './StepDeductions';
import StepReview from './StepReview';
import StepResult from './StepResult';
import { getStorageItem, setStorageItem } from '../../utils/storage';

const STORAGE_STEP_KEY = 'taxbd_calculator_step';

export const CalculatorWizard = () => {
  const {
    assessmentYear,
    setAssessmentYear,
    category,
    setCategory,
    zone,
    setZone,
    inputs,
    updateInputField,
    updateInvestmentField,
    calculateTax,
    results,
    loading,
    resetInputs,
  } = useTax();

  const [currentStep, setCurrentStep] = useState(() => {
    return getStorageItem(STORAGE_STEP_KEY, 1);
  });

  const [age, setAge] = useState(30);
  const [disabledChildrenCount, setDisabledChildrenCount] = useState(0);
  const [otherInformation, setOtherInformation] = useState({
    netWealth: 0,
    ownsMultipleCars: false,
    ownsLargeHouseProperty: false,
  });

  // Save current step to localStorage
  useEffect(() => {
    setStorageItem(STORAGE_STEP_KEY, currentStep);
  }, [currentStep]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCalculate = async () => {
    const overridePayload = {
      ...inputs,
      age,
      disabledChildrenCount,
      otherInformation,
    };
    await calculateTax(overridePayload);
    setCurrentStep(6);
  };

  const handleRecalculate = () => {
    setCurrentStep(1);
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all inputs and start fresh?')) {
      resetInputs();
      setCurrentStep(1);
      setStorageItem(STORAGE_STEP_KEY, 1);
    }
  };

  const stepsConfig = [
    { number: 1, title: 'Year', label: 'Assessment Year', icon: Calendar },
    { number: 2, title: 'Profile', label: 'About You', icon: User },
    { number: 3, title: 'Income', label: 'Your Income', icon: DollarSign },
    { number: 4, title: 'Rebates', label: 'Deductions / Rebates', icon: PiggyBank },
    { number: 5, title: 'Review', label: 'Review & Compute', icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Wizard Header Progress Bar (Visible on Steps 1 to 5) */}
      {currentStep <= 5 && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Step {currentStep} of 5 — {stepsConfig[currentStep - 1]?.label}
            </span>

            <button
              type="button"
              onClick={handleResetAll}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Calculator
            </button>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {stepsConfig.map((s) => {
              const isCompleted = currentStep > s.number;
              const isCurrent = currentStep === s.number;
              const Icon = s.icon;

              return (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => setCurrentStep(s.number)}
                  className={`flex flex-col items-center text-center group transition-all p-1 sm:p-2 rounded-xl ${
                    isCurrent
                      ? 'bg-emerald-50/80 ring-1 ring-emerald-500/30'
                      : isCompleted
                      ? 'hover:bg-slate-50'
                      : 'opacity-60 cursor-default'
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm mb-1.5 transition-all ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold truncate max-w-full ${
                      isCurrent ? 'text-emerald-700' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress track */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Wizard Step Content Area */}
      <div className="pb-24 sm:pb-8">
        {currentStep === 1 && (
          <StepAssessmentYear
            selectedYear={assessmentYear}
            onSelectYear={(yr) => setAssessmentYear(yr)}
          />
        )}

        {currentStep === 2 && (
          <StepAboutYou
            category={category}
            onSelectCategory={(cat) => setCategory(cat)}
            age={age}
            onChangeAge={(val) => setAge(val)}
            zone={zone}
            onSelectZone={(z) => setZone(z)}
            disabledChildrenCount={disabledChildrenCount}
            onChangeDisabledChildren={(count) => setDisabledChildrenCount(count)}
          />
        )}

        {currentStep === 3 && (
          <StepIncome inputs={inputs} onUpdateField={updateInputField} />
        )}

        {currentStep === 4 && (
          <StepDeductions
            investments={inputs.investments}
            onUpdateInvestment={updateInvestmentField}
            otherInformation={otherInformation}
            onUpdateOtherInfo={(field, val) =>
              setOtherInformation((prev) => ({ ...prev, [field]: val }))
            }
          />
        )}

        {currentStep === 5 && (
          <StepReview
            assessmentYear={assessmentYear}
            category={category}
            zone={zone}
            age={age}
            disabledChildrenCount={disabledChildrenCount}
            inputs={inputs}
            investments={inputs.investments || {}}
            onEditStep={(step) => setCurrentStep(step)}
            onCalculate={handleCalculate}
            loading={loading}
          />
        )}

        {currentStep === 6 && (
          <StepResult
            results={results}
            onRecalculate={handleRecalculate}
            assessmentYear={assessmentYear}
          />
        )}
      </div>

      {/* Desktop & Tablet Bottom Navigation Buttons (Steps 1 to 4) */}
      {currentStep <= 4 && (
        <div className="hidden sm:flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400 bg-white'
                : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Sticky Bottom Navigation Bar (Steps 1 to 4) */}
      {currentStep <= 4 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 flex items-center justify-between gap-3 shadow-2xl">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs border text-center flex items-center justify-center gap-1.5 ${
              currentStep === 1
                ? 'opacity-30 border-slate-200 text-slate-400'
                : 'border-slate-300 text-slate-700 bg-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-1.5"
          >
            Continue <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CalculatorWizard;
