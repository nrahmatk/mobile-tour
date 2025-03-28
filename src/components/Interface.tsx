export interface BestDestinatio {
  imageSrc: string;
  title: string;
  location: string;
  rating: number;
  ratingCount: number;
}

export interface Place {
  id: string;
  slug: string;
  imageSrc: string;
  title: string;
  location: string;
  description: string;
  rating?: string | number;
  ratingCount?: string | number;
  price: number;
}

export interface NavButtonProps {
  href: string;
  iconSrc: string;
  label: string;
}

export interface User {
  name: string;
  avatar: string;
}
