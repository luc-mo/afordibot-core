import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const config = {
	env: process.env.NODE_ENV,
	server: {
		cipherKey: process.env.CIPHER_KEY,
	},
	mongo: {
		uri: process.env.MONGO_URI,
		dbName: process.env.MONGO_DB_NAME,
		timeout: 5000,
	},
	firebase: {
		projectId: process.env.FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
		databaseUrl: process.env.FIREBASE_DATABASE_URL,
	},
	bot: {
		botId: process.env.BOT_ID,
		clientId: process.env.BOT_CLIENT_ID,
		clientSecret: process.env.BOT_CLIENT_SECRET,
		defaultChannels: process.env.BOT_CHANNELS.split(' '),
	},
}
