import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
	console.time("Seeding complete 🌱");

	await prisma.user.createMany({
		data: [
			{ username: "The only way to do great work is to love what you do." },
			{ username: "In the middle of every difficulty lies opportunity." },
			{ username: "Believe you can and you're halfway there." },
			{ username: "The best way to predict the future is to create it." },
			{ username: "Don't watch the clock; do what it does. Keep going." },
			{ username: "The only thing we have to fear is fear itself." },
			{ username: "The journey of a thousand miles begins with a single step." },
			{ username: "If you can dream it, you can achieve it." },
			{ username: "Innovation distinguishes between a leader and a follower." },
			{
				username: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
			},
			{ username: "You miss 100% of the shots you don't take." },
			{
				username: "The only limit to our realization of tomorrow will be our doubts of today.",
			},
			{ username: "Change your thoughts and you change your world." },
			{
				username:
					"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
			},
			{
				username:
					"The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
			},
			{ username: "Life is 10% what happens to us and 90% how we react to it." },
			{
				username: "The future belongs to those who believe in the beauty of their dreams.",
			},
			{
				username: "Do not wait for the perfect moment, take the moment and make it perfect.",
			},
			{ username: "The only source of knowledge is experience." },
		],
	});

	console.timeEnd("Seeding complete 🌱");
};

main()
	.then(() => {
		console.log("Process completed");
	})
	.catch((e) => console.log(e));
