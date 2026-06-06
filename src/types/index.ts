export interface HeroSlide {
  image: string;
  alt: string;
}

export interface Program {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  programId: string;
}

export interface AnnualReport {
  year: string;
  donationReport?: string;
  expenditureReport?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  x?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}
