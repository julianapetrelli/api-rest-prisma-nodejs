import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    // req and res are request and response
    async createUser(req, res) {
        try {
            const { name, email } = req.body;
    
            // validade the request, checking the uniqueness of the email field
            let user = await prisma.user.findUnique({ where: { email } });
    
            // if the user already exists, return an error
            if(user) {
                return res.json({error: "There is already a user with that email"});
            }
    
            // create new user
            user = await prisma.user.create({
                data: {
                    name,
                    email,
                },
            });
    
            return res.json(user);
        } catch (error) {
            return res.json({ error });
        }
    }
}