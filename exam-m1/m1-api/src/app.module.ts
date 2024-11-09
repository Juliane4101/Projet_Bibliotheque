import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { BookModule } from './modules/books/book.module';
import { AuthorModule } from './modules/authors/author.module';

@Module({
  imports: [DatabaseModule,BookModule,AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
