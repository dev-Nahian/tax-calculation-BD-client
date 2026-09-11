/**
 * TaxBD Comprehensive Tax Education Hub Data
 * Explains Bangladesh Income Tax in plain, beginner-friendly language.
 */

export const GUIDE_CATEGORIES = [
  {
    id: 'income-tax-basics',
    title: 'Income Tax Basics',
    description: 'Fundamental principles of taxation in Bangladesh, who must pay, and basic terms.',
    icon: 'BookOpen',
    color: 'emerald',
    count: 3,
  },
  {
    id: 'taxable-income',
    title: 'Taxable Income',
    description: 'How your gross salary and business revenue are converted into your net tax base.',
    icon: 'Calculator',
    color: 'blue',
    count: 2,
  },
  {
    id: 'tax-free-income',
    title: 'Tax-Free Income',
    description: 'Statutory allowances, thresholds, and income categories that are 100% tax-exempt.',
    icon: 'ShieldCheck',
    color: 'teal',
    count: 2,
  },
  {
    id: 'tax-slabs',
    title: 'Tax Slabs',
    description: 'How the 0%, 5%, 10%, 15%, 20%, and 25% progressive tax tiers work without guesswork.',
    icon: 'Layers',
    color: 'purple',
    count: 2,
  },
  {
    id: 'tax-rebates',
    title: 'Tax Rebates',
    description: 'Section 78 investment tax credits: DPS, Sanchayapatra, stocks, and insurance.',
    icon: 'TrendingUp',
    color: 'amber',
    count: 2,
  },
  {
    id: 'minimum-tax',
    title: 'Minimum Tax',
    description: 'Geographic minimum tax requirements across Dhaka, Chattogram, and regional areas.',
    icon: 'MapPin',
    color: 'indigo',
    count: 2,
  },
  {
    id: 'surcharge',
    title: 'Surcharge',
    description: 'Net wealth surcharge rules for high net-worth individuals and multiple vehicle owners.',
    icon: 'Coins',
    color: 'orange',
    count: 2,
  },
  {
    id: 'tax-return',
    title: 'Tax Return',
    description: 'Annual return submission deadlines, mandatory filing conditions, and penalty rules.',
    icon: 'FileText',
    color: 'slate',
    count: 2,
  },
  {
    id: 'e-return',
    title: 'e-Return',
    description: 'Step-by-step guidance on filing your return online through etaxnbr.gov.bd.',
    icon: 'Laptop',
    color: 'emerald',
    count: 2,
  },
  {
    id: 'taxpayer-categories',
    title: 'Taxpayer Categories',
    description: 'Special tax-free exemption limits for women, seniors, freedom fighters, and disabled persons.',
    icon: 'Users',
    color: 'blue',
    count: 2,
  },
];

export const GUIDE_ARTICLES = [
  // 1. Income Tax Basics
  {
    slug: 'what-is-income-tax-bangladesh',
    categoryId: 'income-tax-basics',
    title: 'What is Income Tax in Bangladesh?',
    shortExplanation: 'A mandatory financial contribution paid to the government on the annual income you earn.',
    whoItAppliesTo: 'Any Bangladeshi resident or non-resident earning income inside Bangladesh above the statutory tax-free threshold.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'Why do I have to pay income tax and how does it work?',
    simpleAnswer:
      'Income tax is money paid to the government based on what you earn in a financial year (1 July to 30 June). The government uses this revenue to build infrastructure, hospitals, bridges, and public services. You only pay tax if your annual income exceeds the tax-free exemption threshold (e.g. ৳3,50,000 for male individuals, ৳4,00,000 for women).',
    visualExample: {
      title: 'Example: Earning ৳4,00,000 in a year',
      steps: [
        'Total income earned in year: ৳4,00,000',
        'Tax-free threshold (Male): ৳3,50,000 (Tax = ৳0)',
        'Taxable portion: ৳50,000 taxed at 5% = ৳2,500',
        'Minimum tax adjustment (Dhaka): Raised to ৳5,000 statutory minimum',
      ],
      conclusion: 'You only pay tax on the portion above ৳3,50,000, subject to geographic minimum tax rules.',
    },
    commonMistakes: [
      'Believing you must pay tax on your entire salary rather than just the taxable portion above the threshold.',
      'Assuming that having an e-TIN automatically requires paying tax, even when your earnings are below the exemption limit.',
      'Confusing the Income Year (when you earn) with the Assessment Year (when you file).',
    ],
    officialSource: {
      title: 'Income Tax Act 2023 (Act No. 18 of 2023)',
      actSection: 'Section 2(36) and Section 3',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2023 (Gazetted)',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },
  {
    slug: 'income-year-vs-assessment-year',
    categoryId: 'income-tax-basics',
    title: 'Income Year vs. Assessment Year Explained',
    shortExplanation: 'The Income Year is when you earn money; the Assessment Year is when you calculate and pay tax on it.',
    whoItAppliesTo: 'All individual taxpayers preparing their annual tax returns.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'What is the difference between an Income Year and an Assessment Year?',
    simpleAnswer:
      'In Bangladesh, tax is always assessed in the year following the year you earned the money. The 12 months in which you earn is your "Income Year" (1 July to 30 June). The next 12 months in which you file your return is your "Assessment Year".',
    visualExample: {
      title: 'Timeline of AY 2024–2025',
      steps: [
        '1 July 2023 – 30 June 2024: You earn salary, rent, or business revenue (Income Year 2023–2024)',
        '1 July 2024 – 30 June 2025: You file return and pay tax (Assessment Year 2024–2025)',
        '30 November 2024: Official National Tax Day submission deadline',
      ],
      conclusion: 'Your 2024 tax calculation evaluates earnings from July 2023 through June 2024.',
    },
    commonMistakes: [
      'Using the current month salary instead of total income from the preceding fiscal year (1 July to 30 June).',
      'Thinking Assessment Year 2024-2025 means earnings made between July 2024 and June 2025.',
    ],
    officialSource: {
      title: 'Income Tax Act 2023',
      actSection: 'Section 2(9) and Section 2(10)',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2023',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },

  // 2. Taxable Income
  {
    slug: 'how-to-calculate-taxable-income',
    categoryId: 'taxable-income',
    title: 'How Taxable Income is Calculated from Gross Salary',
    shortExplanation: 'Taxable income is what remains after subtracting statutory salary allowances (house rent, medical, conveyance).',
    whoItAppliesTo: 'Salaried employees in private companies, MNCs, banks, and government organizations.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'Why is my taxable income lower than my gross salary on my payslip?',
    simpleAnswer:
      'The law gives statutory exemptions on specific employment allowances. Portions of your house rent, medical allowance, and conveyance allowance are exempt from tax up to official caps. You only pay tax on the remaining balance.',
    visualExample: {
      title: 'Case Study: Annual Salary of ৳10,36,000',
      steps: [
        'Basic Salary: ৳6,00,000 (Fully taxable)',
        'House Rent Allowance: ৳2,40,000 → Exemption: Min(2.4L, 50% basic=3.0L, 3.0L) = ৳2,40,000 (৳0 taxable)',
        'Medical Allowance: ৳60,000 → Exemption: Min(60k, 10% basic=60k, 1.2L) = ৳60,000 (৳0 taxable)',
        'Conveyance Allowance: ৳36,000 → Exemption: ৳30,000 (৳6,000 taxable)',
        'Festival Bonus: ৳1,00,000 (Fully taxable)',
        'Total Gross: ৳10,36,000 | Total Exemptions: ৳3,30,000',
        'Net Taxable Income = ৳10,36,000 − ৳3,30,000 = ৳7,06,000',
      ],
      conclusion: 'You only pay tax on ৳7,06,000 instead of ৳10,36,000, saving thousands of Taka.',
    },
    commonMistakes: [
      'Applying tax to gross salary without deducting house rent, medical, and conveyance exemptions.',
      'Claiming medical exemption above ৳1,20,000 or 10% of basic salary.',
    ],
    officialSource: {
      title: 'Sixth Schedule, Part 1, Income Tax Act 2023',
      actSection: 'Section 38 & Sixth Schedule Part 1',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2023',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },

  // 3. Tax-Free Income
  {
    slug: 'tax-free-allowances-and-exemptions',
    categoryId: 'tax-free-income',
    title: 'Official Tax-Free Allowances and Statutory Exemptions',
    shortExplanation: 'Complete list of income heads and components that do not incur any income tax in Bangladesh.',
    whoItAppliesTo: 'Salaried individuals, farmers, pensioners, and recipients of government allowances.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'What kinds of income are completely tax-free in Bangladesh?',
    simpleAnswer:
      'Certain incomes are protected from tax by law. Examples include pension payments, gratuity funds up to statutory limits, government awards, agricultural income up to ৳2,00,000 for sole farmers, and specific salary allowance exemptions.',
    visualExample: {
      title: 'Common Tax-Free Allowances',
      steps: [
        'House rent exemption: Lower of actual received, 50% of basic, or ৳3,00,000/year',
        'Medical allowance: Lower of actual received, 10% of basic, or ৳1,20,000/year',
        'Conveyance allowance: Up to ৳30,000 per year',
        'Pension & Gratuity: Fully tax-free for recognized funds',
      ],
      conclusion: 'These amounts are deducted before progressive slabs are calculated.',
    },
    commonMistakes: [
      'Assuming all cash allowances are 100% tax-free without verifying statutory ceilings.',
    ],
    officialSource: {
      title: 'Income Tax Act 2023 Sixth Schedule',
      actSection: 'Part 1, Sixth Schedule',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2023',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },

  // 4. Tax Slabs
  {
    slug: 'what-is-a-tax-slab-progressive-rates',
    categoryId: 'tax-slabs',
    title: 'What is a Tax Slab? How Progressive Tax Rates Work',
    shortExplanation: 'Bangladesh uses progressive tax tiers where different portions of your income are taxed at increasing rates.',
    whoItAppliesTo: 'All individual taxpayers with taxable income exceeding ৳3,50,000.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'What is a tax slab and why don’t I pay one single percentage on all my money?',
    simpleAnswer:
      'Bangladesh uses progressive tax rates. This means different portions of your taxable income are taxed at different rates (0%, 5%, 10%, 15%, 20%, 25%). If your income increases and crosses into a higher slab, only the extra portion is taxed at the higher rate—never your whole income.',
    visualExample: {
      title: 'Visual Slab Breakdown for ৳8,50,000 Taxable Income (Male)',
      steps: [
        '1st ৳3,50,000 (Tax-Free Threshold) @ 0% = ৳0',
        'Next ৳1,00,000 @ 5% = ৳5,000',
        'Next ৳4,00,000 @ 10% = ৳40,000',
        'Total Regular Tax = ৳5,000 + ৳40,000 = ৳45,000',
      ],
      conclusion: 'Effective tax rate is only 5.29% of your total income, not 10% on everything.',
    },
    commonMistakes: [
      'Fearing a salary raise because you think crossing a slab will cause your entire income to be taxed at the higher rate.',
      'Applying 25% to your full income when only the portion exceeding ৳18.5 Lakh is taxed at 25%.',
    ],
    officialSource: {
      title: 'Finance Act 2024 & Income Tax Act 2023',
      actSection: 'First Schedule / Paripatra 2024-2025',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2024',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },

  // 5. Tax Rebates
  {
    slug: 'section-78-investment-rebate-guide',
    categoryId: 'tax-rebates',
    title: 'Section 78 Investment Rebates: How to Save 15% on Tax',
    shortExplanation: 'Invest in approved savings schemes to directly cut your tax liability by 15% of allowable investments.',
    whoItAppliesTo: 'Taxpayers who invest in DPS, Sanchayapatra, life insurance, stock market, or provident funds.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'How can I legally reduce my income tax through investments?',
    simpleAnswer:
      'Under Section 78 of the Income Tax Act 2023, you receive a 15% tax rebate on eligible investments. The allowable investment is capped at the lowest of: (1) Your actual investments, (2) 20% of your taxable income, or (3) ৳10,00,000.',
    visualExample: {
      title: 'Example: Taxable Income ৳10,00,000 with ৳1,50,000 in DPS & Life Insurance',
      steps: [
        'Taxable Income: ৳10,00,000',
        '20% Income Ceiling: ৳2,00,000',
        'Actual Investments: ৳1,50,000 (Allowable since ৳1.5L < ৳2.0L and < ৳10L)',
        'Section 78 Rebate = ৳1,50,000 × 15% = ৳22,500',
        'If regular tax was ৳65,000 → Net Tax = ৳65,000 − ৳22,500 = ৳42,500',
      ],
      conclusion: 'You save ৳22,500 directly from your tax bill by investing in approved schemes.',
    },
    commonMistakes: [
      'Investing more than ৳1,20,000/year in DPS expecting full rebate (DPS rebate is capped at ৳1.2L annually).',
      'Assuming investment rebate can reduce tax below the mandatory geographical minimum tax when minimum tax applies.',
    ],
    officialSource: {
      title: 'Section 78, Income Tax Act 2023',
      actSection: 'Section 78 & Schedule 6 Part 3',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2023',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },

  // 6. Minimum Tax
  {
    slug: 'minimum-tax-rules-by-location',
    categoryId: 'minimum-tax',
    title: 'Geographical Minimum Tax Rules (Section 73)',
    shortExplanation: 'Mandatory minimum tax amounts depending on whether you live in Dhaka/Chattogram, other city corps, or rural areas.',
    whoItAppliesTo: 'Any individual taxpayer whose taxable income exceeds the tax-free limit.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'What is minimum tax and when do I have to pay ৳5,000, ৳4,000, or ৳3,000?',
    simpleAnswer:
      'If your taxable income exceeds the tax-free threshold (e.g. ৳3,50,000), the law requires you to pay a minimum fixed amount even if your calculated progressive tax after rebate is lower. The rates are: ৳5,000 in Dhaka/Chattogram, ৳4,000 in other City Corporations, and ৳3,000 in rural/non-city areas.',
    visualExample: {
      title: 'Example: Taxable Income ৳3,60,000 in Dhaka City Corporation',
      steps: [
        'Taxable Income: ৳3,60,000 (Exceeds ৳3,50,000 threshold)',
        'Progressive 5% tax on ৳10,000 = ৳500',
        'Dhaka Statutory Minimum Tax Requirement = ৳5,000',
        'Payable Tax = ৳5,000 (Raised to statutory minimum)',
      ],
      conclusion: 'If your income was ৳3,50,000 or below, your payable tax would be ৳0.',
    },
    commonMistakes: [
      'Thinking minimum tax applies when your total income is below the tax-free limit (it only triggers once income exceeds the threshold).',
      'Paying rural rate (৳3,000) when your principal source of employment or residence is in Dhaka or Chattogram.',
    ],
    officialSource: {
      title: 'Section 73, Income Tax Act 2023',
      actSection: 'Section 73',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2023',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },

  // 7. Surcharge
  {
    slug: 'net-wealth-surcharge-explained',
    categoryId: 'surcharge',
    title: 'Net Wealth Surcharge Tiers & Specific Asset Triggers',
    shortExplanation: 'Additional surcharge levied on high net-worth individuals with assets above ৳4 Crore or multiple motor cars.',
    whoItAppliesTo: 'Taxpayers with net wealth exceeding ৳4 Crore or owners of multiple cars / 8,000+ sq ft property.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'When does wealth surcharge apply and how is it calculated?',
    simpleAnswer:
      'Surcharge is an extra tax percentage calculated on top of your income tax liability (not on your total wealth). It starts at 10% if net wealth is between ৳4 Crore and ৳10 Crore, rising to 35% for wealth above ৳50 Crore. Owning 2 or more motor cars also triggers a 10% surcharge even if net wealth is below ৳4 Crore.',
    visualExample: {
      title: 'Example: Regular Tax ৳2,00,000 with Net Wealth of ৳5 Crore (10% Tier)',
      steps: [
        'Income Tax Liability: ৳2,00,000',
        'Net Wealth: ৳5,00,000,00 (5 Crore → 10% Surcharge Tier)',
        'Surcharge Amount = 10% of ৳2,00,000 = ৳20,000',
        'Total Tax Payable = ৳2,00,000 + ৳20,000 = ৳2,20,000',
      ],
      conclusion: 'Surcharge is 10% of your tax bill, not 10% of your 5 Crore wealth.',
    },
    commonMistakes: [
      'Assuming surcharge is deducted from your total asset balance rather than being a percentage of your annual tax bill.',
    ],
    officialSource: {
      title: 'Finance Act 2024 Surcharge Schedule',
      actSection: 'Finance Act 2024 Section 4',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2024',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },

  // 8. Tax Return
  {
    slug: 'who-must-file-tax-return-bangladesh',
    categoryId: 'tax-return',
    title: 'Who is Legally Required to File a Tax Return?',
    shortExplanation: 'Mandatory return submission conditions under Section 166 of the Income Tax Act 2023.',
    whoItAppliesTo: 'Anyone holding a TIN with income above the threshold or engaged in 43+ statutory economic activities.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'Do I have to file a tax return if my income is zero or below the threshold?',
    simpleAnswer:
      'Under the Income Tax Act 2023, submitting proof of return submission (PSR) is mandatory for 43+ services—including taking bank loans above ৳5 Lakh, obtaining trade licenses, buying motor cars, and maintaining credit cards. If you hold a TIN and use these services, you must file a return even if your calculated tax is ৳0.',
    visualExample: {
      title: 'Mandatory Return Submission Triggers',
      steps: [
        'Obtaining or renewing a Trade License',
        'Applying for a credit card or bank loan above ৳5,00,000',
        'Purchasing or registering a motor vehicle',
        'Being an executive employee in a company or NGO',
        'Participating in government tenders or e-GP',
      ],
      conclusion: 'Filing a return with ৳0 tax is legal and fulfills your statutory compliance.',
    },
    commonMistakes: [
      'Ignoring return filing because you had ৳0 tax, resulting in bank account freezes or service blocks.',
      'Missing the 30 November Tax Day deadline and facing late filing interest fees.',
    ],
    officialSource: {
      title: 'Section 166, Income Tax Act 2023',
      actSection: 'Section 166 & Section 264',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2023',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },

  // 9. e-Return
  {
    slug: 'how-to-file-online-ereturn-nbr',
    categoryId: 'e-return',
    title: 'How to File Your Tax Return Online (e-Return)',
    shortExplanation: 'Step-by-step guide on registering and filing your return on the official NBR e-Return portal (etaxnbr.gov.bd).',
    whoItAppliesTo: 'All individual taxpayers filing annual returns digitally.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'How do I submit my return online without visiting a tax office?',
    simpleAnswer:
      'The National Board of Revenue operates the official portal at etaxnbr.gov.bd. You register using your 12-digit e-TIN and biometric SIM registered with your NID. You fill in your income, allowances, and investments, review the draft, and submit online to receive an instant acknowledgment receipt and tax certificate.',
    visualExample: {
      title: '4 Steps to e-Return Submission',
      steps: [
        'Step 1: Sign up at etaxnbr.gov.bd with e-TIN and biometric SIM',
        'Step 2: Enter income sources, deductions, and Section 78 investments',
        'Step 3: Review the auto-generated Form IT-11GA draft',
        'Step 4: Submit electronically and download your instant Tax Certificate',
      ],
      conclusion: 'No physical paper submission or tax office queue required.',
    },
    commonMistakes: [
      'Registering with a SIM card not biometric-linked to your own NID (OTP will fail).',
      'Forgetting to download and save the official Acknowledgment Receipt after submission.',
    ],
    officialSource: {
      title: 'NBR Official e-Return Portal Guidance',
      actSection: 'Section 174, Income Tax Act 2023',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'July 2024',
      lastVerified: 'September 2024',
      sourceUrl: 'https://etaxnbr.gov.bd',
    },
  },

  // 10. Taxpayer Categories
  {
    slug: 'taxpayer-categories-and-exemption-thresholds',
    categoryId: 'taxpayer-categories',
    title: 'Taxpayer Categories & Special Tax-Free Thresholds',
    shortExplanation: 'Special statutory exemption limits for women, senior citizens, third gender, disabled individuals, and freedom fighters.',
    whoItAppliesTo: 'Female taxpayers, citizens aged 65+, third gender community, disabled individuals, and freedom fighters.',
    assessmentYear: '2024-2025',
    lastVerified: 'September 2024',
    simpleQuestion: 'How much tax-free income is allowed for different categories of taxpayers?',
    simpleAnswer:
      'To provide equity and social support, Bangladesh law provides higher tax-free thresholds for specific groups. While general male taxpayers have a ৳3,50,000 threshold, women and senior citizens (65+) get ৳4,00,000, disabled persons get ৳4,75,000, and gazetted freedom fighters get ৳5,00,000.',
    visualExample: {
      title: 'Summary of Statutory Thresholds (AY 2024-2025)',
      steps: [
        'General Male Taxpayers: ৳3,50,000 Tax-Free',
        'Female Taxpayers: ৳4,00,000 Tax-Free',
        'Senior Citizens (65+ years): ৳4,00,000 Tax-Free',
        'Third Gender Taxpayers: ৳4,00,000 Tax-Free',
        'Physically Challenged / Disabled: ৳4,75,000 Tax-Free',
        'Gazetted War-Wounded Freedom Fighters: ৳5,00,000 Tax-Free',
        'Parents of Disabled Children: Extra +৳50,000 per child',
      ],
      conclusion: 'Your category is automatically factored into your progressive calculation.',
    },
    commonMistakes: [
      'Senior citizens aged 65+ calculating under the general ৳3.5L threshold instead of claiming the ৳4.0L senior allowance.',
      'Parents of disabled children missing the additional ৳50,000 per child exemption.',
    ],
    officialSource: {
      title: 'Finance Act 2024 & Paripatra 2024-2025',
      actSection: 'First Schedule / NBR Paripatra',
      authority: 'National Board of Revenue (NBR)',
      publicationDate: 'June 2024',
      lastVerified: 'September 2024',
      sourceUrl: 'https://nbr.gov.bd',
    },
  },
];

export const TAX_GLOSSARY = [
  {
    term: 'Taxable Income',
    bangla: 'করযোগ্য আয়',
    definition: 'The net portion of your total annual earnings that is subjected to income tax slabs after subtracting all statutory deductions, exemptions, and allowances.',
    example: 'If your salary is ৳10,00,000 and you have ৳3,00,000 in allowable exemptions, your Taxable Income is ৳7,00,000.',
    source: 'Section 32, Income Tax Act 2023',
    authority: 'National Board of Revenue (NBR)',
  },
  {
    term: 'Assessment Year (AY)',
    bangla: 'করবর্ষ',
    definition: 'The 12-month period starting on 1 July and ending on 30 June during which the tax on income earned in the preceding Income Year is assessed and collected.',
    example: 'For income earned between 1 July 2023 and 30 June 2024, the Assessment Year is 2024–2025.',
    source: 'Section 2(9), Income Tax Act 2023',
    authority: 'National Board of Revenue (NBR)',
  },
  {
    term: 'Income Year',
    bangla: 'আয়বর্ষ',
    definition: 'The financial year (1 July to 30 June) during which income is actually earned by the taxpayer prior to assessment.',
    example: 'Income earned from 1 July 2023 to 30 June 2024 belongs to Income Year 2023–2024.',
    source: 'Section 2(10), Income Tax Act 2023',
    authority: 'National Board of Revenue (NBR)',
  },
  {
    term: 'Tax Rebate',
    bangla: 'কর রেয়াত',
    definition: 'A direct deduction subtracted from calculated gross income tax liability earned through approved investments under Section 78.',
    example: 'If your regular tax is ৳40,000 and your Section 78 rebate is ৳15,000, you only pay ৳25,000.',
    source: 'Section 78, Income Tax Act 2023',
    authority: 'National Board of Revenue (NBR)',
  },
  {
    term: 'Surcharge',
    bangla: 'সারচার্জ',
    definition: 'An additional wealth-based tax percentage levied on high net-worth individuals whose total net assets exceed ৳4 Crore or who own multiple motor vehicles.',
    example: 'A taxpayer with ৳5 Crore net wealth pays a 10% surcharge on their calculated tax bill.',
    source: 'Finance Act 2024, Section 4',
    authority: 'National Board of Revenue (NBR)',
  },
  {
    term: 'Withholding Tax (TDS / AIT)',
    bangla: 'উৎস কর / অগ্রিম আয়কর',
    definition: 'Tax deducted at source in advance by employers, banks, or paying authorities prior to transferring payment to the taxpayer.',
    example: 'Banks automatically deduct 10% or 15% TDS on interest earned from Fixed Deposits (FDR).',
    source: 'Chapter 7, Income Tax Act 2023',
    authority: 'National Board of Revenue (NBR)',
  },
  {
    term: 'Tax Return (Form IT-11GA)',
    bangla: 'আয়কর রিটার্ন',
    definition: 'The official annual statutory declaration detailing a taxpayer’s income, assets, liabilities, and tax calculations submitted to the NBR.',
    example: 'Submitted online via etaxnbr.gov.bd or physically to the relevant tax circle by 30 November.',
    source: 'Section 166, Income Tax Act 2023',
    authority: 'National Board of Revenue (NBR)',
  },
  {
    term: 'e-TIN (Taxpayer Identification Number)',
    bangla: 'ই-টিন নম্বর',
    definition: 'A unique 12-digit digital identification number issued by the NBR to track and maintain a taxpayer’s official record.',
    example: 'Required to open merchant accounts, apply for credit cards, or register commercial properties.',
    source: 'Section 261, Income Tax Act 2023',
    authority: 'National Board of Revenue (NBR)',
  },
  {
    term: 'e-Return Portal',
    bangla: 'অনলাইন রিটার্ন পোর্টাল',
    definition: 'The official digital web platform provided by the National Board of Revenue (etaxnbr.gov.bd) for paperless return submission and certificate download.',
    example: 'Allows taxpayers to file returns, calculate tax, pay via mobile banking/cards, and download proof of submission instantly.',
    source: 'Section 174, Income Tax Act 2023',
    authority: 'National Board of Revenue (NBR)',
  },
];
