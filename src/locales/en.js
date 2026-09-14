export const en = {
  common: {
    appName: 'TaxBD',
    appTagline: 'Bangladesh Income Tax Calculator & Educational Guide',
    bangladesh: 'Bangladesh',
    nbrDisclaimerBadge: 'Based on Published NBR Guidance',
    officialDisclaimer: 'Tax rules can change. Always verify your final tax liability using official NBR guidance or a qualified tax professional.',
    bengaliNumerals: 'Bengali Numerals (১, ২, ৩)',
    englishNumerals: 'Standard Numerals (1, 2, 3)',
    language: 'Language',
    selectLanguage: 'Select Language',
    bilingualMode: 'Dual Terminology Active',
    viewSource: 'View Official Source',
    downloadPdf: 'Download Summary PDF',
    print: 'Print Calculation',
    copySummary: 'Copy Summary',
    copied: 'Copied to Clipboard!',
    back: 'Back',
    next: 'Next Step',
    continue: 'Continue',
    calculateNow: 'Calculate My Tax',
    recalculate: 'Edit & Recalculate',
    reset: 'Reset All',
    save: 'Save Changes',
    cancel: 'Cancel',
    apply: 'Apply Filters',
    search: 'Search...',
    loading: 'Processing calculation...',
    takaSymbol: '৳',
    effectiveTaxRate: 'Effective Tax Rate',
    legalDisclaimerTitle: 'Important Statutory Disclaimer',
    legalDisclaimerText: 'This platform is an independent educational tool designed strictly for estimation and informational transparency. Calculations are based on published guidelines in the Income Tax Act 2023 and the respective Finance Acts issued by the National Board of Revenue (NBR), Government of the People\'s Republic of Bangladesh.'
  },

  nav: {
    home: 'Home',
    calculator: 'Tax Calculator',
    taxRules: 'Tax Rules',
    taxGuide: 'Tax Guide',
    admin: 'Admin Portal',
    calculateCTA: 'Calculate My Tax'
  },

  home: {
    heroBadge: 'Updated for Assessment Year 2024–25 & 2025–26',
    heroTitlePrefix: 'Know your Bangladesh income tax',
    heroTitleHighlight: 'clearly & accurately',
    heroSubtitle: 'Calculate your estimated personal income tax under the Income Tax Act 2023. Transparent progressive slabs, maximum allowable rebates, and crystal-clear explanations with zero guesswork.',
    calcButton: 'Start Free Calculator',
    exploreRulesButton: 'Explore NBR Rules',
    quickStats: {
      activeYear: 'Active AY 2024–25',
      taxAct: 'Income Tax Act 2023',
      taxSlabs: '6 Progressive Slabs',
      rebateCap: 'Max 15% Tax Rebate'
    },
    whyTitle: 'Why TaxBD makes Bangladesh tax simple',
    whySubtitle: 'Everything you need to understand your tax obligation with full statutory transparency.',
    features: {
      engine: {
        title: 'Accurate Progressive Engine',
        desc: 'Calculates every Taka across 0%, 5%, 10%, 15%, 20%, and 25% slabs with exact threshold allowances.'
      },
      rebates: {
        title: 'Smart Rebate Optimization',
        desc: 'Applies Section 78 investment rebate limits (15%, 20% taxable income cap, ৳10 Lakh limit, ৳1.2 Lakh DPS cap).'
      },
      bilingual: {
        title: 'Bilingual & Educational',
        desc: 'Read terms in both Bengali and English with "Explain Like I\'m New to Tax" easy breakdowns.'
      },
      verified: {
        title: '100% NBR Verified Rules',
        desc: 'Every calculation links directly to statutory sections in the Income Tax Paripatra and Finance Acts.'
      }
    },
    flow: {
      title: 'How TaxBD Computes Your Tax',
      pipeline: 'Income Tax Act 2023 Pipeline',
      steps: {
        step1: {
          badge: 'Step 1',
          title: '1. Income',
          desc: 'Salary, bonuses & other sources'
        },
        step2: {
          badge: 'Step 2',
          title: '2. Tax Rules',
          desc: 'Exemptions & category thresholds'
        },
        step3: {
          badge: 'Step 3',
          title: '3. Calculation',
          desc: 'Progressive slabs & 15% rebate'
        },
        step4: {
          badge: 'Step 4',
          title: '4. Result',
          desc: 'Clear net tax & minimum tax check'
        }
      }
    }
  },

  calculator: {
    title: 'Bangladesh Income Tax Calculator',
    subtitle: 'Determine your personal income tax in 5 simple, guided steps.',
    steps: {
      assessmentYear: 'Assessment Year',
      aboutYou: 'About You',
      income: 'Your Income',
      deductions: 'Rebates & Deductions',
      review: 'Review & Compute',
      result: 'Calculation Result'
    },
    step1: {
      heading: 'Which assessment year are you calculating for?',
      subheading: 'Tax rules and slab rates can change every fiscal year. Your result is calculated using the official rules for the selected assessment year.',
      guidanceTitle: 'Understanding Assessment Year vs Income Year',
      guidanceText: 'Assessment Year is the 12-month period (1 July to 30 June) following your Income Year in which your income is evaluated and the tax return is officially submitted.',
      incomeYearPrefix: 'Income earned between',
      assessmentYearLabel: 'Assessment Year (করবর্ষ)',
      incomeYearLabel: 'Income Year (আয়বর্ষ)',
      activeStatus: 'Active Official Rules',
      selectYear: 'Select Assessment Year'
    },
    step2: {
      heading: 'About You & Eligibility',
      subheading: 'Select your taxpayer category and residential location. The government provides special tax-free threshold limits based on these criteria.',
      categoryTitle: 'Select Your Taxpayer Category',
      categorySubtitle: 'Determines your statutory 0% tax-free baseline threshold.',
      thresholdLabel: 'Tax-Free Threshold',
      locationTitle: 'Residential Location (Minimum Tax Area)',
      locationSubtitle: 'Under Section 73, minimum tax is assessed by jurisdiction if you have taxable income.',
      categories: {
        general: 'General Individual Taxpayer (Male under 65)',
        female: 'Female Taxpayer or Senior Citizen (Age 65+)',
        disabled: 'Person with Disability (Physically Challenged)',
        freedomFighter: 'Gazetted War-Wounded Freedom Fighter',
        thirdGender: 'Third Gender (Hijra) Taxpayer',
        parentOfDisabled: 'Parent / Legal Guardian of a Disabled Child'
      },
      locations: {
        dhakaCtg: 'Dhaka or Chattogram City Corporation Area',
        dhakaCtgDesc: 'Statutory minimum tax: ৳5,000',
        otherCity: 'Other City Corporation Areas (Rajshahi, Sylhet, Khulna, etc.)',
        otherCityDesc: 'Statutory minimum tax: ৳4,000',
        nonCity: 'All Other Areas (Paurashava / District / Rural)',
        nonCityDesc: 'Statutory minimum tax: ৳3,000'
      },
      ageLabel: 'Your Age',
      disabledChildrenCount: 'Number of Children with Disabilities',
      disabledChildrenHelp: 'Each disabled child adds ৳50,000 to your tax-free exemption limit.'
    },
    step3: {
      heading: 'Your Annual Income',
      subheading: 'Enter your gross annual income earned during the 12-month income year (1 July to 30 June). Fill in only the categories that apply to you.',
      totalGrossTally: 'Total Estimated Gross Income',
      supportedHeads: 'All 7 statutory income heads supported',
      heads: {
        salary: {
          title: 'Salary & Employment',
          subtitle: 'Annual basic salary, allowances, bonuses, and gratuities.',
          itemizeToggle: 'Itemize Allowances (House Rent, Medical, Conveyance, Bonus)',
          itemizeSubtext: 'Statutory exemptions (1/3 of salary or ৳4,50,000) applied automatically.',
          basic: 'Basic Salary & General Pay',
          houseRent: 'House Rent Allowance',
          medical: 'Medical Allowance',
          conveyance: 'Conveyance Allowance',
          bonus: 'Festival Bonus & Other Allowances'
        },
        houseProperty: {
          title: 'House Property (Rental Income)',
          subtitle: 'Gross annual rental income from residential flats, houses, or commercial shops.',
          statutoryNote: 'Statutory 25% (residential) or 30% (commercial) repair/maintenance deduction applies.'
        },
        business: {
          title: 'Business & Profession',
          subtitle: 'Net profits from sole proprietorship, freelance consulting, or professional practice.'
        },
        agriculture: {
          title: 'Agriculture',
          subtitle: 'Income from crop cultivation, tea gardens, dairy, poultry, or fisheries.'
        },
        capitalGains: {
          title: 'Capital Gains',
          subtitle: 'Net gains from sale of land, buildings, real estate properties, or capital assets.'
        },
        financialAssets: {
          title: 'Financial Assets (Interest / Dividends)',
          subtitle: 'Interest and profit earned on bank savings accounts, FDRs, and stock dividends.'
        },
        otherIncome: {
          title: 'Other Sources',
          subtitle: 'Royalties, prize bonds, lotteries, cash gifts, and unclassified income.'
        }
      }
    },
    step4: {
      heading: 'Rebates, Investments & Advance Tax',
      subheading: 'Eligible investments directly reduce your payable tax under Section 78. Advance tax already deducted at source is subtracted from your final bill.',
      investmentHeading: 'Eligible Investment Securities (Section 78)',
      investmentSubheading: 'Government allows a 15% tax rebate on eligible investments up to statutory caps.',
      fields: {
        lifeInsurance: 'Life Insurance Premium',
        lifeInsuranceHelp: 'Paid by taxpayer on own life or spouse/minor children.',
        dps: 'Deposit Pension Scheme (DPS)',
        dpsHelp: 'Allowable rebate capped at ৳1,20,000 annually per Section 78.',
        providentFund: 'Recognized Provident Fund (GPF / RPF)',
        providentFundHelp: 'Taxpayer & employer contribution to recognized fund.',
        approvedSecurities: 'Approved Stocks, Mutual Funds & Debentures',
        approvedSecuritiesHelp: 'Investments in listed shares, mutual funds, or government treasury bonds.',
        benevolentFund: 'Benevolent Fund & Group Insurance',
        benevolentFundHelp: 'Mandatory employee benevolent and group insurance deductions.',
        zakat: 'Approved Zakat Fund / Philanthropy',
        zakatHelp: 'Donations to government-approved Zakat Board or charitable funds.',
        advanceTax: 'Advance Income Tax (AIT) / Tax Deducted at Source (TDS)',
        advanceTaxHelp: 'TDS already deducted by your employer, bank on profit/interest, or car token tax.'
      },
      netWealthHeading: 'Net Wealth for Surcharge Evaluation (Optional)',
      netWealthSubheading: 'Applicable only if total individual net assets exceed ৳4 Crore.',
      netWealth: 'Total Net Wealth (Form IT-10B Assets minus Debts)',
      multiCarLabel: 'Own more than 1 motor car (or SUV > 8,000 cc)?',
      largeHouseLabel: 'Own residential house property exceeding 8,000 sq ft?'
    },
    step5: {
      heading: 'Review Your Information',
      subheading: 'Please verify your inputs below before generating your detailed tax calculation.',
      taxpayerProfile: 'Taxpayer Profile',
      incomeSummary: 'Income Breakdown',
      deductionsSummary: 'Investment & Advance Tax Summary',
      calculateButton: 'Compute My Tax Breakdown'
    },
    result: {
      labelYear: 'ASSESSMENT YEAR',
      estimatedTaxHeading: 'Your Estimated Income Tax',
      estimatedTaxSubheading: 'Based on the official statutory rules for the selected assessment year.',
      netPayableLabel: 'Net Tax Payable (After TDS / Advance Tax)',
      refundLabel: 'Estimated Refund Due',
      annualGrossIncome: 'Annual Gross Income',
      taxableIncome: 'Taxable Income',
      effectiveTaxRate: 'Effective Tax Rate',
      taxBreakdownTitle: 'Tax Breakdown & Structure',
      taxFreeIncomeLabel: 'Tax-Free Income (করমুক্ত আয়)',
      taxableIncomeLabel: 'Taxable Income (করযোগ্য আয়)',
      taxPayableLabel: 'Total Tax Liability (মোট প্রদেয় কর)',
      howCalculatedTitle: 'How Your Tax Was Calculated',
      howCalculatedSubtitle: 'Step-by-step progressive tax slab breakdown under the Finance Act.',
      tableHeaders: {
        portion: 'Income Portion (আয়ের স্তর)',
        rate: 'Rate (হার)',
        tax: 'Tax Payable (কর)'
      },
      slabCalculationFlow: 'Progressive Slab Computation',
      taxFreeSlab: 'Tax-free initial band',
      nextSlab: 'Next taxable band',
      remainingSlab: 'Remaining balance taxable at top slab',
      calculationSummaryTitle: 'Final Tax Reconciliation',
      regularTax: 'Regular Tax on Slabs',
      investmentRebate: 'Less: Allowable Investment Rebate (Section 78)',
      taxAfterRebate: 'Tax Liability After Rebate',
      minimumTaxAdjustment: 'Minimum Tax Floor Adjustment (Section 73)',
      netWealthSurcharge: 'Plus: Net Wealth Surcharge (Section 74)',
      totalTaxLiability: 'Total Tax Liability',
      lessTds: 'Less: Advance Tax / TDS Paid',
      finalNetPayable: 'Final Net Tax Payable to NBR',
      whyTitle: 'Why this rule applies to you',
      whyRebate: 'Rebate is calculated as 15% of eligible investments, strictly capped at 20% of your taxable income or ৳10,00,000 (whichever is lower).',
      whyMinimumTax: 'Because your taxable income exceeds the tax-free limit, your final tax cannot fall below the statutory minimum threshold for your location.',
      whySurcharge: 'Surcharge is levied on net wealth exceeding ৳4 Crore or on qualifying multiple luxury assets.',
      sourceTransparencyTitle: 'Statutory Source Transparency',
      sourceTransparencySubtitle: 'Every formula in this calculation is verified against official NBR publications.',
      actionButtons: {
        downloadCertificate: 'Download Tax Summary',
        printView: 'Print Calculation',
        recalculate: 'Adjust Inputs',
        viewGuide: 'Read Detailed Tax Guide'
      }
    }
  },

  rules: {
    title: 'Bangladesh Tax Rules Explorer',
    subtitle: 'Explore official tax slabs, exemption thresholds, rebates, and compare regulatory changes across assessment years.',
    tabs: {
      explorer: 'Rules Explorer',
      compare: 'Compare Assessment Years',
      whatsChanged: "What's Changed? Timeline"
    },
    selectYear: 'Select Assessment Year',
    thresholdsHeading: 'Tax-Free Thresholds by Category',
    slabsHeading: 'Progressive Income Tax Slabs',
    surchargeHeading: 'Net Wealth Surcharge Brackets',
    minimumTaxHeading: 'Jurisdictional Minimum Tax',
    officialDocsHeading: 'Official Statutory Documents',
    compareYearsHeading: 'Compare Two Assessment Years Side-by-Side',
    varianceDetected: 'Changes Detected',
    noVariance: 'No changes between selected years',
    timelineTitle: 'Legislative Changes Timeline',
    timelineSubtitle: 'Historical record of major changes introduced by Finance Acts.'
  },

  guide: {
    title: 'Bangladesh Income Tax Education Hub',
    subtitle: 'Learn how income tax works in Bangladesh in simple, jargon-free language with practical real-world examples.',
    plainLanguageMode: "Explain Like I'm New to Tax Mode",
    categoriesHeading: 'Tax Categories & Guides',
    glossaryHeading: 'Statutory Tax Glossary',
    viewArticle: 'Read Full Guide',
    whoItAppliesTo: 'Who It Applies To',
    practicalExample: 'Practical Example',
    commonMistakes: 'Common Mistakes to Avoid',
    officialSource: 'Official Regulatory Source',
    lastVerified: 'Last Verified'
  },

  admin: {
    portalTitle: 'TaxBD Governance & Rule Engine Admin',
    loginTitle: 'Sign In to TaxBD Admin Portal',
    loginSubtitle: 'Secure administrative access to manage statutory tax rules, audit logs, and verified sources.',
    emailLabel: 'Admin Email',
    passwordLabel: 'Password',
    loginButton: 'Sign In Securely',
    dashboardOverview: 'Governance Dashboard Overview',
    cards: {
      activeYear: 'Active Assessment Year',
      totalRules: 'Total Tax Rules',
      verifiedSources: 'Verified Sources',
      pendingReviews: 'Pending Reviews',
      lastUpdate: 'Last Rule Update'
    },
    lifecycle: {
      draft: 'Draft',
      underReview: 'Under Review',
      verified: 'Verified',
      active: 'Active',
      archived: 'Archived'
    }
  }
};

export default en;
