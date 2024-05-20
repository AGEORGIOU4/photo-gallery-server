import app from "./app";
import { checkDatabaseConnection } from "./helpers/helpers";

require('dotenv').config();

const port = process.env.PORT;

app.get('/', async (req, res) => res.send(
	{
		"Date": new Date(),
		"Server Connection": true,
		"Database Connection": await checkDatabaseConnection()
	}
));

app.listen(port, () => {
	console.log("Production Server is running on port " + port);
});
