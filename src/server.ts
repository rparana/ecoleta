import app from "./app";
import { config } from "./infrastructure/config";

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}!`);
});
