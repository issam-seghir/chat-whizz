import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
	console.time("Seeding complete 🌱");

	await prisma.user.createMany({
		data: [
			{ name: "The only way to do great work is to love what you do." },
			{ name: "In the middle of every difficulty lies opportunity." },
			{ name: "Believe you can and you're halfway there." },
			{ name: "The best way to predict the future is to create it." },
			{ name: "Don't watch the clock; do what it does. Keep going." },
			{ name: "The only thing we have to fear is fear itself." },
			{ name: "The journey of a thousand miles begins with a single step." },
			{ name: "If you can dream it, you can achieve it." },
			{ name: "Innovation distinguishes between a leader and a follower." },
			{
				name: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
			},
			{ name: "You miss 100% of the shots you don't take." },
			{
				name: "The only limit to our realization of tomorrow will be our doubts of today.",
			},
			{ name: "Change your thoughts and you change your world." },
			{
				name:
					"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
			},
			{
				name:
					"The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
			},
			{ name: "Life is 10% what happens to us and 90% how we react to it." },
			{
				name: "The future belongs to those who believe in the beauty of their dreams.",
			},
			{
				name: "Do not wait for the perfect moment, take the moment and make it perfect.",
			},
			{ name: "The only source of knowledge is experience." },
		],
	});

	console.timeEnd("Seeding complete 🌱");
};

main()
	.then(() => {
		console.log("Process completed");
	})
	.catch((e) => console.log(e));
