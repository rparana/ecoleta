import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.item.createMany({
    data: [
      { title: "Lâmpadas", image: "lampadas.svg" },
      { title: "Pilhas e Baterias", image: "baterias.svg" },
      { title: "Papéis e Papelão", image: "papeis-papelao.svg" },
      { title: "Resíduos Eletrônicos", image: "eletronicos.svg" },
      { title: "Resíduos Orgânicos", image: "organicos.svg" },
      { title: "Óleo de Cozinha", image: "oleo.svg" },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
