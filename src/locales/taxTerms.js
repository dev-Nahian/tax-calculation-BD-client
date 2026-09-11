/**
 * Bangladesh Tax & Legal Terminology Glossary
 * Contains accurate Bengali and English terms, explanations, and statutory references.
 * Used for dual-labeling throughout TaxBD to ensure high clarity for both beginners and tax experts.
 */

export const TAX_TERMS = {
  taxableIncome: {
    bn: 'করযোগ্য আয়',
    en: 'Taxable Income',
    shortEn: 'Taxable Income',
    section: 'Section 32, Income Tax Act 2023',
    descBn: 'মোট আয় থেকে করমুক্ত অংশ ও অনুমোদিত খরচ বাদে যে অংশের ওপর কর ধার্য করা হয়।',
    descEn: 'Total gross income minus allowable deductions and statutory tax-free exemptions upon which tax slabs apply.'
  },
  taxFreeThreshold: {
    bn: 'করমুক্ত সীমা',
    en: 'Tax-Free Threshold',
    shortEn: 'Exemption Limit',
    section: 'Finance Act Schedule 1',
    descBn: 'যে পরিমাণ আয় পর্যন্ত কোনো আয়কর প্রদান করতে হয় না (সাধারণ করদাতার জন্য ৩,৫০,০০০ টাকা)।',
    descEn: 'The baseline annual income amount on which 0% tax is levied (৳3,50,000 for general individuals in AY 2024-25).'
  },
  taxRebate: {
    bn: 'কর রেয়াত',
    en: 'Tax Rebate',
    shortEn: 'Investment Rebate',
    section: 'Section 78, Income Tax Act 2023',
    descBn: 'অনুমোদিত খাতে (যেমন ডিপিএস, জীবন বীমা, সঞ্চয়পত্র) বিনিয়োগের বিপরীতে প্রদেয় কর থেকে ছাড়।',
    descEn: 'Statutory reduction directly deducted from regular tax liability for eligible investments.'
  },
  assessmentYear: {
    bn: 'করবর্ষ',
    en: 'Assessment Year (AY)',
    shortEn: 'Assessment Year',
    section: 'Section 2(9), Income Tax Act 2023',
    descBn: 'যে ১২ মাসের অর্থবছরে (১ জুলাই - ৩০ জুন) বিগত আয়বর্ষের আয়ের ওপর কর নিরূপণ ও রিটার্ন দাখিল করা হয়।',
    descEn: 'The 12-month fiscal period (1 July - 30 June) in which the income of the previous income year is assessed.'
  },
  incomeYear: {
    bn: 'আয়বর্ষ',
    en: 'Income Year (IY)',
    shortEn: 'Income Year',
    section: 'Section 2(44), Income Tax Act 2023',
    descBn: 'যে ১২ মাসে প্রকৃতপক্ষে অর্থ উপার্জন করা হয়েছে (যেমন ২০২৩-২৪ আয়বর্ষের কর ২০২৪-২৫ করবর্ষে প্রদেয়)।',
    descEn: 'The financial year (1 July to 30 June) during which the income was actually earned.'
  },
  taxSlabs: {
    bn: 'প্রগতিশীল কর ধাপ',
    en: 'Progressive Tax Slabs',
    shortEn: 'Tax Slabs',
    section: 'Finance Act',
    descBn: 'আয়ের বিভিন্ন স্তরে ক্রমান্বয়ে ৫%, ১০%, ১৫%, ২০% এবং ২৫% হারে কর নির্ধারণের ধাপ।',
    descEn: 'Graduated tiered percentages (0%, 5%, 10%, 15%, 20%, 25%) applied to progressive income bands.'
  },
  minimumTax: {
    bn: 'ন্যূনতম কর',
    en: 'Minimum Tax',
    shortEn: 'Minimum Tax',
    section: 'Section 73, Income Tax Act 2023',
    descBn: 'করযোগ্য আয় থাকলে ভৌগোলিক অবস্থান অনুযায়ী প্রদেয় ন্যূনতম কর (ঢাকা/চট্টগ্রামে ৫,০০০ টাকা)।',
    descEn: 'The baseline statutory tax payable based on location if taxable income exceeds the threshold.'
  },
  surcharge: {
    bn: 'সারচার্জ (সম্পদ কর)',
    en: 'Net Wealth Surcharge',
    shortEn: 'Surcharge',
    section: 'Section 74, Income Tax Act 2023',
    descBn: 'মোট নিট সম্পদ ৪ কোটি টাকার বেশি হলে বা একাধিক গাড়ি/৮০০০ বর্গফুটের বাড়ি থাকলে প্রদেয় অতিরিক্ত কর।',
    descEn: 'Additional percentage charged on regular tax if net wealth exceeds ৳4 Crore or specific asset thresholds.'
  },
  grossIncome: {
    bn: 'মোট আয়',
    en: 'Gross Total Income',
    shortEn: 'Gross Income',
    section: 'Section 31, Income Tax Act 2023',
    descBn: '৭টি আনুষ্ঠানিক উৎস থেকে অর্জিত যাবতীয় আয়ের সমন্বিত যোগফল।',
    descEn: 'The aggregate income derived from all 7 statutory heads before deductions.'
  },
  allowableDeductions: {
    bn: 'অনুমোদিত কর্তন ও অব্যাহতি',
    en: 'Allowable Deductions & Exemptions',
    shortEn: 'Deductions',
    section: 'Section 33 & 6th Schedule',
    descBn: 'আয়কর আইন অনুযায়ী মোট আয় থেকে বাদ যাওয়ার যোগ্য বৈধ খরচ বা অব্যাহতিপ্রাপ্ত অংশ (যেমন বেতনের ১/৩ বা ৪.৫ লাখ টাকা)।',
    descEn: 'Statutory exclusions permitted by law to reduce gross income to taxable income.'
  },
  tds: {
    bn: 'উৎস কর (টিডিএস)',
    en: 'Tax Deducted at Source (TDS)',
    shortEn: 'TDS / Advance Tax',
    section: 'Chapter VII, Income Tax Act 2023',
    descBn: 'আয় পাওয়ার সময় ব্যাংক, কোম্পানি বা প্রতিষ্ঠান কর্তৃক সরাসরি কেটে রাখা অগ্রিম কর।',
    descEn: 'Tax withheld and remitted directly by employer, bank, or payer at the time of payment.'
  },
  eReturn: {
    bn: 'ই-রিটার্ন ও অনলাইন দাখিল',
    en: 'e-Return & Online Filing',
    shortEn: 'e-Return',
    section: 'NBR e-Tax Portal (etaxnbr.gov.bd)',
    descBn: 'জাতীয় রাজস্ব বোর্ডের অফিশিয়াল অনলাইন পোর্টালের মাধ্যমে আয়কর রিটার্ন প্রস্তুত ও দাখিল করার ব্যবস্থা।',
    descEn: 'Filing statutory tax returns digitally through the official NBR e-Tax portal.'
  },
  universalSelfAssessment: {
    bn: 'সর্বজনীন স্বনির্ধারণী পদ্ধতি',
    en: 'Universal Self-Assessment',
    shortEn: 'Self-Assessment',
    section: 'Section 180, Income Tax Act 2023',
    descBn: 'করদাতা নিজে নিজের আয় ও কর হিসাব করে রিটার্ন দাখিল করেন এবং তাৎক্ষণিক প্রাপ্তিস্বীকার পত্র লাভ করেন।',
    descEn: 'Statutory regime where taxpayer declares income, computes tax, and receives instant acknowledgment.'
  },
  tin: {
    bn: 'কর শনাক্তকরণ নম্বর (টিআইএন)',
    en: 'Taxpayer Identification Number (TIN)',
    shortEn: 'e-TIN',
    section: 'Section 261, Income Tax Act 2023',
    descBn: '১২ সংখ্যার অনন্য সনাক্তকরণ নম্বর যা প্রত্যেক করদাতার জন্য এনবিআর কর্তৃক বরাদ্দকৃত।',
    descEn: 'A unique 12-digit identification number issued by NBR to registered taxpayers.'
  },
  netWealth: {
    bn: 'নিট পরিসম্পদ',
    en: 'Net Wealth / Assets',
    shortEn: 'Net Wealth',
    section: 'Form IT-10B (Statement of Assets & Liabilities)',
    descBn: 'মোট স্থাবর ও অস্থাবর সম্পত্তির মূল্য থেকে মোট দায় বা ঋণের পরিমাণ বিয়োগ করে প্রাপ্ত নিট আর্থিক মূল্য।',
    descEn: 'Total value of all personal assets and properties minus all verified debts and liabilities.'
  },
  dps: {
    bn: 'ডিপিএস (ডিপোজিট পেনশন স্কিম)',
    en: 'Deposit Pension Scheme (DPS)',
    shortEn: 'DPS',
    section: 'Section 78(d)',
    descBn: 'বাৎসরিক সর্বোচ্চ ১,২০,০০০ টাকা পর্যন্ত ডিপিএস কিস্তি কর রেয়াতের জন্য অনুমোদনযোগ্য।',
    descEn: 'Monthly bank deposit scheme eligible for tax rebate up to statutory cap of ৳1,20,000 annually.'
  },
  providentFund: {
    bn: 'ভবিষ্যৎ তহবিল (প্রভিডেন্ট ফান্ড)',
    en: 'Provident Fund (GPF / RPF)',
    shortEn: 'Provident Fund',
    section: 'Part II, 6th Schedule',
    descBn: 'স্বীকৃত প্রভিডেন্ট ফান্ডে কর্মচারীর নিজস্ব ও নিয়োগকর্তার প্রদত্ত জমার অংশ।',
    descEn: 'Statutory recognized provident fund contributions eligible for rebate and statutory exemptions.'
  }
};

export default TAX_TERMS;
