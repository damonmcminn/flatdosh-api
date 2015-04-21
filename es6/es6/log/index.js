import bunyan from 'bunyan';
import CONFIG from 'parse-config'

const Logger = bunyan.createLogger({name: CONFIG.name});
export default Logger;
