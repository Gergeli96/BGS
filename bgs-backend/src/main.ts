import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    
    const options = {
        origin: true,
        methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        preflightContinue: false,
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Access-Control-Allow-Headers, Authorization',
    }
    app.enableCors(options)

    const port = process.env.PORT || 3000
    const host = '0.0.0.0'
    await app.listen(port, host, () => {
        console.log(`App listens on ${host}:${port}!`)
    })
}
bootstrap()
