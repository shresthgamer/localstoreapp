export type PlanId = "trial" | "basic" | "growth" | "pro";

export type HoursDay = {
  open: string;
  close: string;
  closed: boolean;
};

export type Business = {
  name: string;
  category: string;
  about: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  hours: Record<string, HoursDay>;
  instagram: string;
  googleReview: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  ownerName: string;
  ownerPhone: string;
  plan: PlanId;
  trialEndsAt: string;
  autoApprove: boolean;
  allowMultipleScans: boolean;
  menuLive: boolean;
  menuTheme: "classic" | "dark" | "warm";
};

export type StampProgram = {
  id: string;
  active: boolean;
  visitsRequired: number;
  expiryDays: number;
  description: string;
  image: string;
};

export type ScratchPrize = {
  id: string;
  title: string;
  winnersOutOf: number;
  expiryDays: number;
  image: string;
  active: boolean;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  veg: boolean;
  image: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  image: string;
  items: MenuItem[];
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  stamps: number;
  lastVisit: string;
  createdAt: string;
  notes: string;
};

export type ScanRecord = {
  id: string;
  customerId: string;
  at: string;
  type: "stamp" | "scratch";
  won?: boolean;
  prizeTitle?: string;
};

export type Winner = {
  id: string;
  customerId: string;
  type: "stamp" | "scratch";
  title: string;
  claimed: boolean;
  createdAt: string;
  claimedAt?: string;
};
