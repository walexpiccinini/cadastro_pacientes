import RootController from "./Root/root.controller";
import App from "./app";
const PORT = 3333

const app = new App([new RootController()],PORT)

app.listen()