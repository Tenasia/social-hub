import "dotenv/config"
import { prisma } from "../src/lib/prisma"

// Upserts keep this re-runnable: existing users are left alone, and their
// feedback is only created the first time the user is inserted.
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@socialhub.dev" },
    update: {},
    create: {
      email: "alice@socialhub.dev",
      name: "Alice",
      feedbackItems: {
        create: [
          {
            title: "Dark mode",
            description: "The feed is hard on the eyes at night.",
            status: "PLANNED",
            upvotes: 12,
          },
          {
            title: "Edit a post after publishing",
            description: "Typos happen. Let me fix them.",
            upvotes: 8,
          },
        ],
      },
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: "bob@socialhub.dev" },
    update: {},
    create: {
      email: "bob@socialhub.dev",
      name: "Bob",
      feedbackItems: {
        create: [
          {
            title: "Notifications for replies",
            status: "IN_PROGRESS",
            upvotes: 5,
          },
          {
            title: "Faster image uploads",
            status: "DONE",
            upvotes: 3,
          },
        ],
      },
    },
  })

  const count = await prisma.feedbackItem.count()
  console.log(`Seeded users ${alice.email}, ${bob.email} (${count} feedback items total)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
