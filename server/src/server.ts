import app from "./app";
import { Connect } from "./utils/db";
import { ENV_DATA } from "./utils/envData";

const Port = (port:number) => {
    app.listen(port)

    //call the database connection
    Connect.db(ENV_DATA.DB_URI)
    console.log(`server started on 127.0.0.1:${port}`)
}

Port(ENV_DATA.PORT)