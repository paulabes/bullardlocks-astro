export interface GuideMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  icon: string;
}

export const guides: GuideMeta[] = [
  {
    slug: 'locksmith-cost-london',
    title: 'How Much Does a Locksmith Cost in London?',
    excerpt: 'A transparent 2026 pricing guide for home, auto and safe locksmith services across London, with typical ranges and what affects the price.',
    category: 'Pricing',
    readTime: '6 min read',
    icon: 'fa-pound-sign',
  },
  {
    slug: 'lost-all-car-keys-what-to-do',
    title: "Lost All Your Car Keys? Here's What to Do",
    excerpt: 'Step-by-step guide for the all-keys-lost situation. How an auto locksmith resolves it without dealer involvement, and what it typically costs.',
    category: 'Auto',
    readTime: '7 min read',
    icon: 'fa-key',
  },
  {
    slug: 'auto-locksmith-vs-dealer',
    title: 'Auto Locksmith vs Main Dealer: Which Should You Use?',
    excerpt: 'Comparison of cost, turnaround, and capability when replacing or programming car keys. When the dealer makes sense, and when a mobile auto locksmith wins.',
    category: 'Auto',
    readTime: '5 min read',
    icon: 'fa-car-side',
  },
  {
    slug: 'home-insurance-lock-requirements',
    title: 'What Lock Does My Home Insurance Need?',
    excerpt: 'UK home insurance lock requirements decoded - BS3621, TS007 3-star anti-snap, Sold Secure - and how to comply without overspending.',
    category: 'Security',
    readTime: '7 min read',
    icon: 'fa-shield-alt',
  },
  {
    slug: 'anti-snap-cylinders-explained',
    title: 'Anti-Snap Cylinders Explained',
    excerpt: 'TS007 1★, 2★, 3★ and Sold Secure Diamond ratings explained. How lock-snapping works and which cylinder your UPVC door actually needs.',
    category: 'Security',
    readTime: '6 min read',
    icon: 'fa-lock',
  },
  {
    slug: 'what-to-do-after-burglary-london',
    title: 'What to Do After a Burglary in London',
    excerpt: 'Practical step-by-step from the 999/101 call through evidence preservation, insurance claim, and securing the property the same night.',
    category: 'Emergency',
    readTime: '8 min read',
    icon: 'fa-house-damage',
  },
];
