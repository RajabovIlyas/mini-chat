import {buildServer} from './app/app';
import {readYamlConfig} from './utils/config';
import {connectDatabase} from './utils/db';
import {logger} from "./utils/logger";


async function main() {
    try {
        const config = await readYamlConfig();
        const server = await buildServer({config, connectDatabase, logger});
        const {app: appConfig} = config


        await server.listen({port: appConfig.port, host: appConfig.host});

        logger.info(`Server listening on port ${appConfig.port}`);
    } catch (e: unknown) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
    }
}

main();



