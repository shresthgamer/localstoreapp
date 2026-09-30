import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Business,
  Customer,
  MenuCategory,
  ScanRecord,
  ScratchPrize,
  StampProgram,
  Winner,
  PlanId,
} from "./types";
import { daysAgoIso, todayIso, uid } from "./utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const defaultHours = Object.fromEntries(
  DAYS.map((d) => [d, { open: "10:00", close: "22:00", closed: d === "Tue" ? false : false }]),
);

const trialEnd = "2026-09-25T18:00:00.000Z";

function seedCustomers(): Customer[] {
  const names: [string, string, number, number][] = [
    ["Priya Sharma", "9876543210", 6, 2],
    ["Rahul Verma", "9988776655", 8, 1],
    ["Ananya Iyer", "9123456780", 3, 4],
    ["Vikram Singh", "9001122334", 7, 0],
    ["Meera Patel", "9811122233", 8, 5],
    ["Arjun Nair", "9765432109", 1, 6],
    ["Sneha Kapoor", "9898989898", 4, 3],
    ["Kabir Joshi", "9090909090", 2, 2],
    ["Diya Reddy", "9345678901", 5, 1],
    ["Farhan Ali", "9678901234", 0, 0],
  ];
  return names.map(([name, phone, stamps, ago], i) => ({
    id: `cus_${i + 1}`,
    name,
    phone,
    stamps,
    lastVisit: daysAgoIso(ago),
    createdAt: daysAgoIso(ago + 8),
    notes: "",
  }));
}

function seedScans(customers: Customer[]): ScanRecord[] {
  const scans: ScanRecord[] = [];
  customers.forEach((c, ci) => {
    const count = Math.max(1, c.stamps);
    for (let i = 0; i < count; i++) {
      const ago = (ci + i) % 7;
      scans.push({
        id: `scan_${c.id}_${i}`,
        customerId: c.id,
        at: daysAgoIso(ago) + "T" + String(10 + (i % 8)).padStart(2, "0") + ":15:00.000Z",
        type: "stamp",
      });
    }
  });
  scans.push({
    id: "scan_win_1",
    customerId: "cus_7",
    at: daysAgoIso(1) + "T16:40:00.000Z",
    type: "scratch",
    won: true,
    prizeTitle: "20% Cash back on Second Visit",
  });
  scans.push({
    id: "scan_scratch_miss",
    customerId: "cus_3",
    at: daysAgoIso(2) + "T12:10:00.000Z",
    type: "scratch",
    won: false,
  });
  return scans;
}

function seedWinners(): Winner[] {
  return [
    {
      id: "win_1",
      customerId: "cus_2",
      type: "stamp",
      title: "Get 5% discount on your total bill after 8 visits",
      claimed: false,
      createdAt: daysAgoIso(1),
    },
    {
      id: "win_2",
      customerId: "cus_5",
      type: "stamp",
      title: "Get 5% discount on your total bill after 8 visits",
      claimed: true,
      createdAt: daysAgoIso(5),
      claimedAt: daysAgoIso(4),
    },
    {
      id: "win_3",
      customerId: "cus_7",
      type: "scratch",
      title: "20% Cash back on Second Visit",
      claimed: false,
      createdAt: daysAgoIso(1),
    },
  ];
}

function seedMenu(): MenuCategory[] {
  return [
    {
      id: "cat_starters",
      name: "Starters",
      image: "/images/cat-food.png",
      items: [
        {
          id: "it_1",
          name: "Paneer Tikka",
          description: "Charred cottage cheese with mint chutney",
          price: 249,
          inStock: true,
          veg: true,
          image: "/images/item-food.png",
        },
        {
          id: "it_2",
          name: "Chilli Chicken",
          description: "Crispy tossed chicken, peppers, garlic",
          price: 279,
          inStock: true,
          veg: false,
          image: "/images/item-food.png",
        },
      ],
    },
    {
      id: "cat_mains",
      name: "Mains",
      image: "/images/cat-food.png",
      items: [
        {
          id: "it_3",
          name: "Butter Chicken",
          description: "Slow tomato gravy, cream, kasuri methi",
          price: 349,
          inStock: true,
          veg: false,
          image: "/images/item-food.png",
        },
        {
          id: "it_4",
          name: "Dal Makhani",
          description: "Overnight black lentils, butter tadka",
          price: 229,
          inStock: true,
          veg: true,
          image: "/images/item-food.png",
        },
        {
          id: "it_5",
          name: "Veg Biryani",
          description: "Dum-cooked basmati, saffron, fried onions",
          price: 269,
          inStock: true,
          veg: true,
          image: "/images/item-food.png",
        },
      ],
    },
    {
      id: "cat_breads",
      name: "Breads",
      image: "/images/cat-food.png",
      items: [
        { id: "it_6", name: "Garlic Naan", description: "Tandoor, butter, coriander", price: 69, inStock: true, veg: true, image: "" },
        { id: "it_7", name: "Butter Naan", description: "Soft, blistered, ghee", price: 59, inStock: true, veg: true, image: "" },
      ],
    },
    {
      id: "cat_drinks",
      name: "Beverages",
      image: "/images/cat-food.png",
      items: [
        { id: "it_8", name: "Masala Chai", description: "Assam, ginger, cardamom", price: 49, inStock: true, veg: true, image: "" },
        { id: "it_9", name: "Cold Coffee", description: "House blend, ice, cream", price: 129, inStock: true, veg: true, image: "" },
      ],
    },
  ];
}

function defaultBusiness(): Business {
  return {
    name: "AI Food Lab",
    category: "Cafe",
    about: "Neighbourhood cafe in Koramangala. Collect stamps, scratch for a surprise, and order from the live QR menu.",
    logo: "/images/logo.svg",
    phone: "9876501234",
    email: "hello@aifoodlab.in",
    address: "12, MG Road, Koramangala",
    city: "Bengaluru",
    pincode: "560034",
    hours: defaultHours,
    instagram: "https://instagram.com/aifoodlab",
    googleReview: "https://maps.google.com/?q=AI+Food+Lab+Koramangala+Bengaluru",
    facebook: "https://facebook.com/aifoodlab",
    youtube: "",
    linkedin: "",
    ownerName: "Shresth",
    ownerPhone: "9876501234",
    plan: "trial",
    trialEndsAt: trialEnd,
    autoApprove: true,
    allowMultipleScans: true,
    menuLive: true,
    menuTheme: "classic",
  };
}

const customers0 = seedCustomers();

export type AppState = {
  hydrated: boolean;
  session: boolean;
  business: Business;
  stamps: StampProgram[];
  scratches: ScratchPrize[];
  menu: MenuCategory[];
  customers: Customer[];
  scans: ScanRecord[];
  winners: Winner[];
  setHydrated: () => void;
  setSession: (v: boolean) => void;
  patchBusiness: (p: Partial<Business>) => void;
  setPlan: (plan: PlanId) => void;
  saveStamp: (p: StampProgram) => void;
  addStamp: () => void;
  removeStamp: (id: string) => void;
  saveScratch: (p: ScratchPrize) => void;
  addScratch: () => void;
  removeScratch: (id: string) => void;
  setMenu: (menu: MenuCategory[]) => void;
  resetMenu: () => void;
  setMenuLive: (v: boolean) => void;
  addCustomer: (c: Omit<Customer, "id" | "createdAt" | "lastVisit" | "stamps"> & { stamps?: number }) => string;
  updateCustomer: (id: string, p: Partial<Customer>) => void;
  giveStamp: (customerId: string) => { completed: boolean };
  playScratch: (customerId: string) => { won: boolean; prize?: ScratchPrize };
  claimWinner: (id: string) => void;
  recordScan: (s: Omit<ScanRecord, "id">) => void;
  logout: () => void;
};

function blankCustomer(partial: Omit<Customer, "id" | "createdAt" | "lastVisit" | "stamps"> & { stamps?: number }): Customer {
  return {
    id: uid("cus"),
    name: partial.name,
    phone: partial.phone,
    notes: partial.notes ?? "",
    stamps: partial.stamps ?? 0,
    lastVisit: todayIso(),
    createdAt: todayIso(),
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      session: true,
      business: defaultBusiness(),
      stamps: [
        {
          id: "stamp_1",
          active: true,
          visitsRequired: 8,
          expiryDays: 30,
          description: "Get 5% discount on your total bill after 8 visits",
          image: "/images/reward.svg",
        },
      ],
      scratches: [
        {
          id: "scr_1",
          title: "20% Cash back on Second Visit (Win20)",
          winnersOutOf: 10,
          expiryDays: 7,
          image: "",
          active: true,
        },
      ],
      menu: seedMenu(),
      customers: customers0,
      scans: seedScans(customers0),
      winners: seedWinners(),
      setHydrated: () => set({ hydrated: true }),
      setSession: (v) => set({ session: v }),
      patchBusiness: (p) => set({ business: { ...get().business, ...p } }),
      setPlan: (plan) => set({ business: { ...get().business, plan } }),
      saveStamp: (p) =>
        set({ stamps: get().stamps.map((s) => (s.id === p.id ? p : s)) }),
      addStamp: () =>
        set({
          stamps: [
            ...get().stamps,
            {
              id: uid("stamp"),
              active: true,
              visitsRequired: 8,
              expiryDays: 30,
              description: "",
              image: "/images/reward.svg",
            },
          ],
        }),
      removeStamp: (id) => set({ stamps: get().stamps.filter((s) => s.id !== id) }),
      saveScratch: (p) =>
        set({ scratches: get().scratches.map((s) => (s.id === p.id ? p : s)) }),
      addScratch: () =>
        set({
          scratches: [
            ...get().scratches,
            {
              id: uid("scr"),
              title: "",
              winnersOutOf: 10,
              expiryDays: 7,
              image: "",
              active: true,
            },
          ],
        }),
      removeScratch: (id) => set({ scratches: get().scratches.filter((s) => s.id !== id) }),
      setMenu: (menu) => set({ menu }),
      resetMenu: () => set({ menu: seedMenu() }),
      setMenuLive: (v) => set({ business: { ...get().business, menuLive: v } }),
      addCustomer: (c) => {
        const next = blankCustomer(c);
        set({ customers: [next, ...get().customers] });
        return next.id;
      },
      updateCustomer: (id, p) =>
        set({ customers: get().customers.map((c) => (c.id === id ? { ...c, ...p } : c)) }),
      giveStamp: (customerId) => {
        const { customers, stamps, winners } = get();
        const program = stamps.find((s) => s.active) ?? stamps[0];
        const required = program?.visitsRequired ?? 8;
        let completed = false;
        const nextCustomers = customers.map((c) => {
          if (c.id !== customerId) return c;
          let next = c.stamps + 1;
          if (next >= required) {
            completed = true;
            next = 0;
          }
          return { ...c, stamps: next, lastVisit: todayIso() };
        });
        const scan: ScanRecord = {
          id: uid("scan"),
          customerId,
          at: new Date().toISOString(),
          type: "stamp",
        };
        const extraWinners = completed
          ? [
              {
                id: uid("win"),
                customerId,
                type: "stamp" as const,
                title: program?.description ?? "Reward",
                claimed: false,
                createdAt: todayIso(),
              },
            ]
          : [];
        set({
          customers: nextCustomers,
          scans: [scan, ...get().scans],
          winners: [...extraWinners, ...winners],
        });
        return { completed };
      },
      playScratch: (customerId) => {
        const { scratches, winners, customers } = get();
        const prize = scratches.find((s) => s.active) ?? scratches[0];
        if (!prize) return { won: false };
        const odds = Math.max(1, prize.winnersOutOf);
        const won = Math.random() < 1 / odds;
        const scan: ScanRecord = {
          id: uid("scan"),
          customerId,
          at: new Date().toISOString(),
          type: "scratch",
          won,
          prizeTitle: prize.title,
        };
        set({
          scans: [scan, ...get().scans],
          customers: customers.map((c) => (c.id === customerId ? { ...c, lastVisit: todayIso() } : c)),
          winners: won
            ? [
                {
                  id: uid("win"),
                  customerId,
                  type: "scratch",
                  title: prize.title,
                  claimed: false,
                  createdAt: todayIso(),
                },
                ...winners,
              ]
            : winners,
        });
        return { won, prize };
      },
      claimWinner: (id) =>
        set({
          winners: get().winners.map((w) =>
            w.id === id ? { ...w, claimed: true, claimedAt: todayIso() } : w,
          ),
        }),
      recordScan: (s) => set({ scans: [{ ...s, id: uid("scan") }, ...get().scans] }),
      logout: () => set({ session: false }),
    }),
    {
      name: "druto-business-v2",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      migrate: (persisted) => {
        const state = persisted as { business?: Partial<Business> } & Record<string, unknown>;
        const seeded = defaultBusiness();
        if (state.business) {
          state.business = {
            ...seeded,
            ...state.business,
            about: state.business.about || seeded.about,
            email: state.business.email || seeded.email,
            instagram: state.business.instagram || seeded.instagram,
            googleReview: state.business.googleReview || seeded.googleReview,
            facebook: state.business.facebook || seeded.facebook,
          };
        }
        return state;
      },
      partialize: (s) => ({
        session: s.session,
        business: s.business,
        stamps: s.stamps,
        scratches: s.scratches,
        menu: s.menu,
        customers: s.customers,
        scans: s.scans,
        winners: s.winners,
      }),
    },
  ),
);

export function useStats() {
  const customers = useAppStore((s) => s.customers);
  const scans = useAppStore((s) => s.scans);
  const winners = useAppStore((s) => s.winners);
  const today = todayIso();
  const scansToday = scans.filter((s) => s.at.slice(0, 10) === today).length;
  const completedToday = winners.filter((w) => w.createdAt.slice(0, 10) === today).length;
  const users = customers.length;
  const rewards = winners.length;
  const repeats = customers.filter((c) => c.stamps > 0 || scans.filter((s) => s.customerId === c.id).length > 1).length;
  const repeatPct = users ? Math.round((repeats / users) * 100) : 0;

  const week = Array.from({ length: 7 }, (_, i) => {
    const date = daysAgoIso(6 - i);
    return {
      date,
      scans: scans.filter((s) => s.at.slice(0, 10) === date).length,
      customers: customers.filter((c) => c.createdAt.slice(0, 10) <= date).length,
    };
  });

  return { scans: scans.length, users, rewards, repeatPct, scansToday, completedToday, week };
}
