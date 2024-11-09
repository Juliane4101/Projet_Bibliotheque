import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthorEntity } from './author.entity';

export type BookId = string & { __brand: 'Book' };

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BookId;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'year_published', type: 'int' })
  yearPublished: number;

  @ManyToOne(() => AuthorEntity, {nullable:true})
  @JoinColumn({ name : 'author_id'})
  author : AuthorEntity
}
