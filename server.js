const app = require("./app");

require("dotenv").config();

const cors = require("cors");
const PORT = process.env.PORT;
app.use(cors())


app.listen(PORT, () => {
    console.log(`Your app is running at ${PORT}`);
});
