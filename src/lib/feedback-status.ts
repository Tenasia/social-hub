// Client-safe: only imports the generated enums, never PrismaClient.
import { FeedbackStatus } from "@/generated/prisma/enums"

export { FeedbackStatus }

export const STATUS_LABELS: Record<FeedbackStatus, string> = {
  OPEN: "Open",
  PLANNED: "Planned",
  IN_PROGRESS: "In progress",
  DONE: "Done",
}

export const STATUS_STYLES: Record<FeedbackStatus, string> = {
  OPEN: "bg-slate-100 text-slate-700 ring-slate-200",
  PLANNED: "bg-sky-50 text-sky-700 ring-sky-200",
  IN_PROGRESS: "bg-amber-50 text-amber-800 ring-amber-200",
  DONE: "bg-emerald-50 text-emerald-700 ring-emerald-200",
}

export function isFeedbackStatus(value: unknown): value is FeedbackStatus {
  return (Object.values(FeedbackStatus) as unknown[]).includes(value)
}
