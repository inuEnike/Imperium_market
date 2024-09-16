import { ENV_DATA } from "./envData";

const Flutterwave: any = require('flutterwave-node-v3')
const flw = new Flutterwave(ENV_DATA.FLW_PUBLIC_KEY, ENV_DATA.FLW_SECRET_KEY, ENV_DATA.FLW_PRODUCTION_FLAG);
export default flw