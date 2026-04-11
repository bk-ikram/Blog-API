import { prisma } from "../lib/prisma.js"
import { genPassword } from "../lib/passwordUtils.js";

async function main(){
    const test_password = "myPassword";
    const hash = await genPassword(test_password);

    //create author user
    const author = await prisma.user.create({
        data: {
            userName: "kiki"
            ,hash: hash
            ,role: "AUTHOR"

        }
    })

    //create a few posts
    await prisma.post.createMany({
        data: [
            { userId: author.id
                , title: "My first post"
                , content: "t is a long established fact that a reader will be "
             }
             ,{ userId: author.id
                , title: "My second post"
                , content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, "
             }
        ]

    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log("Created seed data in DB.");
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
        console.log("Could not create seed data in DB.");
    });
