import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const config = {
	env: process.env.NODE_ENV,
	server: {
		cypherKey: process.env.CYPHER_KEY,
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
