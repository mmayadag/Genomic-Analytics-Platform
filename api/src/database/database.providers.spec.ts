import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { databaseProviders } from './database.providers';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('DatabaseProviders', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
    jest.spyOn(configService, 'get').mockReturnValue('mongodb://test-url');
  });

  it('should create a database connection', async () => {
    const provider = databaseProviders.find(
      (p) => p.provide === 'DATABASE_CONNECTION',
    );
    expect(provider).toBeDefined();

    const mongooseMock = mongoose as jest.Mocked<typeof mongoose>;
    await provider.useFactory(configService);

    expect(mongooseMock.connect).toHaveBeenCalledWith('mongodb://test-url');
    expect(configService.get).toHaveBeenCalledWith('MONGO_URL');
  });
});
