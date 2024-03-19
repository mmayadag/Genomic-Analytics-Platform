import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  const configService = app.get(ConfigService);

  const openApiConfig = new DocumentBuilder()
    .setTitle('GenomicAnalyticsPlatform')
    .setDescription(
      'Omics Data Retrieval and Analysis System for scientific research in genomics.',
    )
    .setVersion('1.0')
    .addTag('genomics', 'Retrieve and analyze genomic data')
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);

  SwaggerModule.setup('api', app, document);
  const port = configService.get('API_PORT') || 4000;

  await app.listen(port);
}
bootstrap();
