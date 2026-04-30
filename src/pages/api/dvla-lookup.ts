import type { APIRoute } from 'astro';
import { checkRateLimit, checkOrigin } from '../../utils/api-security';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Security: rate limit and origin check
  const rateLimited = checkRateLimit(request, { maxRequests: 10, windowMs: 60_000, prefix: 'dvla' });
  if (rateLimited) return rateLimited;
  const originBlocked = checkOrigin(request);
  if (originBlocked) return originBlocked;

  try {
    const body = await request.json();
    const { registration } = body;

    if (!registration) {
      return new Response(
        JSON.stringify({ error: 'Registration number required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Clean up registration number
    const cleanReg = registration.replace(/\s/g, '').toUpperCase();

    const DVLA_API_KEY = import.meta.env.DVLA_API_KEY;

    if (!DVLA_API_KEY) {
      // Return fallback "Unknown" data so the chat UI keeps working without
      // the DVLA integration. We warn loudly in the logs because in production
      // a missing key means we silently lose the auto-locksmith UX.
      console.warn('DVLA_API_KEY not configured - returning fallback vehicle data. Set DVLA_API_KEY in env to enable lookups.');
      return new Response(
        JSON.stringify({
          success: true,
          vehicle: {
            registrationNumber: cleanReg,
            make: 'Unknown',
            colour: 'Unknown',
            yearOfManufacture: 'Unknown',
            fuelType: 'Unknown',
            message: 'DVLA lookup not configured - please confirm your vehicle details'
          }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call DVLA Vehicle Enquiry API
    const response = await fetch('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles', {
      method: 'POST',
      headers: {
        'x-api-key': DVLA_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ registrationNumber: cleanReg }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('DVLA API error:', errorData);

      if (response.status === 404) {
        return new Response(
          JSON.stringify({ error: 'Vehicle not found. Please check the registration number.' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Unable to lookup vehicle. Please enter details manually.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const vehicleData = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        vehicle: {
          registrationNumber: vehicleData.registrationNumber,
          make: vehicleData.make,
          colour: vehicleData.colour,
          yearOfManufacture: vehicleData.yearOfManufacture,
          fuelType: vehicleData.fuelType,
          engineCapacity: vehicleData.engineCapacity,
          taxStatus: vehicleData.taxStatus,
          motStatus: vehicleData.motStatus
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const aborted = error instanceof DOMException && error.name === 'TimeoutError';
    console.error(aborted ? 'DVLA timeout' : 'DVLA lookup error:', aborted ? '' : error);
    return new Response(
      JSON.stringify({ error: aborted ? 'Vehicle lookup timed out. Please enter details manually.' : 'An error occurred during vehicle lookup' }),
      { status: aborted ? 504 : 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
