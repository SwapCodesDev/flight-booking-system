"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Plane } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MainNav } from './main-nav';
import { UserNav } from './user-nav';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Header() {
  const { isAuthenticated, loading } = useAuth();
  const logo = PlaceHolderImages.find(img => img.id === 'altitude-ace-logo');

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          {logo ? (
             <Image 
                src={logo.imageUrl}
                alt={logo.description}
                width={40}
                height={40}
                data-ai-hint={logo.imageHint}
                className="rounded-md"
             />
          ) : (
            <Plane className="h-6 w-6" />
          )}
          <span className="font-headline text-xl font-bold">Altitude Ace</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <MainNav className="hidden md:flex" />
          <nav className="flex items-center space-x-2">
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : isAuthenticated ? (
              <UserNav />
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
