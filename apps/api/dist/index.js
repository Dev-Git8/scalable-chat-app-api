import express from "express";
import { formatCurrency } from "@scalable-chat/util";
const app = express();
app.get("/", (req, res) => {
    const formattedCurrency = formatCurrency(1000);
    return res.json({ message: formattedCurrency
    });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map