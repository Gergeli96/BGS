export class EnvDbConfig {
    public username: string
    public password: string
    public database: string
    public host: string
    public port: number

    constructor() {
        const envVariable = process.env.DATABASE

        if (envVariable) {
            const keyValuePairs = envVariable.split(';')
                .reduce((result, element) => {
                    let [name, value] = element.split('|')
                    result.set(name as any, value)
                    return result
                }, new Map<keyof EnvDbConfig, any>())
            
            this.username = keyValuePairs.get('username')
            this.password = keyValuePairs.get('password')
            this.database = keyValuePairs.get('database')
            this.host = keyValuePairs.get('host')
            this.port = keyValuePairs.get('port')
        }
    }
}
