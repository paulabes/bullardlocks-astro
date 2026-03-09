import type { ServiceSlug } from './locations';

export interface AreaContentBlock {
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

type ContentKey = `${string}/${ServiceSlug}`;

const areaContent: Record<ContentKey, AreaContentBlock> = {

  // ========================================
  // HARINGEY
  // ========================================

  'haringey/auto-locksmith': {
    heading: 'Auto Locksmith in Haringey — Our Home Turf',
    paragraphs: [
      'Bullard Locks is based right here in Crouch End N8, so Haringey is where we respond fastest. Whether your car is parked on a tight side street off Tottenham Lane, in one of the residents\' bays around Muswell Hill Broadway, or in a car park near Wood Green Shopping City, William can usually be with you in under 30 minutes.',
      'Haringey\'s mix of Victorian terraces and post-war estates means street parking is the norm — and that means more exposure to key theft and accidental lockouts. We regularly attend car key emergencies along Hornsey High Street, outside the shops on Crouch End Broadway, and near Alexandra Palace where event parking often leads to rushed lock-ins.',
      'As the nearest auto locksmith to most of N4, N6, N8, N10 and N22, we carry a full set of blanks and diagnostic tools for Ford, Vauxhall, BMW, Mercedes, VW, Audi, Toyota and more. Keys are cut, coded and tested on the spot — no tow truck, no dealer wait.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Auto locksmith replacing car key in Crouch End, Haringey',
  },

  'haringey/emergency-locksmith': {
    heading: 'Emergency Locksmith Across Haringey — 24/7',
    paragraphs: [
      'Living in Haringey means a mix of Victorian conversions in Crouch End, purpose-built flats in Hornsey and Wood Green, and terraced houses across Tottenham and Stroud Green. Each property type has its own lock quirks — and we know them all. Multipoint UPVC locks that jam in winter, Yale nightlatches on original front doors, and communal entrance locks that wear out from overuse.',
      'Being based in Crouch End gives us the fastest possible response across the borough. Late-night lockouts in Finsbury Park, early-morning break-in repairs in Muswell Hill, or a snapped key in an Archway front door — we\'ve attended them all hundreds of times. Typical arrival across Haringey is 20–30 minutes, often faster.',
      'After a break-in, we don\'t just get you back inside — we leave your property fully secured the same night. We carry British Standard anti-snap cylinders, deadlocks and rim locks on the van, so there\'s no waiting for parts. Every job is quoted upfront with no call-out fee.',
    ],
    image: '/images/locksmith-near-me-bullard-locks.webp',
    imageAlt: 'Emergency locksmith responding to lockout in Haringey',
  },

  'haringey/safe-engineer': {
    heading: 'Safe Engineer in Haringey — Home & Business',
    paragraphs: [
      'Haringey has a thriving mix of independent businesses along Crouch End Broadway, restaurants and cafés on Tottenham Lane, and retail units in Wood Green Shopping City — many of which rely on safes for daily cash handling. We provide professional safe opening, installation and servicing for businesses across the borough.',
      'For homeowners in Muswell Hill, Crouch End and Hornsey, we regularly open forgotten-combination safes that have sat untouched for years — often inherited or found during renovations of the area\'s many Victorian and Edwardian properties. Non-destructive opening is always attempted first, preserving the safe for continued use.',
      'As our home borough, Haringey safe engineer appointments are particularly easy to arrange. William can often fit in same-week visits for residential work and next-day for urgent commercial needs. We cover Chubb, Fichet, Burton, Dudley and all other major brands.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Safe engineer William Bullard with specialist tools in Haringey',
  },

  // ========================================
  // BARNET
  // ========================================

  'barnet/auto-locksmith': {
    heading: 'Auto Locksmith Across the London Borough of Barnet',
    paragraphs: [
      'Barnet stretches from East Finchley in the south to High Barnet at the top of the Northern Line — and we cover all of it. The borough\'s suburban character means most residents rely on their cars daily, and driveways, school car parks and supermarket bays around places like The Spires in New Barnet are where we attend the most call-outs.',
      'We see a lot of keyless-entry and push-to-start faults in Barnet — the area has a higher proportion of newer vehicles and premium marques than much of North London. Whether it\'s a Range Rover in Totteridge, a Mercedes on Ballards Lane in Finchley, or a Ford at Mill Hill Broadway station, we carry the diagnostic kit to handle it all.',
      'Typical response time across Barnet is 25–40 minutes from our Crouch End base. We reach East Finchley and Finchley Central in under 25 minutes via the A1000, while High Barnet and Whetstone are around 30–35 minutes via the A1000 or A109.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Mobile auto locksmith attending vehicle in Barnet',
  },

  'barnet/emergency-locksmith': {
    heading: 'Emergency Locksmith in Barnet — Day or Night',
    paragraphs: [
      'Barnet\'s residential streets — from the 1930s semis of Friern Barnet to the larger detached properties around Totteridge — make it one of North London\'s most targeted boroughs for break-ins. We attend emergency call-outs across Barnet every week, boarding up damaged doors and fitting high-security replacement locks on the same visit.',
      'The borough also has a large number of converted flats, particularly in Finchley and New Barnet, where communal door locks see heavy use and frequently fail at the worst time. We carry mortice locks, Euro cylinders, rim locks and UPVC multipoint mechanisms so we can fix or replace whatever\'s failed without a return visit.',
      'Our typical response across Barnet is 25–40 minutes. East Finchley and Finchley Central are closest (often under 25 minutes), while High Barnet, Edgware and Mill Hill take a little longer. No call-out fee, no hidden charges, and a fixed quote before we start any work.',
    ],
    image: '/images/locksmith-near-me-bullard-locks.webp',
    imageAlt: 'Emergency locksmith securing property in Barnet after break-in',
  },

  'barnet/safe-engineer': {
    heading: 'Safe Engineer Serving Barnet Homes & Businesses',
    paragraphs: [
      'Barnet\'s larger residential properties — particularly in Totteridge, Hadley Wood and Mill Hill — often contain safes for jewellery, documents and valuables. We regularly attend homes in these areas for non-destructive safe opening when combinations have been forgotten or mechanisms have seized through lack of use.',
      'On the commercial side, Barnet has a busy high-street retail scene around Chipping Barnet, New Barnet and Finchley Central, plus industrial units along the A1. We install, open and service safes for shops, restaurants, dental practices and other businesses that need secure cash handling.',
      'All safe work in Barnet is by appointment. William visits to assess the safe, provides a written quote, and completes the work on-site in most cases. We work on all major brands including Chubb, Burton, Fichet and Phoenix, and can supply and fit new safes where needed.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Professional safe engineer attending home in Barnet',
  },

  // ========================================
  // CAMDEN
  // ========================================

  'camden/auto-locksmith': {
    heading: 'Auto Locksmith in Camden — NW1 to NW6',
    paragraphs: [
      'Camden is one of the most difficult places in London to park, which makes a car lockout here particularly stressful. Whether you\'re stuck on a meter in Kentish Town, double-parked near Camden Market, or blocked in at a residents\' bay in Belsize Park, we understand the urgency — especially when the parking wardens are circling.',
      'The mix of vehicles in Camden ranges from delivery vans on the high street to high-end cars in Primrose Hill and Hampstead. We carry equipment for everything from a Ford Transit lockout to programming a new key for a BMW or Porsche. All work is done at the roadside with no need for towing.',
      'We reach most of Camden in 25–35 minutes from our Crouch End base, with Kentish Town and Gospel Oak often under 20 minutes via the Archway Road. NW1, NW3, NW5, NW6 and WC1 are all within our core coverage area.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Auto locksmith working on vehicle in Camden Town',
  },

  'camden/emergency-locksmith': {
    heading: 'Emergency Locksmith in Camden — Fast Response',
    paragraphs: [
      'Camden\'s housing stock is incredibly varied — Georgian townhouses in Bloomsbury, mansion flats in Swiss Cottage, Victorian terraces in Kentish Town, and council-built estates across Gospel Oak and Somers Town. We\'ve worked on every type of lock found in the borough, from 200-year-old rim locks to modern multipoint systems on new-build apartments.',
      'The area\'s nightlife and high footfall around Camden Town and Chalk Farm mean we attend a lot of late-night lockouts — keys left in bars, locks jammed after coming home in a rush, or locks deliberately changed by flatmates during disputes. Whatever the situation, we respond without judgement, day or night.',
      'Hampstead and Belsize Park residents often call for lock upgrades after burglary scares. We fit insurance-approved British Standard locks that meet the requirements of most household policies, and can advise on overall door security while we\'re there. Typical arrival in Camden is 25–35 minutes.',
    ],
    image: '/images/locksmith-near-me-bullard-locks.webp',
    imageAlt: 'Locksmith attending emergency call in Camden',
  },

  'camden/safe-engineer': {
    heading: 'Safe Engineer in Camden — Specialist Service',
    paragraphs: [
      'Camden\'s mix of affluent residential streets in Hampstead and Primrose Hill, busy commercial premises around Camden High Street, and professional offices in Bloomsbury and Holborn creates consistent demand for specialist safe services. We attend homes with floor-standing safes concealed in original features, and businesses with drop safes behind shop counters.',
      'The borough\'s many period properties often contain old safes that were built into the house — sometimes bricked in or hidden behind panelling. We have extensive experience opening and servicing these older units, including Milner, Chubb and Ratner safes dating back decades.',
      'For businesses around Camden Market and Kentish Town Road, we provide rapid-response safe opening when daily floats are locked away and the combination has been forgotten or the lock has failed. We also supply and install new safes rated to cash and valuables standards for retail, hospitality and office use.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Safe engineer attending property in Camden',
  },

  // ========================================
  // ISLINGTON
  // ========================================

  'islington/auto-locksmith': {
    heading: 'Auto Locksmith in Islington — Angel to Archway',
    paragraphs: [
      'Islington has some of the tightest parking in North London — CPZ zones cover almost the entire borough, and free parking barely exists south of Holloway Road. When you\'re locked out of your car on Upper Street, stuck in the Emirates Stadium car park, or have lost a key somewhere between Angel and Highbury, you need someone fast.',
      'We attend a lot of call-outs around the Angel and Clerkenwell area, where office workers leave keys on desks and return to find their cars locked. The residential streets of Barnsbury and Canonbury also generate regular work — often transponder key failures on modern vehicles parked on narrow Victorian streets where a tow truck can\'t easily access.',
      'Islington is one of our fastest-response boroughs at 20–30 minutes, thanks to the direct route from Crouch End via Hornsey Rise and Holloway Road. We cover all postcodes: N1, N7, N19 and EC1.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Auto locksmith replacing car keys near Angel, Islington',
  },

  'islington/emergency-locksmith': {
    heading: 'Emergency Locksmith in Islington — 24/7 Rapid Response',
    paragraphs: [
      'Islington has one of the highest concentrations of converted flats in London. Victorian and Georgian houses split into multiple dwellings means shared front doors, individual flat locks, and the age-old problem of one tenant\'s lost key leaving everyone buzzing at the intercom at 2am. We deal with these situations constantly — gaining entry without damage, replacing locks, and cutting new keys on the spot.',
      'The Holloway Road corridor and the streets around Finsbury Park station see a higher rate of burglaries than the borough average. After a break-in, we secure the property immediately — fitting new British Standard anti-snap cylinders, repairing damaged door frames, and boarding up if needed. We carry all parts on the van so there\'s no second visit required.',
      'Whether it\'s a lockout at a Clerkenwell townhouse, a snapped key in an Archway flat, or a jammed lock on a shop front in Chapel Market, we\'re typically on scene within 20–30 minutes. Available 24/7, 365 days a year, with no call-out fee.',
    ],
    image: '/images/locksmith-near-me-bullard-locks.webp',
    imageAlt: 'Emergency locksmith attending flat lockout in Islington',
  },

  'islington/safe-engineer': {
    heading: 'Safe Engineer in Islington — Residential & Commercial',
    paragraphs: [
      'Islington\'s thriving hospitality and retail scene — Upper Street, Exmouth Market, Camden Passage — means plenty of businesses rely on safes for daily takings. We provide regular safe servicing, combination changes and emergency opening when a safe won\'t open on a Monday morning and the weekend\'s float is inside.',
      'The borough\'s Georgian and Victorian residential properties in Barnsbury, Canonbury and Highbury often contain original built-in safes or more recent fire safes installed for documents and valuables. We open, service and install safes for homeowners across all of Islington, always attempting non-destructive methods first.',
      'With our Crouch End base just a short drive away via Hornsey Rise, we can often arrange next-day appointments for Islington residents and same-week for businesses. All work is quoted in writing before we start, with no hidden charges.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Safe engineer servicing commercial safe in Islington',
  },

  // ========================================
  // HACKNEY
  // ========================================

  'hackney/auto-locksmith': {
    heading: 'Auto Locksmith Covering All of Hackney',
    paragraphs: [
      'Hackney\'s streets are busy and parking is competitive — the combination of CPZ zones, narrow Victorian streets and high car density means a lockout can quickly become a major headache. Whether you\'re stuck at Broadway Market, parked up near Victoria Park, or locked out in a loading bay on Kingsland Road, we get to you fast.',
      'The borough has seen a significant increase in keyless car theft over recent years, particularly around Dalston, London Fields and Stoke Newington. We provide emergency key replacement when keys are stolen, as well as preventative key reprogramming to block stolen fobs from accessing your vehicle.',
      'Typical response time across Hackney is 25–40 minutes from Crouch End. Stoke Newington and Dalston are often under 25 minutes via the back roads through Finsbury Park. We cover all E8, E9, E5, N16 and N1 postcodes in the borough.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Mobile auto locksmith attending car in Hackney',
  },

  'hackney/emergency-locksmith': {
    heading: 'Emergency Locksmith in Hackney — Always Available',
    paragraphs: [
      'Hackney has been one of London\'s fastest-gentrifying boroughs, but that also brings security challenges. The mix of newly converted warehouse flats in Shoreditch, Victorian terraces in Clapton, and older council estates in Homerton means we see every type of lock problem — from smart locks that lose power to 50-year-old mortice locks that finally give out.',
      'We attend a lot of post-burglary call-outs in Hackney, particularly along the E8 and E5 corridors. Our approach is always the same: secure the property first, then advise on what upgrades will prevent a repeat. We carry anti-snap Euro cylinders rated to TS007 3-star standard, London bars, and BS3621 mortice deadlocks.',
      'Stoke Newington residents often call after being locked out of their Victorian-conversion flats — original front doors with nightlatches that slam shut in the wind. We open these without damage in minutes. Typical response across Hackney: 25–40 minutes, available around the clock.',
    ],
    image: '/images/locksmith-near-me-bullard-locks.webp',
    imageAlt: 'Emergency locksmith attending break-in repair in Hackney',
  },

  'hackney/safe-engineer': {
    heading: 'Safe Engineer in Hackney — Expert Service',
    paragraphs: [
      'Hackney\'s booming food, retail and creative industries mean more businesses than ever need reliable safe solutions. From restaurants on Kingsland Road to boutiques in Shoreditch and market traders on Broadway Market, we install and service commercial safes sized to each business\'s cash-handling needs.',
      'The borough\'s residential safe work often involves opening older units found during property renovations — Hackney\'s Victorian and Edwardian housing stock regularly yields forgotten safes during building work. We\'ve opened safes hidden under floorboards, bricked into chimney breasts, and concealed behind false walls.',
      'We also work with Hackney landlords and property managers who need safes installed in HMO properties for key management, or combination changes between tenancies. All work is by appointment, with a written quote provided before we begin.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Safe engineer opening safe in Hackney property',
  },

  // ========================================
  // ENFIELD
  // ========================================

  'enfield/auto-locksmith': {
    heading: 'Auto Locksmith Serving Enfield Borough',
    paragraphs: [
      'Enfield is North London\'s largest borough, stretching from Southgate in the south to the M25 corridor in the north. Residents here are heavily car-dependent, with large retail parks at Enfield Retail Park and Ravenside, and commuter parking around stations like Southgate, Palmers Green and Enfield Town generating regular lockout calls.',
      'The borough\'s suburban streets in Winchmore Hill, Bush Hill Park and Chase Side have a high proportion of family cars — and it\'s the school run that catches people out most often. Keys left in the boot, spare keys locked inside the house, or a key fob battery dying in the Tesco car park at Ponders End. We handle all of these on the spot.',
      'Enfield is our furthest North London borough, with typical arrival times of 30–45 minutes depending on where you are. Southgate and Palmers Green are closest (around 30 mins), while Enfield Town and Edmonton take a little longer. We cover all EN1, EN2, EN3, N9, N13, N14, N18 and N21 postcodes.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Auto locksmith attending vehicle in Enfield',
  },

  'enfield/emergency-locksmith': {
    heading: 'Emergency Locksmith in Enfield — 24/7 Cover',
    paragraphs: [
      'Enfield\'s housing is predominantly suburban — 1930s semis and terraces in Edmonton and Palmers Green, larger detached properties around Winchmore Hill, and newer developments in Meridian Water. The most common emergency calls we attend are lockouts on UPVC doors with multipoint locking — a mechanism that seizes more often than most people expect, especially in cold weather.',
      'Edmonton and the areas around Fore Street have a higher burglary rate than the borough average. We attend post-break-in security work regularly here, fitting insurance-grade locks and repairing damaged doors on the same visit. For the more affluent streets in Winchmore Hill and Hadley Wood, we often advise on upgrading existing locks to anti-snap, anti-bump specifications.',
      'Despite being the most northerly borough in our coverage, we still maintain a 30–45 minute typical response across Enfield. Southgate is reachable in around 30 minutes via the A109, while Enfield Town and Ponders End take closer to 40–45 minutes. Available 24/7 with no call-out fee.',
    ],
    image: '/images/locksmith-near-me-bullard-locks.webp',
    imageAlt: 'Emergency locksmith securing property in Enfield',
  },

  'enfield/safe-engineer': {
    heading: 'Safe Engineer Covering Enfield & Surroundings',
    paragraphs: [
      'Enfield\'s larger residential properties — particularly the detached houses around Hadley Wood, Winchmore Hill and Chase Side — frequently contain home safes for valuables, documents and cash. We attend appointments across the borough for non-destructive opening when combinations are forgotten, batteries die on electronic locks, or mechanical dials seize.',
      'The borough also has a significant light-industrial and commercial sector, with business parks along the A10 corridor and retail units around Enfield Town. We install, open and service safes for businesses from corner shops to large warehouse operations, matching the safe specification to the insurance requirements.',
      'Enfield safe appointments are typically arranged within the week for residential work and next-day for urgent commercial needs. William travels to your location with all specialist tools — there\'s no need to bring the safe anywhere. We work on Chubb, Burton, Fichet, Phoenix, SMP and all other major brands.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Safe engineer attending appointment in Enfield',
  },

  // ========================================
  // WESTMINSTER
  // ========================================

  'westminster/auto-locksmith': {
    heading: 'Auto Locksmith in Westminster — Central London Coverage',
    paragraphs: [
      'A car lockout in Westminster means dealing with some of the most expensive parking in the world — meters in Mayfair, residents\' bays in Marylebone, and restricted zones around Victoria and Whitehall where an unattended vehicle attracts instant attention. When you call us, speed matters more here than almost anywhere else in London.',
      'Westminster has a high concentration of premium and luxury vehicles — the streets around Park Lane, St James\'s and Belgravia are lined with Range Rovers, Bentleys and Porsches. We carry the advanced diagnostic equipment needed for these marques, including dealer-level key programming for most European prestige brands.',
      'We reach most of Westminster in 30–45 minutes from our North London base, with Marylebone and Paddington often closer to 30 minutes via the Westway or Finchley Road. We cover all W1, W2, SW1, WC2 and the Westminster portion of NW1.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Auto locksmith programming car key in Westminster',
  },

  'westminster/safe-engineer': {
    heading: 'Safe Engineer in Westminster — Prestige Service',
    paragraphs: [
      'Westminster\'s residential properties in Mayfair, St James\'s, Belgravia and Marylebone frequently contain high-value safes protecting jewellery, watches, important documents and cash. We provide a discreet, professional safe opening and servicing service for private clients, with appointments arranged at times that suit your schedule.',
      'The borough\'s dense concentration of hotels, private members\' clubs, restaurants and luxury retail also generates significant commercial safe work. We attend Park Lane hotels, Bond Street jewellers and West End restaurants for everything from emergency opening when a safe won\'t release, to scheduled combination changes and annual servicing.',
      'For Westminster clients, we understand that discretion and professionalism are paramount. William arrives in an unmarked vehicle, carries photo ID, and all work is conducted confidentially. We service all major safe brands and can advise on new installations rated to Eurograde standards for high-value contents.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Safe engineer providing specialist service in Westminster',
  },

  // ========================================
  // CITY OF LONDON
  // ========================================

  'city-of-london/auto-locksmith': {
    heading: 'Auto Locksmith in the City of London',
    paragraphs: [
      'The Square Mile presents unique challenges for a car lockout — access restrictions, security checkpoints, and some of the highest parking charges in the UK. If your vehicle is stuck in a City car park, a loading bay on Cheapside, or a meter near Liverpool Street, the clock is ticking on charges and potential tickets.',
      'The City\'s weekday population of over 500,000 means a lot of commuter vehicles — many parked in NCP and private car parks around Barbican, Moorgate and Aldgate. We regularly attend these sites for lockouts, lost keys and broken fobs. We can also meet you at your office if you\'ve left keys at home and need a spare cut from the lock.',
      'We reach the City in 30–45 minutes via the A1 and City Road, covering all EC1, EC2, EC3 and EC4 postcodes. Weekend call-outs in the City are often faster due to lighter traffic. All work is quoted upfront with no call-out fee.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Auto locksmith attending vehicle in the City of London',
  },

  'city-of-london/safe-engineer': {
    heading: 'Safe Engineer in the City of London',
    paragraphs: [
      'The City of London\'s financial institutions, law firms, accountancy practices and trading floors rely on safes for everything from client documents and encryption keys to physical media and emergency cash. We provide professional safe opening, servicing and installation for City businesses, working around office hours to minimise disruption.',
      'The Barbican residential estate — one of the largest in Europe — is also a regular source of domestic safe work. The complex\'s 1960s and 70s construction means many flats contain original built-in safes, and residents contact us when combinations are lost or locks seize. We specialise in opening these older units without damage.',
      'For City clients, we offer flexible appointment scheduling including early morning and evening visits to work around business operations. All safe engineers carry photo ID and are DBS checked — essential for access to the secure premises common in EC1–EC4.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Safe engineer attending City of London commercial premises',
  },

  // ========================================
  // KENSINGTON & CHELSEA
  // ========================================

  'kensington-chelsea/auto-locksmith': {
    heading: 'Auto Locksmith in Kensington & Chelsea',
    paragraphs: [
      'Kensington and Chelsea has one of the highest concentrations of prestige vehicles in the UK. The streets around Sloane Square, Holland Park and Notting Hill are home to supercars, luxury SUVs and classic vehicles that require specialist auto locksmith knowledge. We carry advanced diagnostic tools for Porsche, Ferrari, Bentley, Rolls-Royce and all other premium marques.',
      'The Royal Borough\'s strict parking enforcement makes any vehicle lockout an urgent situation. Whether you\'re on a meter in South Kensington, in a residents\' bay on a Chelsea side street, or stuck in the Kensington High Street one-way system, we prioritise reaching you before the penalty notice arrives.',
      'We reach Kensington and Chelsea in 35–50 minutes from North London, with Notting Hill and Holland Park often closer to 35 minutes via the Westway. We cover W8, W11, SW3, SW5, SW7 and SW10 postcodes across the borough.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Auto locksmith working on premium vehicle in Kensington',
  },

  'kensington-chelsea/safe-engineer': {
    heading: 'Safe Engineer in Kensington & Chelsea',
    paragraphs: [
      'The Royal Borough\'s residential properties often contain high-specification safes protecting significant valuables — fine jewellery, watches, art, and important documents. We provide a discreet, expert safe opening and servicing operation for private homes in Chelsea, Kensington, Notting Hill and Holland Park, always working to preserve the safe for continued use.',
      'Many properties in the borough feature concealed safes built into wardrobes, dressing rooms or home offices — sometimes behind custom panelling or within bespoke furniture. We have extensive experience accessing and servicing these installations without disturbing the surrounding décor, working carefully in high-end interiors.',
      'We also serve the borough\'s luxury retail premises — jewellers, art galleries and boutiques on King\'s Road, Brompton Road and Portobello Road — providing installation, emergency opening and scheduled maintenance for commercial safes rated to Eurograde standards.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Safe engineer attending private residence in Kensington',
  },

  // ========================================
  // HAMMERSMITH & FULHAM
  // ========================================

  'hammersmith-fulham/auto-locksmith': {
    heading: 'Auto Locksmith in Hammersmith & Fulham',
    paragraphs: [
      'Hammersmith and Fulham sits on key West London routes — the A4, Hammersmith flyover, and the approaches to the Westway — meaning vehicle breakdowns and lockouts here can cause real problems fast. Whether you\'re stuck in the Westfield London car park in Shepherd\'s Bush, locked out near Stamford Bridge on a match day, or parked up in Parsons Green, we get to you as quickly as traffic allows.',
      'The borough has a broad vehicle mix: work vans serving the Hammersmith office district, family cars in Fulham\'s residential streets, and everything from student run-arounds to premium SUVs around Ravenscourt Park and Brackenbury Village. We carry blanks and programming equipment for all mainstream and prestige makes.',
      'Hammersmith and Fulham is our furthest regular coverage area at 40–55 minutes, though Shepherd\'s Bush is often reachable in 35–40 minutes via the Westway. We cover all W6, W12, W14 and SW6 postcodes.',
    ],
    image: '/images/auto_locksmith_crouch-end.webp',
    imageAlt: 'Auto locksmith attending vehicle in Hammersmith',
  },

  'hammersmith-fulham/safe-engineer': {
    heading: 'Safe Engineer in Hammersmith & Fulham',
    paragraphs: [
      'Fulham\'s Victorian and Edwardian terraced houses — particularly the sought-after streets south of Lillie Road and around Parsons Green — often contain safes for household valuables. We attend homes across the borough for non-destructive opening, combination changes and new installations, always working carefully around family life.',
      'The Hammersmith office district and the retail centres around Westfield and King Street generate regular commercial safe work. We install deposit safes for hospitality businesses, service existing units for retail chains, and provide emergency opening when electronic locks fail or staff changes leave combinations unknown.',
      'Despite being in West London, we maintain reliable appointment scheduling for Hammersmith and Fulham clients. William carries all specialist tools in the van — no need for multiple visits. We work on all brands and can recommend and install new safes where an upgrade or replacement is more cost-effective than repair.',
    ],
    image: '/images/william-bullard-locks.webp',
    imageAlt: 'Safe engineer providing service in Hammersmith & Fulham',
  },
};

export function getAreaContent(boroughSlug: string, serviceSlug: ServiceSlug): AreaContentBlock {
  const key = `${boroughSlug}/${serviceSlug}` as ContentKey;
  return areaContent[key] ?? {
    heading: `${serviceSlug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')} Service`,
    paragraphs: ['Contact us to discuss your requirements.'],
    image: '/images/william-bullard-trusted-london-locksmith.webp',
    imageAlt: 'Bullard Locks professional locksmith service',
  };
}
