const app = require("./src/App");
const { DB_URI } = require("./src/config");
const mongoose = require("mongoose");
mongoose.connect(DB_URI);
const PORT = 3000

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
