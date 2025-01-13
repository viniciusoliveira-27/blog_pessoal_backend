import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagens()
export class Postagem{

    @PrimaryGeneratedColumn()// id INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 100, nullable: false}) //VARCHAR(100) NOT NULL
    titulo: string;

    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 1000, nullable: false}) //VARCHAR(100) NOT NULL
    texto: string;

    @UpdateDateColumn() // Já cria com a data e hopra do computador.
    data: Date;
}