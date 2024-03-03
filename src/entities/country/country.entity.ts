import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CurrencyEntity } from '../currency';

@Entity('countries')
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @ManyToMany(
    () => CurrencyEntity,
    (currency: CurrencyEntity) => currency.countries,
  )
  @JoinTable()
  currencies: CurrencyEntity[];
}
