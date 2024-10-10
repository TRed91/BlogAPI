const prisma = require('./prismaClient');

async function seed() {
    try{
        await prisma.usertype.create({
            data: {
                name: "author"
            }
        });
    
        await prisma.usertype.create({
            data: {
                name: "reader"
            }
        });

        const usertypes = await prisma.usertype.findMany();
        console.log('Generated usertypes: ', usertypes);

    } catch (err) {
        console.error('Seeding error: ', err.message);
    } finally {
        prisma.$disconnect();
    }
}

seed();