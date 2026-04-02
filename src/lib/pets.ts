export type Category = 'all' | 'http-status' | 'emotions' | 'activities' | 'working' | 'seasonal';

export interface Pet {
  slug: string;
  name: string;
  fileName: string;
  category: Category;
}

const categoryMap: Record<string, Category> = {
  // HTTP Status Codes
  '200': 'http-status',
  '201': 'http-status',
  '204': 'http-status',
  '301': 'http-status',
  '400': 'http-status',
  '401': 'http-status',
  '403': 'http-status',
  '404': 'http-status',
  '408': 'http-status',
  '418': 'http-status',
  '429': 'http-status',
  '451': 'http-status',
  '500': 'http-status',
  '502': 'http-status',
  '503': 'http-status',
  '504': 'http-status',
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
  'sad': 'emotions',
  'sick': 'emotions',
  'smile': 'emotions',
  'evil': 'emotions',
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
  'working-reviewing': 'working',
  'working-deploying': 'working',
  'working-merging': 'working',
  'working-testing': 'working',
  'working-pairing': 'working',
  'working-oncall': 'working',
  'working-meeting': 'working',
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

// All pet slugs — grouped by category, emotions first
const petSlugs = [
  // Emotions
  'clawd-angry', 'clawd-bored', 'clawd-celebrating', 'clawd-confused', 'clawd-cool',
  'clawd-crying', 'clawd-dizzy', 'clawd-embarrassed', 'clawd-facepalm', 'clawd-grumpy',
  'clawd-happy', 'clawd-hopeful', 'clawd-jealous', 'clawd-laughing', 'clawd-love',
  'clawd-mindblown', 'clawd-praying', 'clawd-scared', 'clawd-shrug', 'clawd-sick',
  'clawd-sad', 'clawd-smile', 'clawd-evil', 'clawd-surprised', 'clawd-yawning',
  // Activities
  'clawd-astronaut', 'clawd-battery-low', 'clawd-birthday', 'clawd-bowling',
  'clawd-camping', 'clawd-charging', 'clawd-chef', 'clawd-clapping', 'clawd-climbing',
  'clawd-coding', 'clawd-coffee', 'clawd-crab-walking', 'clawd-crafting',
  'clawd-dancing', 'clawd-detective', 'clawd-disconnected', 'clawd-dj',
  'clawd-driving', 'clawd-drumming', 'clawd-eating', 'clawd-error',
  'clawd-fire', 'clawd-fishing', 'clawd-flexing', 'clawd-flying',
  'clawd-gaming', 'clawd-gardening', 'clawd-gift', 'clawd-going-away',
  'clawd-ice-cream', 'clawd-idea', 'clawd-idle-living', 'clawd-king',
  'clawd-lifting', 'clawd-loading', 'clawd-magic', 'clawd-mail',
  'clawd-meditating', 'clawd-money', 'clawd-music', 'clawd-ninja',
  'clawd-notification', 'clawd-painting', 'clawd-peeking', 'clawd-photography',
  'clawd-pirate', 'clawd-podcast', 'clawd-rainbow', 'clawd-reading',
  'clawd-rocket', 'clawd-running', 'clawd-security', 'clawd-shipping',
  'clawd-singing', 'clawd-skateboard', 'clawd-sleeping', 'clawd-snow',
  'clawd-star', 'clawd-static-base', 'clawd-studying', 'clawd-superhero',
  'clawd-surfing', 'clawd-swimming', 'clawd-telescope', 'clawd-time-travel',
  'clawd-trophy', 'clawd-umbrella', 'clawd-waving', 'clawd-yoga',
  // Working
  'clawd-working-beacon', 'clawd-working-building', 'clawd-working-carrying',
  'clawd-working-conducting', 'clawd-working-confused', 'clawd-working-debugger',
  'clawd-working-deploying', 'clawd-working-juggling', 'clawd-working-meeting',
  'clawd-working-merging', 'clawd-working-oncall', 'clawd-working-overheated',
  'clawd-working-pairing', 'clawd-working-pushing', 'clawd-working-reviewing',
  'clawd-working-sweeping', 'clawd-working-testing', 'clawd-working-thinking',
  'clawd-working-typing', 'clawd-working-wizard',
  // Seasonal
  'clawd-valentine', 'clawd-halloween', 'clawd-christmas', 'clawd-new-year',
  'clawd-spring', 'clawd-summer', 'clawd-autumn', 'clawd-winter',
  // HTTP Status
  'clawd-200', 'clawd-201', 'clawd-204', 'clawd-301',
  'clawd-400', 'clawd-401', 'clawd-403', 'clawd-404', 'clawd-408',
  'clawd-418', 'clawd-429', 'clawd-451',
  'clawd-500', 'clawd-502', 'clawd-503', 'clawd-504',
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
