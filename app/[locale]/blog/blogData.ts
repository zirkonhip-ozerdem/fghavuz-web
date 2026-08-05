import {Download} from "lucide-react";

export const categoryButtons = [
  { id: "blogFilterAll", label: "blogFilterAll" },
  { id: "blogFilterInstallation", label: "blogFilterInstallation" },
  { id: "blogFilterMaintenance", label: "blogFilterMaintenance" },
  { id: "blogFilterArchitecture", label: "blogFilterArchitecture" },
  { id: "blogFilterInnovation", label: "blogFilterInnovation" },
] as const;

export const featuredArticles = [
  {
    id: "card-1",
    category: "blogCardOneCategory",
    filter: "blogFilterInnovation",
    title: "blogCardOneTitle",
    summary: "blogCardOneSummary",
    details: "blogCardOneDetails",
    readTime: "blogCardOneReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-2",
    category: "blogCardTwoCategory",
    filter: "blogFilterArchitecture",
    title: "blogCardTwoTitle",
    summary: "blogCardTwoSummary",
    details: "blogCardTwoDetails",
    readTime: "blogCardTwoReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-3",
    category: "blogCardThreeCategory",
    filter: "blogFilterInstallation",
    title: "blogCardThreeTitle",
    summary: "blogCardThreeSummary",
    details: "blogCardThreeDetails",
    readTime: "blogCardThreeReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-4",
    category: "blogCardFourCategory",
    filter: "blogFilterMaintenance",
    title: "blogCardFourTitle",
    summary: "blogCardFourSummary",
    details: "blogCardFourDetails",
    readTime: "blogCardFourReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-5",
    category: "blogCardFiveCategory",
    filter: "blogFilterInnovation",
    title: "blogCardFiveTitle",
    summary: "blogCardFiveSummary",
    details: "blogCardFiveDetails",
    readTime: "blogCardFiveReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-6",
    category: "blogCardSixCategory",
    filter: "blogFilterArchitecture",
    title: "blogCardSixTitle",
    summary: "blogCardSixSummary",
    details: "blogCardSixDetails",
    readTime: "blogCardSixReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-7",
    category: "blogCardSevenCategory",
    filter: "blogFilterInstallation",
    title: "blogCardSevenTitle",
    summary: "blogCardSevenSummary",
    details: "blogCardSevenDetails",
    readTime: "blogCardSevenReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
] as const;

export const resources = [
  {label: "blogResourceDWG", icon: Download, href: "/catalog"},
  {label: "blogResourceISO", icon: Download, href: "/catalog"},
  {label: "blogResourceSpecs", icon: Download, href: "/catalog"},
] as const;
