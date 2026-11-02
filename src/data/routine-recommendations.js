// DRAFT recommendation logic: client review required before publishing.
// No diagnostic claims; retinol is deliberately excluded from automated results.
export const routineQuestions = [
  { id: 'concern', eyebrow: 'Your priorities', title: 'What is your primary skin concern?', options: [
    { value: 'hydrate-restore', label: 'Hydrate & Restore', detail: 'Comfort and moisture' },
    { value: 'firm-smooth', label: 'Firm & Smooth', detail: 'A smoother-looking finish' },
    { value: 'brighten-revitalize', label: 'Brighten & Revitalize', detail: 'Radiant-looking skin' },
    { value: 'calm-balance', label: 'Calm & Balance', detail: 'A gentle-feeling ritual' },
  ] },
  { id: 'skin', eyebrow: 'Your skin', title: 'How would you describe your skin?', options: [
    { value: 'dry', label: 'Dry', detail: 'Often feels tight or needs moisture' },
    { value: 'oily', label: 'Oily', detail: 'Often feels shiny' },
    { value: 'combination', label: 'Combination', detail: 'Dry and oily areas' },
    { value: 'normal', label: 'Normal', detail: 'Generally feels balanced' },
    { value: 'sensitive', label: 'Sensitive', detail: 'Prefers a cautious, minimal approach' },
  ] },
  { id: 'experience', eyebrow: 'Your experience', title: 'What is your current skincare experience?', options: [
    { value: 'beginner', label: 'Beginner', detail: 'I like simple guidance' },
    { value: 'some', label: 'Some experience', detail: 'I have a few favourites' },
    { value: 'experienced', label: 'Experienced', detail: 'I already have a routine' },
  ] },
  { id: 'length', eyebrow: 'Your preference', title: 'What kind of routine do you prefer?', options: [
    { value: 'minimal', label: 'Minimal', detail: 'A few intentional steps' },
    { value: 'comprehensive', label: 'Comprehensive', detail: 'A more complete ritual' },
  ] },
  { id: 'time', eyebrow: 'Your schedule', title: 'When will you use your routine?', options: [
    { value: 'am', label: 'Morning', detail: 'Start the day' },
    { value: 'pm', label: 'Evening', detail: 'Wind down at night' },
    { value: 'both', label: 'Both', detail: 'Morning and evening' },
  ] },
];

// All mappings here are illustrative, NOT client-approved. Actual suitability,
// sequencing and ingredient compatibility must be reviewed before going live.
export const recommendationMatrix = {
  'hydrate-restore': { serum: 'barrier-peptide-serum', moisturizer: 'pure-ceramide-barrier-cream' },
  'firm-smooth': { serum: 'barrier-peptide-serum', moisturizer: 'multi-peptide-firming-cream' },
  'brighten-revitalize': { serum: 'vitamin-c-peptide-brightening-serum', moisturizer: 'pure-ceramide-barrier-cream' },
  'calm-balance': { serum: 'barrier-peptide-serum', moisturizer: 'pure-ceramide-barrier-cream' },
};

export const quizDefaults = { concern: '', skin: '', experience: '', length: '', time: '' };
export function validAnswers(source = {}) {
  const entries = Object.fromEntries(routineQuestions.map(q => [q.id, q.options.some(o => o.value === source[q.id]) ? source[q.id] : '']));
  return entries;
}
export function isComplete(answers) { return routineQuestions.every(q => !!answers[q.id]); }

export function buildRecommendation(answers, allProducts) {
  const a = validAnswers(answers);
  if (!isComplete(a)) return null;
  const matrix = recommendationMatrix[a.concern];
  // Cautious choices are for prototype display, not a clinical recommendation.
  const cleanser = a.skin === 'oily' ? 'purifying-peptide-cleanser' : 'soothing-peptide-cleanser';
  const names = {
    'hydrate-restore': 'The Hydration Ritual', 'firm-smooth': 'The Firm & Smooth Ritual',
    'brighten-revitalize': 'The Radiance Ritual', 'calm-balance': 'The Comfort Ritual',
  };
  const includeCleanser = a.length === 'comprehensive';
  const steps = [
    ...(includeCleanser ? [{ handle: cleanser, step: 'Cleanse', instruction: 'Gently cleanse and rinse according to the product label.' }] : []),
    { handle: matrix.serum, step: 'Serum', instruction: 'Apply as directed on the product label.' },
    { handle: matrix.moisturizer, step: 'Moisturize', instruction: 'Apply after serum as directed.' },
  ];
  // Minimal still offers two products; gentle daily cleansing can be continued separately.
  const productMap = new Map(allProducts.map(p => [p.handle, p]));
  const usableSteps = steps.filter(s => productMap.has(s.handle));
  const uniqueHandles = [...new Set(usableSteps.map(s => s.handle))];
  const products = uniqueHandles.map(h => productMap.get(h));
  const estimatedPrice = products.every(p => typeof p.price === 'number' && Number.isFinite(p.price))
    ? products.reduce((sum, p) => sum + p.price, 0) : null;
  const note = a.skin === 'sensitive'
    ? 'For skin that tends to react easily, introduce one new product at a time and patch test as directed. Stop use if irritation occurs.'
    : 'Introduce new products thoughtfully, follow each product label, and adjust use according to how your skin responds.';
  const makeSteps = () => usableSteps.map(s => ({ ...s, product: productMap.get(s.handle) }));
  return {
    title: names[a.concern], subtitle: 'A draft routine inspired by your preferences.',
    products, estimatedPrice, note,
    am: a.time === 'pm' ? [] : makeSteps(),
    pm: a.time === 'am' ? [] : makeSteps(),
    needsSunscreen: a.time !== 'pm',
    // Retinol is intentionally never recommended by the quiz.
  };
}
