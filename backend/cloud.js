import { SSMClient, GetParametersByPathCommand } from "@aws-sdk/client-ssm"

async function getParameters(client, path) {
    console.log(path)
    try {
        const input = {
            Path: path,
            Recursive: true,
            WithDecryption: true
        }
        const command = new GetParametersByPathCommand(input);
        const response = await client.send(command);

        response.Parameters.forEach(param => {
            console.log(`Loading parameter: ${param.Name} with value: ${param.Value}`);
            const key = param.Name.replace(path, '').toUpperCase();
            process.env[key] = param.Value;
        });
    }
    catch (error) {
        console.error('Error fetching parameters\n', error);
    }
}

export const loadParameters = async () => {
    if (process.env.CLOUD && process.env.CLOUD === "aws") {
        try {
            if ( !process.env.REGION ){
                throw new Error("REGION environment variable is not set");
            }
            if ( !process.env.SSM_PARAMETER_PATH ){
                throw new Error("SSM_PARAMETER_PATH environment variable is not set");
            }
            const client = new SSMClient({ region: process.env.REGION });
            await getParameters(client, process.env.SSM_PARAMETER_PATH);
            console.log("Parameters loaded from AWS SSM");
            
        } catch (error) {
            console.error(error.message)
        }
    }
};
