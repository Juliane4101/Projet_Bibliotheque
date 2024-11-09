import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from './book.entity';

export type AuthorId = string & { __brand: 'Author' };

@Entity('authors')
export class AuthorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({name:' biography', type: 'varchar'})
  biography: string; 


  @Column({name:' path_image', type: 'varchar'})
  image_path: string; 

  @OneToMany(() => BookEntity, (book) => book.author, { nullable: true })
  books: BookEntity[];
}
