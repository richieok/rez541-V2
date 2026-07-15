import { SSMClient, GetParametersByPathCommand } from "@aws-sdk/client-ssm"
import logger from "./logger.js"

async function getParameters(client, path) {
    logger.debug({ path }, 'Fetching SSM parameters')
    const input = {
        Path: path,
        Recursive: true,
        WithDecryption: true
    }
    const command = new GetParametersByPathCommand(input);
    const response = await client.send(command);

    response.Parameters.forEach(param => {
        logger.info({ parameter: param.Name }, 'Loading parameter');
        const key = param.Name.replace(path, '').toUpperCase();
        process.env[key] = param.Value;
    });
}

export const loadParameters = async () => {
    if (process.env.CLOUD && process.env.CLOUD === "aws") {
        if (!process.env.REGION) {
            throw new Error("REGION environment variable is not set");
        }
        if (!process.env.SSM_PARAMETER_PATH) {
            throw new Error("SSM_PARAMETER_PATH environment variable is not set");
        }
        const client = new SSMClient({ region: process.env.REGION });
        await getParameters(client, process.env.SSM_PARAMETER_PATH);
        logger.info("Parameters loaded from AWS SSM");
    }
};
