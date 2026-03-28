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
    nearbyBoroughs: ['islington', 'haringey'],
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
    nearbyBoroughs: ['islington', 'hackney', 'westminster'],
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
        a: `An auto locksmith from Bullard Locks typically arrives anywhere in ${borough.name} within ${borough.responseTime}. William Bullard operates from a fully equipped mobile workshop based in Crouch End N8, which means postcodes ${postcodeList} and surrounding areas benefit from some of the fastest auto locksmith response times in London. All diagnostic tools, key blanks and programming equipment travel in the van, so work begins immediately on arrival — there is no waiting for parts or return visits.`,
      },
      {
        q: `What car makes and models can you replace keys for in ${borough.name}?`,
        a: `Bullard Locks carries key cutting and transponder programming equipment for virtually every vehicle on UK roads. This includes all Ford, Vauxhall, BMW, Mercedes-Benz, Audi, Volkswagen, Toyota, Honda, Nissan, Hyundai, Kia, Peugeot, Citroën, Renault, Fiat, SEAT, Škoda, Land Rover and Jaguar models — as well as specialist tools for prestige marques such as Porsche, Bentley and Maserati. Keys are cut from high-security blanks, programmed to the vehicle's immobiliser system, and fully tested before the locksmith leaves.`,
      },
      {
        q: `How much does a car key replacement cost?`,
        a: `Car key replacement costs depend on three factors: the vehicle make, the model year, and the type of key required (standard transponder, remote fob, or proximity smart key). As a guide, standard transponder keys for common makes start from around £80–£120, while proximity smart keys for newer vehicles typically range from £150–£300. Bullard Locks provides a fixed written quote before any work begins, with no call-out fee and no hidden charges — you only pay the agreed price.`,
      },
      {
        q: `Can you help if I've lost all my car keys?`,
        a: `Yes. Losing every key to a vehicle is more common than most people realise, and it does not require a dealer visit or a tow truck. A qualified auto locksmith can read the lock code from the vehicle, cut a new mechanical blade to match, and then programme a fresh transponder chip to communicate with the car's immobiliser and central locking system. The entire process is completed at your location in ${borough.name} — typically within 60–90 minutes depending on the make and model.`,
      },
      {
        q: `Do you come to my location in ${borough.name}?`,
        a: `Bullard Locks is a fully mobile auto locksmith service. William drives to your exact location anywhere in ${borough.name} — whether that is your home driveway, a workplace car park, a supermarket, or the side of the road. There is no need to tow the vehicle to a garage or dealer. The mobile workshop carries all the diagnostic computers, key cutting machines and programming devices needed to complete the job on the spot.`,
      },
      {
        q: `Are you available for car lockouts on weekends and evenings?`,
        a: `Yes. Vehicle lockout assistance is available 7 days a week across ${borough.name}, including evenings and bank holidays. A car lockout — where the keys are locked inside the vehicle or the boot — is resolved using non-destructive entry techniques that open the car without causing damage to locks, paintwork or door seals. Most lockouts are resolved within 15–30 minutes of the locksmith arriving. Call 07809 887 883 directly for the fastest response.`,
      },
    ];
  }

  if (serviceSlug === 'emergency-locksmith') {
    return [
      {
        q: `How fast can an emergency locksmith reach ${borough.name}?`,
        a: `Bullard Locks typically reaches any address in ${borough.name} within ${borough.responseTime} for emergency calls. The service operates from Crouch End N8, making postcodes ${postcodeList} and neighbouring areas among the fastest-response locations. Emergency calls are prioritised — when you phone 07809 887 883, you speak directly to William Bullard (not a call centre), who can give you an accurate arrival estimate within seconds.`,
      },
      {
        q: `Is there a call-out fee for emergency locksmith services?`,
        a: `No. Bullard Locks does not charge a call-out fee for any service, including emergency work at unsociable hours. This is an important distinction — many locksmith services advertise low call-out fees but then add charges for evenings, weekends or bank holidays. With Bullard Locks, you receive a single fixed price quote before any work begins, and that is the only amount you pay. There are no surcharges, no additional fees for parts already on the van, and no invoice surprises.`,
      },
      {
        q: `What should I do after a burglary to secure my home?`,
        a: `After a break-in, the first step is to call the police on 101 (or 999 if the intruder may still be present) and obtain a crime reference number — you will need this for your insurance claim. Next, call an emergency locksmith to secure the property. Bullard Locks carries British Standard BS3621 mortice deadlocks and TS007 3-star anti-snap Euro cylinders on the van, so damaged locks are replaced with insurance-approved upgrades on the same visit. Door frames are repaired or reinforced, and temporary boarding is fitted if glass panels are broken. The goal is to leave your property fully secure the same night.`,
      },
      {
        q: `Can a locksmith extract a broken key from a lock?`,
        a: `Yes. Broken key extraction is a routine procedure for a qualified locksmith. The snapped portion of the key is removed from the lock cylinder using specialist extraction tools — in most cases without damaging the lock mechanism itself. If the lock cylinder has been weakened by the break, the locksmith will advise on replacement. Bullard Locks carries a full range of Euro cylinders, rim cylinders and mortice lock cases on the van, so if replacement is needed, it happens on the same visit with no additional call-out.`,
      },
      {
        q: `Is the emergency locksmith service genuinely available 24 hours?`,
        a: `Yes — Bullard Locks operates a genuine 24/7 emergency locksmith service across ${borough.name}, 365 days a year including Christmas Day and bank holidays. This is not an answering service that redirects to a daytime callback. When you call 07809 887 883 at 3am, William Bullard answers the phone personally and dispatches to your location. The same experienced locksmith who handles daytime appointments also handles overnight emergencies.`,
      },
      {
        q: `How do I verify a locksmith is legitimate before letting them in?`,
        a: `A legitimate locksmith should be able to show you photo identification, proof of professional registration or trade association membership, and evidence of insurance. William Bullard carries a photographic ID card, his Master Locksmiths Association membership, and documentation confirming his listing on the Metropolitan Police approved contractor scheme. He is also DBS (Disclosure and Barring Service) checked and holds comprehensive public liability insurance. You can verify his credentials independently through the MLA website or by contacting the Metropolitan Police.`,
      },
    ];
  }

  // safe-engineer
  return [
    {
      q: `How does non-destructive safe opening work?`,
      a: `Non-destructive safe opening uses specialist techniques to open a safe without drilling, cutting or forcing the door. The exact method depends on the safe type: mechanical combination locks may be opened through manipulation (listening and feeling for the lock's internal gates), while electronic locks can sometimes be bypassed through diagnostic override procedures. Key-operated safes may be picked or decoded. The advantage is that the safe remains fully functional afterwards — the door, lock and body are undamaged, and the safe can continue to be used with a new combination or key. Bullard Locks achieves non-destructive opening in approximately 85% of cases.`,
    },
    {
      q: `What safe brands can you work on?`,
      a: `Bullard Locks services all major safe brands sold in the UK, including Chubb, Fichet-Bauche, Burton Safes, Dudley Safes, De Raat, Phoenix Safe, SMP Security, Brattonsound, Securikey, Burg-Wächter and Yale. This extends to older and discontinued models — many safes in London properties date back decades and were manufactured by companies like Milner, Ratner or Thomas Withers. If you can provide the make and model number (usually on a plate inside the door or on the base), William can confirm compatibility before visiting.`,
    },
    {
      q: `Do you travel to ${borough.name} for safe work?`,
      a: `Yes. The safe engineer service is fully mobile — William Bullard travels to your home or business premises in ${borough.name} with all specialist tools and equipment. There is no need to transport the safe anywhere. For London appointments, William visits to assess the safe, provides a written quote, and in most cases completes the work during the same visit. Heavier safes (floor-standing models bolted to concrete) are always worked on in situ.`,
    },
    {
      q: `How long does it take to open a safe?`,
      a: `The time required to open a safe depends on its make, model, lock type and the reason it won't open. A straightforward electronic safe with a flat battery can sometimes be resolved in under 30 minutes. A high-security mechanical combination safe requiring manipulation may take 2–4 hours. Drilling — used only as a last resort on safes that cannot be opened non-destructively — typically takes 1–3 hours depending on the safe's hardplate and relocker configuration. William provides an honest time estimate before work begins, so there are no surprises.`,
    },
    {
      q: `Can you supply and install a new safe in ${borough.name}?`,
      a: `Yes. Bullard Locks supplies and installs safes for both homes and businesses across ${borough.name}. Safe selection depends on what you need to protect and your insurance requirements — domestic safes are typically rated to £1,000–£10,000 cash cover, while commercial safes range from £10,000 to £150,000+ at Eurograde levels. William advises on the right specification, handles delivery, and professionally installs the safe — including bolting to floors or walls where required. All installations meet insurance underwriter requirements.`,
    },
    {
      q: `Is the safe engineer service available outside London?`,
      a: `Yes. While Bullard Locks is based in North London and primarily serves the Greater London area, the safe engineer service is available UK-wide by appointment. Safe work outside London is scheduled in advance to allow for travel time, and is particularly common for commercial clients with safes in multiple locations. Call 07809 887 883 to discuss your requirements — William will confirm availability, travel arrangements and provide a quote before committing to a visit.`,
    },
  ];
}
