import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CountryEntity } from '@entities/country';

@Entity('currencies')
export class CurrencyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 5, unique: true, nullable: false })
  code: string;

  @ManyToMany(
    () => CountryEntity,
    (country: CountryEntity) => country.currencies,
  )
  countries: CountryEntity[];
}
