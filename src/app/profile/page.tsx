"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const avatarImage = PlaceHolderImages.find((img) => img.id === "user-avatar");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
       <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="items-center text-center">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-52" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24">
              {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={user?.name ?? ''} data-ai-hint={avatarImage.imageHint} />}
              <AvatarFallback className="text-3xl">
                {user?.name?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="font-headline text-2xl pt-4">{user?.name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Future profile content can go here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
