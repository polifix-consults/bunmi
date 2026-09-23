import {
  BarChart3,
  Building2,
  FileText,
  HeartHandshake,
  Landmark,
  Mic,
  Radio,
  Scale,
  ScrollText,
  Tv,
  Users,
  Vote,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry.
 *
 * Content in `lib/content.ts` references icons by *name*, never by component
 * reference. Component references are functions, and functions cannot cross the
 * server → client boundary.
 */
export const ICONS = {
  barChart: BarChart3,
  building: Building2,
  fileText: FileText,
  handshake: HeartHandshake,
  landmark: Landmark,
  mic: Mic,
  radio: Radio,
  scale: Scale,
  scroll: ScrollText,
  tv: Tv,
  users: Users,
  vote: Vote,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

/** Resolve a content icon name to its component, with fallback. */
export function getIcon(name: IconName): LucideIcon {
  return ICONS[name] ?? ScrollText;
}
