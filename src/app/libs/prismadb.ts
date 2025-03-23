// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient();
// export default prisma;

// // const client = globalThis.prisma || new PrismaClient()
// // if (process.env.NODE_ENV !== "production") globalThis.prisma = client

// // export default client

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma