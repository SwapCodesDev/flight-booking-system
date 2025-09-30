export type Flight = {
  id: string;
  airline: string;
  airlineLogoUrl: string;
  flightNumber: string;
  origin: {
    code: string;
    city: string;
    time: string;
  };
  destination: {
    code: string;
    city: string;
    time: string;
  };
  duration: string;
  price: number;
  class: 'Economy' | 'Business' | 'First';
};
