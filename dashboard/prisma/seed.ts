import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultChoiceScale: Prisma.FormChoiceScaleCreateInput[] = [
    { name: 'Emoji Faces', choices: ['😰', '😓', '😂', '🙂', '😍'] },
    { name: 'Thumbs', choices: ['👎', '👍'] },
  ];

  for (const u of defaultChoiceScale) {
    const res = await prisma.formChoiceScale.upsert({
      where: { name: u.name },
      update: u,
      create: u,
    });

    console.log(res);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
