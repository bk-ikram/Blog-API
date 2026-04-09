//import { prisma } from "../lib/prisma.js"
//const prisma = require("../lib/prisma.js")

const { PrismaClient } = require('../lib/prisma.js');
const prisma = new PrismaClient();

async function main(){
    prisma.post.create({
        data: [
            { userId: 1
                , title: "My first post"
                , content: "t is a long established fact that a reader will be "
             }
             ,{ userId: 1
                , title: "My second post"
                , content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, "
             }
        ]

    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
