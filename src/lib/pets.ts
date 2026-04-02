export type Category = 'all' | 'http-status' | 'emotions' | 'activities' | 'working' | 'seasonal';

export interface Pet {
  slug: string;
  name: string;
  fileName: string;
  category: Category;
}

const categoryMap: Record<string, Category> = {
  // HTTP Status Codes
  '400': 'http-status',
  '401': 'http-status',
  '403': 'http-status',
  '404': 'http-status',
  '408': 'http-status',
  '429': 'http-status',
  '500': 'http-status',
  '502': 'http-status',
  '503': 'http-status',
  // Emotions
  'angry': 'emotions',
  'bored': 'emotions',
  'celebrating': 'emotions',
  'cool': 'emotions',
  'crying': 'emotions',
  'dizzy': 'emotions',
  'facepalm': 'emotions',
  'happy': 'emotions',
  'laughing': 'emotions',
  'love': 'emotions',
  'mindblown': 'emotions',
  'praying': 'emotions',
  'scared': 'emotions',
  'shrug': 'emotions',
  'sick': 'emotions',
  'surprised': 'emotions',
  'yawning': 'emotions',
  'embarrassed': 'emotions',
  'confused': 'emotions',
  'grumpy': 'emotions',
  'hopeful': 'emotions',
  'jealous': 'emotions',
  // Seasonal / Holiday
  'valentine': 'seasonal',
  'halloween': 'seasonal',
  'christmas': 'seasonal',
  'new-year': 'seasonal',
  'spring': 'seasonal',
  'summer': 'seasonal',
  'autumn': 'seasonal',
  'winter': 'seasonal',
  // Working States
  'working-beacon': 'working',
  'working-building': 'working',
  'working-carrying': 'working',
  'working-conducting': 'working',
  'working-confused': 'working',
  'working-debugger': 'working',
  'working-juggling': 'working',
  'working-overheated': 'working',
  'working-pushing': 'working',
  'working-sweeping': 'working',
  'working-thinking': 'working',
  'working-typing': 'working',
  'working-wizard': 'working',
};

function formatName(slug: string): string {
  return slug
    .replace(/^clawd-/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getCategory(slug: string): Category {
  const key = slug.replace(/^clawd-/, '');
  // Check longest match first (for working-* variants)
  if (categoryMap[key]) return categoryMap[key];
  return 'activities';
}

// All pet slugs
const petSlugs = [
  'clawd-400', 'clawd-401', 'clawd-403', 'clawd-404', 'clawd-408', 'clawd-429',
  'clawd-500', 'clawd-502', 'clawd-503',
  'clawd-angry', 'clawd-astronaut', 'clawd-battery-low', 'clawd-birthday',
  'clawd-bored', 'clawd-celebrating', 'clawd-charging', 'clawd-chef',
  'clawd-clapping', 'clawd-coding', 'clawd-coffee', 'clawd-cool',
  'clawd-crab-walking', 'clawd-crying', 'clawd-dancing', 'clawd-detective',
  'clawd-disconnected', 'clawd-dizzy', 'clawd-eating', 'clawd-error',
  'clawd-facepalm', 'clawd-fire', 'clawd-fishing', 'clawd-flexing',
  'clawd-flying', 'clawd-gaming', 'clawd-gardening', 'clawd-gift',
  'clawd-going-away', 'clawd-happy', 'clawd-idea', 'clawd-idle-living',
  'clawd-king', 'clawd-laughing', 'clawd-lifting', 'clawd-loading',
  'clawd-love', 'clawd-mail', 'clawd-meditating', 'clawd-mindblown',
  'clawd-money', 'clawd-music', 'clawd-ninja', 'clawd-notification',
  'clawd-painting', 'clawd-peeking', 'clawd-pirate', 'clawd-praying',
  'clawd-rainbow', 'clawd-reading', 'clawd-rocket', 'clawd-running',
  'clawd-scared', 'clawd-security', 'clawd-shipping', 'clawd-shrug',
  'clawd-sick', 'clawd-singing', 'clawd-skateboard', 'clawd-sleeping',
  'clawd-snow', 'clawd-star', 'clawd-static-base', 'clawd-surfing',
  'clawd-telescope', 'clawd-trophy', 'clawd-umbrella', 'clawd-waving',
  'clawd-working-beacon', 'clawd-working-building', 'clawd-working-carrying',
  'clawd-working-conducting', 'clawd-working-confused', 'clawd-working-debugger',
  'clawd-working-juggling', 'clawd-working-overheated', 'clawd-working-pushing',
  'clawd-working-sweeping', 'clawd-working-thinking', 'clawd-working-typing',
  'clawd-working-wizard', 'clawd-yoga',
  'clawd-surprised', 'clawd-yawning', 'clawd-embarrassed', 'clawd-confused',
  'clawd-grumpy', 'clawd-hopeful', 'clawd-jealous',
  'clawd-valentine', 'clawd-halloween', 'clawd-christmas', 'clawd-new-year',
  'clawd-spring', 'clawd-summer', 'clawd-autumn', 'clawd-winter',
];

export const pets: Pet[] = petSlugs.map(slug => ({
  slug,
  name: formatName(slug),
  fileName: `${slug}.svg`,
  category: getCategory(slug),
}));

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: 'all', label: 'All', emoji: '✦' },
  { id: 'emotions', label: 'Emotions', emoji: '♡' },
  { id: 'activities', label: 'Activities', emoji: '⚡' },
  { id: 'working', label: 'Working', emoji: '⌨' },
  { id: 'seasonal', label: 'Seasonal', emoji: '🍂' },
  { id: 'http-status', label: 'HTTP Status', emoji: '⟨/⟩' },
];

export const heroPets = [
  'clawd-happy', 'clawd-coding', 'clawd-dancing', 'clawd-astronaut',
  'clawd-ninja', 'clawd-cool', 'clawd-celebrating', 'clawd-rocket',
];
