import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
	// create new user
	async createUser(req, res) {
		// req and res are request and response
		try {
			const { name, email } = req.body;

			// validade the request, checking the uniqueness of the email field
			let user = await prisma.user.findUnique({ where: { email } });

			// if the user already exists, return an error
			if (user) {
				return res.json({ error: "There is already a user with that email" });
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
	},

	// search for all users
	async findAllUsers(req, res) {
		try {
			const users = await prisma.user.findMany();
			return res.json(users);
		} catch (error) {
			return res.json({ error });
		}
	},

	// search for a user by id
	async findUser(req, res) {
		try {
			const { id } = req.params;
			const user = await prisma.user.findUnique({ where: { id: Number(id) } });

			if (!user) {
				return res.json({ error: "User not found" });
			}

			return res.json(user);
		} catch (error) {
			return res.json({ error });
		}
	},

	// update a user
	async updateUser(req, res) {
		try {
			const { id } = req.params;
			const { name, email } = req.body;
			let user = await prisma.user.findUnique({ where: { id: Number(id) } });

			if (!user) {
				return res.json({ error: "User not found" });
			}

			user = await prisma.user.update({
				where: { id: Number(id) },
				data: { name, email },
			});

			return res.json(user);
		} catch (error) {
			res.json({ error });
		}
	},

	// delete a user
	async deleteUser(req, res) {
		try {
			const { id } = req.params;
			const user = await prisma.user.findUnique({ where: { id: Number(id) } });

			if (!user) {
				return res.json({ error: "User not found" });
			}

			await prisma.user.delete({ where: { id: Number(id) } });

			return res.json({ message: "User deleted" });
		} catch (error) {
			return res.json({ error });
		}
	},
};
