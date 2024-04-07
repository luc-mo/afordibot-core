import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const config = {
	env: process.env.NODE_ENV,
	server: {
		port: process.env.PORT ?? 3001,
		cipherKey: process.env.CIPHER_KEY,
	},
	mongo: {
		uri: process.env.MONGO_URI,
		dbName: process.env.MONGO_DB_NAME,
		timeout: 5000,
	},
	helix: {
		botId: process.env.HELIX_BOT_ID,
		clientId: process.env.HELIX_CLIENT_ID,
		clientSecret: process.env.HELIX_CLIENT_SECRET,
	},
}
