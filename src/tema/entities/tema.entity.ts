import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_temas" }) // CREATE TABLE tb_temas()
export class Tema {

    @PrimaryGeneratedColumn()// id INT AUTO_INCREMENT PRIMARY KEY
    @ApiProperty()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({ length: 255, nullable: false }) //VARCHAR(100) NOT NULL
    @ApiProperty()
    descricao: string;

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];


}