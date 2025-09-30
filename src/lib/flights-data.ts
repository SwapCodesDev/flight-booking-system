import type { Flight } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const airlineLogo1 = PlaceHolderImages.find(img => img.id === 'airline-logo-1')?.imageUrl ?? '';
const airlineLogo2 = PlaceHolderImages.find(img => img.id === 'airline-logo-2')?.imageUrl ?? '';
const airlineLogo3 = PlaceHolderImages.find(img => img.id === 'airline-logo-3')?.imageUrl ?? '';

export const mockFlights: Flight[] = [
  {
    id: 'fl-001',
    airline: 'AeroFly',
    airlineLogoUrl: airlineLogo1,
    flightNumber: 'AF2024',
    origin: {
      code: 'JFK',
      city: 'New York',
      time: '08:00 AM',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
      time: '11:30 AM',
    },
    duration: '5h 30m',
    price: 350.00,
    class: 'Economy',
  },
  {
    id: 'fl-002',
    airline: 'SkyJet',
    airlineLogoUrl: airlineLogo2,
    flightNumber: 'SJ1998',
    origin: {
      code: 'JFK',
      city: 'New York',
      time: '10:00 AM',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
      time: '01:45 PM',
    },
    duration: '5h 45m',
    price: 420.00,
    class: 'Economy',
  },
  {
    id: 'fl-003',
    airline: 'CloudHopper',
    airlineLogoUrl: airlineLogo3,
    flightNumber: 'CH2001',
    origin: {
      code: 'JFK',
      city: 'New York',
      time: '01:00 PM',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
      time: '04:20 PM',
    },
    duration: '5h 20m',
    price: 380.00,
    class: 'Economy',
  },
  {
    id: 'fl-004',
    airline: 'AeroFly',
    airlineLogoUrl: airlineLogo1,
    flightNumber: 'AF2025',
    origin: {
      code: 'JFK',
      city: 'New York',
      time: '08:00 AM',
    },
    destination: {
      code: 'LAX',
      city: 'Los Angeles',
      time: '11:30 AM',
    },
    duration: '5h 30m',
    price: 950.00,
    class: 'Business',
  },
  {
    id: 'fl-005',
    airline: 'SkyJet',
    airlineLogoUrl: airlineLogo2,
    flightNumber: 'SJ1999',
    origin: {
      code: 'SFO',
      city: 'San Francisco',
      time: '09:00 AM',
    },
    destination: {
      code: 'ORD',
      city: 'Chicago',
      time: '03:00 PM',
    },
    duration: '4h 00m',
    price: 280.00,
    class: 'Economy',
  },
  {
    id: 'fl-006',
    airline: 'CloudHopper',
    airlineLogoUrl: airlineLogo3,
    flightNumber: 'CH2002',
    origin: {
      code: 'SFO',
      city: 'San Francisco',
      time: '09:00 AM',
    },
    destination: {
      code: 'ORD',
      city: 'Chicago',
      time: '03:00 PM',
    },
    duration: '4h 00m',
    price: 800.00,
    class: 'Business',
  },
];
