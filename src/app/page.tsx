import Image from 'next/image';
import FlightSearchForm from '@/components/flights/flight-search-form';
import Recommendations from '@/components/flights/recommendations';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <div className="flex flex-col">
      <section className="relative flex h-[500px] w-full items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center space-y-6 px-4">
          <h1 className="font-headline text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Find Your Next Adventure
          </h1>
          <p className="max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
            Book flights with ease and confidence. Altitude Ace helps you find the best deals.
          </p>
        </div>
        <div className="absolute -bottom-24 w-full max-w-6xl px-4 md:-bottom-16">
           <FlightSearchForm />
        </div>
      </section>

      <div className="mt-32 md:mt-24">
        <Recommendations />
      </div>
    </div>
  );
}
