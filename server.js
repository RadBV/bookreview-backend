const app = require("./app");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;


app.use(cors())
app.listen(PORT, () => {
    console.log(`Your app is running at ${PORT}`);
});
