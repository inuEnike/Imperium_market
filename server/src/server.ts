import app from "./app";
import { ENV_DATA } from "./utils/envData";

const Port = (port:number) => {
    app.listen(port)
    console.log(`server started on 127.0.0.1:${port}`)
}

Port(ENV_DATA.PORT)