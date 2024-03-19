import * as mongoose from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      return await mongoose.connect(configService.get('MONGO_URL'));
    },
    inject: [ConfigService],
  },
];
