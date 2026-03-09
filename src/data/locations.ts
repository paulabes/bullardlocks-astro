export type ServiceSlug = 'auto-locksmith' | 'emergency-locksmith' | 'safe-engineer';

export interface Borough {
  slug: string;
  name: string;
  region: 'north-london' | 'central-london';
  postcodes: string[];
  areas: string[];
  services: ServiceSlug[];
  responseTime: string;
  description: string;
  landmarks: string[];
  nearbyBoroughs: string[];
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceMeta {
  name: string;
  icon: string;
  color: string;
  tagline: string;
  features: string[];
  includedServices: ServiceFeature[];
}

export const boroughs: Borough[] = [
  {
    slug: 'haringey',
    name: 'Haringey',
    region: 'north-london',
    postcodes: ['N4', 'N6', 'N8', 'N10', 'N15', 'N17', 'N22'],
    areas: ['Crouch End', 'Muswell Hill', 'Wood Green', 'Tottenham', 'Hornsey', 'Finsbury Park', 'Stroud Green', 'Alexandra Park'],
    services: ['auto-locksmith', 'emergency-locksmith', 'safe-engineer'],
    responseTime: '20–30 mins',
    description: 'Our home borough — Bullard Locks is based in Crouch End N8, giving us unrivalled local knowledge and the fastest response times across all of Haringey.',
    landmarks: ['Alexandra Palace', 'Crouch End Broadway', 'Wood Green Shopping City', 'Tottenham Hotspur Stadium'],
    nearbyBoroughs: ['barnet', 'camden', 'islington', 'hackney', 'enfield'],
  },
  {
    slug: 'barnet',
    name: 'Barnet',
    region: 'north-london',
    postcodes: ['N2', 'N3', 'N11', 'N12', 'N20', 'EN4', 'EN5'],
    areas: ['East Finchley', 'Finchley Central', 'New Barnet', 'Whetstone', 'High Barnet', 'Friern Barnet', 'New Southgate', 'Mill Hill'],
    services: ['auto-locksmith', 'emergency-locksmith', 'safe-engineer'],
    responseTime: '25–40 mins',
    description: 'Covering the full London Borough of Barnet — from East Finchley to High Barnet and everywhere in between.',
    landmarks: ['East Finchley Underground', 'The Spires Shopping Centre', 'Totteridge & Whetstone Station', 'High Barnet Station'],
    nearbyBoroughs: ['haringey', 'camden', 'enfield'],
  },
  {
    slug: 'camden',
    name: 'Camden',
    region: 'north-london',
    postcodes: ['NW1', 'NW3', 'NW5', 'NW6', 'WC1'],
    areas: ['Camden Town', 'Kentish Town', 'Hampstead', 'Swiss Cottage', 'Belsize Park', 'Primrose Hill', 'Kilburn', 'Gospel Oak'],
    services: ['auto-locksmith', 'emergency-locksmith', 'safe-engineer'],
    responseTime: '25–35 mins',
    description: 'From Camden Market to Hampstead Heath, we provide rapid auto locksmith and emergency locksmith services across all of Camden.',
    landmarks: ['Camden Market', 'Hampstead Heath', 'Primrose Hill', 'The British Museum'],
    nearbyBoroughs: ['haringey', 'barnet', 'islington', 'westminster'],
  },
  {
    slug: 'islington',
    name: 'Islington',
    region: 'north-london',
    postcodes: ['N1', 'N7', 'N19', 'EC1'],
    areas: ['Angel', 'Highbury', 'Holloway', 'Archway', 'Finsbury', 'Clerkenwell', 'Barnsbury', 'Caledonian Road'],
    services: ['auto-locksmith', 'emergency-locksmith', 'safe-engineer'],
    responseTime: '20–30 mins',
    description: "Serving all of Islington — from Angel and Clerkenwell to Archway and Highbury — with rapid response locksmith services.",
    landmarks: ['Angel Underground', 'Emirates Stadium', "Sadler's Wells", 'Chapel Market'],
    nearbyBoroughs: ['haringey', 'camden', 'hackney', 'city-of-london'],
  },
  {
    slug: 'hackney',
    name: 'Hackney',
    region: 'north-london',
    postcodes: ['E8', 'E9', 'E5', 'N16', 'N1'],
    areas: ['Hackney Central', 'Dalston', 'Stoke Newington', 'Clapton', 'Homerton', 'London Fields', 'Shoreditch', 'De Beauvoir Town'],
    services: ['auto-locksmith', 'emergency-locksmith', 'safe-engineer'],
    responseTime: '25–40 mins',
    description: 'Covering Hackney, Dalston, Stoke Newington and surrounding areas with professional 24/7 auto locksmith and emergency locksmith services.',
    landmarks: ['Broadway Market', 'Victoria Park', 'Hackney Central Station', 'Dalston Junction'],
    nearbyBoroughs: ['islington', 'haringey', 'tower-hamlets'],
  },
  {
    slug: 'enfield',
    name: 'Enfield',
    region: 'north-london',
    postcodes: ['EN1', 'EN2', 'EN3', 'N9', 'N13', 'N14', 'N18', 'N21'],
    areas: ['Enfield Town', 'Southgate', 'Edmonton', 'Winchmore Hill', 'Palmers Green', 'Bush Hill Park', 'Ponders End', 'Chase Side'],
    services: ['auto-locksmith', 'emergency-locksmith', 'safe-engineer'],
    responseTime: '30–45 mins',
    description: "North London's largest borough — we cover all of Enfield including Southgate, Edmonton, Winchmore Hill and beyond.",
    landmarks: ['Southgate Underground', 'Enfield Town Station', 'Forty Hall', 'Trent Country Park'],
    nearbyBoroughs: ['barnet', 'haringey'],
  },
  {
    slug: 'westminster',
    name: 'Westminster',
    region: 'central-london',
    postcodes: ['W1', 'W2', 'SW1', 'WC2', 'NW1'],
    areas: ['Mayfair', 'Soho', 'Marylebone', 'Paddington', 'Pimlico', 'Victoria', 'Bayswater', "St James's"],
    services: ['auto-locksmith', 'safe-engineer'],
    responseTime: '30–45 mins',
    description: 'Central London auto locksmith covering Westminster — from Mayfair and Soho to Victoria and Paddington.',
    landmarks: ['Oxford Street', 'Hyde Park', 'Buckingham Palace', 'Marble Arch'],
    nearbyBoroughs: ['camden', 'kensington-chelsea', 'city-of-london'],
  },
  {
    slug: 'city-of-london',
    name: 'City of London',
    region: 'central-london',
    postcodes: ['EC1', 'EC2', 'EC3', 'EC4'],
    areas: ['The City', 'Barbican', 'Bank', 'Monument', 'Aldgate', 'Bishopsgate', 'Cannon Street', 'Moorgate'],
    services: ['auto-locksmith', 'safe-engineer'],
    responseTime: '30–45 mins',
    description: 'Auto locksmith services in the Square Mile — EC1 to EC4 covered for car key replacement and vehicle lockout assistance.',
    landmarks: ["St Paul's Cathedral", 'Bank of England', "Lloyd's of London", 'The Gherkin'],
    nearbyBoroughs: ['islington', 'hackney', 'southwark'],
  },
  {
    slug: 'kensington-chelsea',
    name: 'Kensington & Chelsea',
    region: 'central-london',
    postcodes: ['W8', 'W11', 'SW3', 'SW5', 'SW7', 'SW10'],
    areas: ['Kensington', 'Chelsea', 'Notting Hill', 'South Kensington', 'Brompton', "Earl's Court", 'Holland Park'],
    services: ['auto-locksmith', 'safe-engineer'],
    responseTime: '35–50 mins',
    description: 'Premium auto locksmith service for Kensington, Chelsea, Notting Hill and the surrounding Royal Borough.',
    landmarks: ['Notting Hill Gate', 'Natural History Museum', "King's Road", 'Portobello Market'],
    nearbyBoroughs: ['westminster', 'hammersmith-fulham'],
  },
  {
    slug: 'hammersmith-fulham',
    name: 'Hammersmith & Fulham',
    region: 'central-london',
    postcodes: ['W6', 'W12', 'W14', 'SW6'],
    areas: ['Hammersmith', 'Fulham', "Shepherd's Bush", 'Parsons Green', 'West Kensington', 'Barons Court', 'White City'],
    services: ['auto-locksmith', 'safe-engineer'],
    responseTime: '40–55 mins',
    description: "West London auto locksmith covering Hammersmith, Fulham and Shepherd's Bush with professional mobile service.",
    landmarks: ['Hammersmith Apollo', 'Westfield London', 'Stamford Bridge', 'Ravenscourt Park'],
    nearbyBoroughs: ['kensington-chelsea', 'westminster'],
  },
];

export const servicesMeta: Record<ServiceSlug, ServiceMeta> = {
  'auto-locksmith': {
    name: 'Auto Locksmith',
    icon: 'fas fa-car-side',
    color: '#1fae9b',
    tagline: 'Mobile auto locksmith — car key replacement, programming & lockout specialist',
    features: [
      'Car key cutting & coding',
      'Key fob replacement & repair',
      'Vehicle lockout — no damage',
      'Lost car key replacement',
      'Transponder programming',
      'All UK makes & models',
    ],
    includedServices: [
      {
        icon: 'fas fa-key',
        title: 'Car Key Replacement',
        description: 'New keys cut and programmed to your vehicle on the spot. Works with all major UK and European makes and models.',
      },
      {
        icon: 'fas fa-microchip',
        title: 'Key Programming & Coding',
        description: 'Transponder chip programming, remote key fobs and smart keys for all modern vehicles including luxury and prestige cars.',
      },
      {
        icon: 'fas fa-car',
        title: 'Vehicle Lockout',
        description: 'Locked out of your car? We open vehicles without causing damage and get you back on the road fast.',
      },
      {
        icon: 'fas fa-broadcast-tower',
        title: 'Key Fob Repair',
        description: 'Remote fob repair and replacement for all vehicles. We carry a wide range of blanks and can programme on-site.',
      },
    ],
  },
  'emergency-locksmith': {
    name: 'Emergency Locksmith',
    icon: 'fas fa-shield-alt',
    color: '#0e4a4d',
    tagline: '24/7 emergency locksmith — fast response for lockouts, break-ins & urgent security',
    features: [
      '24/7 availability — 365 days',
      'No call-out fee',
      'Lockout assistance',
      'Break-in board-up & repair',
      'British Standard lock fitting',
      'Key extraction',
    ],
    includedServices: [
      {
        icon: 'fas fa-door-open',
        title: 'Lockout Assistance',
        description: 'Locked out of your home or flat? We gain entry fast without damaging your door or locks in the vast majority of cases.',
      },
      {
        icon: 'fas fa-tools',
        title: 'Break-in Repair',
        description: 'Emergency door and lock repairs after a break-in. We secure your property the same day, leaving it safe overnight.',
      },
      {
        icon: 'fas fa-lock',
        title: 'Lock Replacement',
        description: 'Upgrade or replace locks after a lockout or security incident. We fit British Standard and anti-snap locks.',
      },
      {
        icon: 'fas fa-search',
        title: 'Key Extraction',
        description: 'Key snapped in the lock? We extract broken keys cleanly and replace if needed — without replacing the whole lock.',
      },
    ],
  },
  'safe-engineer': {
    name: 'Safe Engineer',
    icon: 'fas fa-shield-halved',
    color: '#1a3a5c',
    tagline: 'Professional safe engineer — opening, installation & repair by appointment',
    features: [
      'Non-destructive safe opening',
      'Safe supply & installation',
      'Combination changes',
      'Fire safe servicing',
      'All major safe brands',
      'UK-wide by appointment',
    ],
    includedServices: [
      {
        icon: 'fas fa-lock-open',
        title: 'Non-Destructive Opening',
        description: 'Forgot the combination or lost the key? We open safes without damage in most cases, preserving the safe for continued use.',
      },
      {
        icon: 'fas fa-box',
        title: 'Safe Installation',
        description: 'Supply and installation of new safes including floor-standing, wall-mounted and underfloor options for homes and businesses.',
      },
      {
        icon: 'fas fa-cog',
        title: 'Combination Changes',
        description: 'Change the code or combination on your existing safe for added security after a change of staff or security breach.',
      },
      {
        icon: 'fas fa-wrench',
        title: 'Repair & Maintenance',
        description: 'Safe mechanism repair, lock servicing and general maintenance for all major safe brands including Chubb, Fichet and Burton.',
      },
    ],
  },
};

export function getFAQItems(serviceSlug: ServiceSlug, borough: Borough): { q: string; a: string }[] {
  const postcodeList = borough.postcodes.slice(0, 3).join(', ');

  if (serviceSlug === 'auto-locksmith') {
    return [
      {
        q: `How quickly can an auto locksmith reach me in ${borough.name}?`,
        a: `We typically reach anywhere in ${borough.name} within ${borough.responseTime}. Our van is based in Crouch End N8, so we're especially fast in ${postcodeList} and neighbouring areas.`,
      },
      {
        q: `Do you replace car keys for all makes in ${borough.name}?`,
        a: 'Yes — we cover all major UK and European makes including Ford, Vauxhall, BMW, Mercedes, Audi, Volkswagen, Toyota, Honda, Nissan and many more. We carry specialist equipment to cut and programme keys on-site.',
      },
      {
        q: `How much does car key replacement cost in ${borough.name}?`,
        a: "Prices vary depending on your vehicle make, model and year. We'll give you a clear fixed quote before starting any work. There's no call-out fee and no hidden charges.",
      },
      {
        q: `Can you help if I've lost all my car keys in ${borough.name}?`,
        a: "Yes — even if you've lost every key to the vehicle. We can cut new keys from the lock code and programme them to match your car's immobiliser and central locking system.",
      },
      {
        q: `Do you come to me, or do I need to bring the car to you?`,
        a: `We are fully mobile — we come to you anywhere in ${borough.name}. Whether you're at home, at work, or stuck in a car park, we'll come to your exact location.`,
      },
      {
        q: `Are you available for car lockouts on weekends in ${borough.name}?`,
        a: `Yes. We operate 7 days a week across ${borough.name}. For vehicle lockouts, call us directly on 07809 887 883 and we'll aim to reach you within ${borough.responseTime}.`,
      },
    ];
  }

  if (serviceSlug === 'emergency-locksmith') {
    return [
      {
        q: `How quickly can you reach me in ${borough.name} for an emergency?`,
        a: `Our typical response time across ${borough.name} is ${borough.responseTime}. Being based in Crouch End, we are particularly quick in ${postcodeList} and nearby areas.`,
      },
      {
        q: `Do you charge a call-out fee for emergency locksmith work in ${borough.name}?`,
        a: 'No — there is no call-out fee for any of our services. You only pay for the work actually carried out, and we quote before we start.',
      },
      {
        q: `What happens if my lock is damaged during a break-in in ${borough.name}?`,
        a: "We carry a full range of British Standard anti-snap locks on the van. We'll replace your damaged lock with a quality upgrade the same day, leaving your property fully secure.",
      },
      {
        q: `Can you extract a broken key from a lock in ${borough.name}?`,
        a: "Yes — broken key extraction is a specialist skill we deal with regularly. We remove the broken piece cleanly in most cases without needing to replace the entire lock cylinder.",
      },
      {
        q: `Is your emergency locksmith service available 24/7 in ${borough.name}?`,
        a: `Yes — 24 hours a day, 7 days a week, 365 days a year. Lockouts and security emergencies don't keep office hours, and neither do we.`,
      },
      {
        q: `What identification do you carry so I know you're legitimate?`,
        a: "William Bullard carries full photo ID, proof of professional registration, and is listed on the Metropolitan Police approved contractor scheme. We are also DBS checked and fully insured.",
      },
    ];
  }

  // safe-engineer
  return [
    {
      q: `Do you offer safe opening in ${borough.name}?`,
      a: `Yes — safe engineer services are available in ${borough.name} by appointment. We specialise in non-destructive opening, which means we open your safe without damaging it in the vast majority of cases.`,
    },
    {
      q: `What brands of safe can you open in ${borough.name}?`,
      a: "We work on all major safe brands including Chubb, Fichet, Burton, Dudley, De Raat, Phoenix, Brattonsound and many more. If in doubt, call us with the make and model.",
    },
    {
      q: `Do you come to ${borough.name}, or do I need to bring the safe to you?`,
      a: `We come to you. Our safe engineer service is fully mobile and covers ${borough.name} and the wider London area by appointment.`,
    },
    {
      q: `How long does safe opening take?`,
      a: "This depends on the make, model and nature of the problem. Most non-destructive openings are completed within 1–2 hours. We'll give you an honest assessment before we begin.",
    },
    {
      q: `Can you install a new safe in ${borough.name}?`,
      a: `Yes — we supply and install safes for homes and businesses across ${borough.name}. We'll help you choose the right safe for your security needs and budget, and arrange professional fitting.`,
    },
    {
      q: `Is the safe engineer service available UK-wide?`,
      a: "Yes — while we're based in North London, our safe engineer service covers the whole of the UK by appointment. Please call us to discuss your requirements and we'll arrange a convenient time.",
    },
  ];
}
