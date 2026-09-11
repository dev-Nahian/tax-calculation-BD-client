import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateTaxEstimateApi } from '../services/taxService';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';

const initialInputs = {
  salaryIncome: 600000,
  houseRentAllowance: 180000,
  medicalAllowance: 36000,
  conveyanceAllowance: 24000,
  festivalBonus: 80000,
  otherAllowances: 0,
  businessIncome: 0,
  housePropertyIncome: 0,
  agricultureIncome: 0,
  capitalGains: 0,
  otherIncome: 0,
  investments: {
    dps: 120000,
    sanchayapatra: 0,
    lifeInsurance: 25000,
    stockMarket: 50000,
    providentFund: 60000,
    otherEligible: 0,
  },
};

const TaxContext = createContext(null);

export const TaxProvider = ({ children }) => {
  const [assessmentYear, setAssessmentYear] = useState('2024-2025');
  const [category, setCategory] = useState('general');
  const [zone, setZone] = useState('dhaka_chattogram');
  const [inputs, setInputs] = useState(() => {
    return getStorageItem(STORAGE_KEYS.CALCULATOR_DRAFT, initialInputs);
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync inputs to localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CALCULATOR_DRAFT, inputs);
  }, [inputs]);

  // Client-side instant preview calculation fallback
  const calculateLocalEstimate = (currentInputs, currentCategory, currentZone) => {
    const basic = Number(currentInputs.salaryIncome || 0);
    const houseRent = Number(currentInputs.houseRentAllowance || 0);
    const medical = Number(currentInputs.medicalAllowance || 0);
    const conveyance = Number(currentInputs.conveyanceAllowance || 0);
    const bonus = Number(currentInputs.festivalBonus || 0);
    const others = Number(currentInputs.otherAllowances || 0);

    const otherSources =
      Number(currentInputs.businessIncome || 0) +
      Number(currentInputs.housePropertyIncome || 0) +
      Number(currentInputs.agricultureIncome || 0) +
      Number(currentInputs.capitalGains || 0) +
      Number(currentInputs.otherIncome || 0);

    const grossSalary = basic + houseRent + medical + conveyance + bonus + others;
    const grossIncome = grossSalary + otherSources;

    // Standard salary exemptions
    const houseRentExempt = Math.min(houseRent, basic * 0.5, 300000);
    const medicalExempt = Math.min(medical, basic * 0.1, 120000);
    const conveyanceExempt = Math.min(conveyance, 30000);
    const totalExemptions = houseRentExempt + medicalExempt + conveyanceExempt;

    const taxableIncome = Math.max(0, grossIncome - totalExemptions);

    // Category threshold
    const thresholds = {
      general: 350000,
      female: 400000,
      senior: 400000,
      disabled: 475000,
      gazetted_freedom_fighter: 500000,
      parent_of_disabled: 400000,
    };
    const exemptionLimit = thresholds[currentCategory] || 350000;

    // Progressive slabs calculation
    let remaining = Math.max(0, taxableIncome - exemptionLimit);
    let grossTax = 0;
    const breakdown = [
      {
        slab: `Tax-Free Limit (up to ৳${exemptionLimit.toLocaleString('en-IN')})`,
        rate: 0,
        amountInSlab: Math.min(taxableIncome, exemptionLimit),
        taxInSlab: 0,
      },
    ];

    const slabs = [
      { limit: 100000, rate: 0.05, label: 'Next ৳1,00,000 (5%)' },
      { limit: 400000, rate: 0.10, label: 'Next ৳4,00,000 (10%)' },
      { limit: 500000, rate: 0.15, label: 'Next ৳5,00,000 (15%)' },
      { limit: 500000, rate: 0.20, label: 'Next ৳5,00,000 (20%)' },
      { limit: Infinity, rate: 0.25, label: 'Remaining Balance (25%)' },
    ];

    for (const slab of slabs) {
      if (remaining <= 0) break;
      const taxed = slab.limit === Infinity ? remaining : Math.min(remaining, slab.limit);
      const tax = taxed * slab.rate;
      grossTax += tax;
      remaining -= taxed;

      breakdown.push({
        slab: slab.label,
        rate: slab.rate * 100,
        amountInSlab: Math.round(taxed),
        taxInSlab: Math.round(tax),
      });
    }

    // Investment Rebate (15% on lower of actual, 20% of taxable income, or 10 lakh)
    const investments = currentInputs.investments || {};
    const totalInvestments = Object.values(investments).reduce((acc, val) => acc + Number(val || 0), 0);
    const allowableInvestment = Math.min(totalInvestments, taxableIncome * 0.2, 1000000);
    const rebate = allowableInvestment * 0.15;

    const minTaxMap = {
      dhaka_chattogram: 5000,
      other_city_corporation: 4000,
      non_city_corporation: 3000,
    };
    const minimumTax = minTaxMap[currentZone] || 5000;

    let finalTaxLiability = 0;
    if (taxableIncome > exemptionLimit) {
      const netAfterRebate = Math.max(0, grossTax - rebate);
      finalTaxLiability = Math.max(netAfterRebate, minimumTax);
    }

    const effectiveTaxRate = grossIncome > 0 ? ((finalTaxLiability / grossIncome) * 100).toFixed(2) : 0;

    return {
      grossIncome: Math.round(grossIncome),
      totalExemptions: Math.round(totalExemptions),
      taxableIncome: Math.round(taxableIncome),
      exemptionLimit,
      grossTaxLiability: Math.round(grossTax),
      eligibleInvestment: Math.round(allowableInvestment),
      investmentRebate: Math.round(rebate),
      netTaxBeforeMinimum: Math.round(Math.max(0, grossTax - rebate)),
      minimumTax,
      finalTaxLiability: Math.round(finalTaxLiability),
      effectiveTaxRate: Number(effectiveTaxRate),
      slabBreakdown: breakdown,
    };
  };

  const calculateTax = async (overrideInputs = null) => {
    setLoading(true);
    setError(null);
    const activeInputs = overrideInputs || inputs;

    try {
      // Build standard payload for TaxEngine
      const payload = {
        assessmentYear,
        taxpayerProfile: {
          category,
          zone,
          hasDisabledChild: Boolean(activeInputs.disabledChildrenCount > 0 || activeInputs.hasDisabledChild),
          disabledChildrenCount: Number(activeInputs.disabledChildrenCount || 0),
          isGazettedFreedomFighter: category === 'freedomFighter',
          age: Number(activeInputs.age || 30),
        },
        income: {
          salary: {
            basicSalary: Number(activeInputs.salaryIncome || 0),
            houseRentAllowance: Number(activeInputs.houseRentAllowance || 0),
            medicalAllowance: Number(activeInputs.medicalAllowance || 0),
            conveyanceAllowance: Number(activeInputs.conveyanceAllowance || 0),
            festivalBonus: Number(activeInputs.festivalBonus || 0),
            otherAllowances: Number(activeInputs.otherAllowances || 0),
          },
          houseProperty: Number(activeInputs.housePropertyIncome || 0),
          agriculture: Number(activeInputs.agricultureIncome || 0),
          business: Number(activeInputs.businessIncome || 0),
          capitalGains: Number(activeInputs.capitalGains || 0),
          financialAssets: Number(activeInputs.financialAssets || 0),
          otherSources: Number(activeInputs.otherIncome || 0),
        },
        rebates: {
          dps: Number(activeInputs.investments?.dps || 0),
          sanchayapatra: Number(activeInputs.investments?.sanchayapatra || 0),
          lifeInsurance: Number(activeInputs.investments?.lifeInsurance || 0),
          stockMarket: Number(activeInputs.investments?.stockMarket || 0),
          providentFund: Number(activeInputs.investments?.providentFund || 0),
          otherEligible: Number(activeInputs.investments?.otherEligible || 0),
          ...(activeInputs.investments || {}),
        },
        otherInformation: {
          netWealth: Number(activeInputs.otherInformation?.netWealth || activeInputs.netWealth || 0),
          ownsMultipleCars: Boolean(activeInputs.otherInformation?.ownsMultipleCars ?? activeInputs.ownsMultipleCars),
          ownsLargeHouseProperty: Boolean(activeInputs.otherInformation?.ownsLargeHouseProperty ?? activeInputs.ownsLargeHouseProperty),
        },
      };

      const res = await calculateTaxEstimateApi(payload);

      if (res?.data) {
        const d = res.data;
        setResults({
          ...d,
          grossIncome: d.grossIncome ?? d.totalGrossIncome ?? 0,
          totalExemptions: d.totalExemptions ?? 0,
          taxableIncome: d.taxableIncome ?? 0,
          grossTaxLiability: d.regularTax ?? d.grossTaxLiability ?? 0,
          eligibleInvestment: d.allowableInvestment ?? d.eligibleInvestment ?? 0,
          investmentRebate: d.rebate ?? d.investmentRebate ?? 0,
          netTaxBeforeMinimum: d.netTaxBeforeMinimum ?? Math.max(0, (d.regularTax || 0) - (d.rebate || 0)),
          minimumTax: d.minimumTax ?? 0,
          surcharge: d.surcharge ?? 0,
          finalTaxLiability: d.totalTax ?? d.finalTaxLiability ?? 0,
          effectiveTaxRate: d.effectiveTaxRate ?? 0,
          slabBreakdown: d.slabBreakdown || [],
          sources: d.sources || [],
        });
      } else {
        const localRes = calculateLocalEstimate(activeInputs, category, zone);
        setResults(localRes);
      }
    } catch {
      // Resilient fallback to local calculation
      const localRes = calculateLocalEstimate(activeInputs, category, zone);
      setResults(localRes);
    } finally {
      setLoading(false);
    }
  };

  const updateInputField = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: Number(value) || 0,
    }));
  };

  const updateInvestmentField = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      investments: {
        ...prev.investments,
        [field]: Number(value) || 0,
      },
    }));
  };

  const resetInputs = () => {
    setInputs(initialInputs);
    setResults(null);
  };

  return (
    <TaxContext.Provider
      value={{
        assessmentYear,
        setAssessmentYear,
        category,
        setCategory,
        zone,
        setZone,
        inputs,
        setInputs,
        results,
        setResults,
        loading,
        error,
        updateInputField,
        updateInvestmentField,
        calculateTax,
        calculateLocalEstimate,
        resetInputs,
      }}
    >
      {children}
    </TaxContext.Provider>
  );
};

export const useTax = () => {
  const context = useContext(TaxContext);
  if (!context) {
    throw new Error('useTax must be used within a TaxProvider');
  }
  return context;
};
