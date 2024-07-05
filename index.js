const dotenv = require("dotenv");
const createApp = require("./app");
const routers = require("./src/routers");
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = createApp(routers, PORT);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
