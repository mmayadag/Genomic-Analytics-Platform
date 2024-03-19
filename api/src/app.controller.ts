import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Welcome message')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The getHello has been successfully executed.',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
