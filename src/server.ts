import app from "./infrastructure/http/app";
import { config } from "./infrastructure/config/config";

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}!`);
});
