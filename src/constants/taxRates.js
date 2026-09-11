export const TAX_CATEGORIES_CONFIG = [
  {
    id: 'general',
    label: 'General Individual (Male)',
    threshold: 350000,
    description: 'All individual taxpayers under 65 years who do not belong to special categories.',
  },
  {
    id: 'female',
    label: 'Female Taxpayers',
    threshold: 400000,
    description: 'All female individual taxpayers.',
  },
  {
    id: 'senior',
    label: 'Senior Citizens (65+ years)',
    threshold: 400000,
    description: 'Individuals aged 65 years or older.',
  },
  {
    id: 'disabled',
    label: 'Physically Challenged (Persons with Disability)',
    threshold: 475000,
    description: 'Individuals registered with certified physical disability.',
  },
  {
    id: 'gazetted_freedom_fighter',
    label: 'Gazetted War-Wounded Freedom Fighters',
    threshold: 500000,
    description: 'Gazetted freedom fighters of Bangladesh.',
  },
];

export const TAX_SLABS_DATA = [
  { slab: 'First ৳3,50,000*', rate: '0%', text: 'Tax Free (Exemption limit based on taxpayer category)' },
  { slab: 'Next ৳1,00,000', rate: '5%', text: 'Tax amount ৳5,000' },
  { slab: 'Next ৳4,00,000', rate: '10%', text: 'Tax amount ৳40,000' },
  { slab: 'Next ৳5,00,000', rate: '15%', text: 'Tax amount ৳75,000' },
  { slab: 'Next ৳5,00,000', rate: '20%', text: 'Tax amount ৳1,00,000' },
  { slab: 'Remaining Balance', rate: '25%', text: '25% on remaining income' },
];

export const MINIMUM_TAX_ZONES = [
  {
    id: 'dhaka_chattogram',
    label: 'Dhaka & Chattogram City Corporation',
    amount: 5000,
    description: 'Taxpayers residing or with principal source of income in Dhaka or Chattogram city corporation areas.',
  },
  {
    id: 'other_city_corporation',
    label: 'Other City Corporation Areas',
    amount: 4000,
    description: 'Taxpayers in Rajshahi, Khulna, Sylhet, Barishal, Rangpur, Cumilla, Gazipur, Narayanganj, Mymensingh city corporations.',
  },
  {
    id: 'non_city_corporation',
    label: 'Non-City Corporation / Rural Areas',
    amount: 3000,
    description: 'Taxpayers residing in municipalities, upazilas, or rural areas outside city corporations.',
  },
];
