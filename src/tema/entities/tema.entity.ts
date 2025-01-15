import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_temas"}) // CREATE TABLE tb_temas()
export class Tema{

    @PrimaryGeneratedColumn()// id INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 255, nullable: false}) //VARCHAR(100) NOT NULL
    descricao: string;

   
}