import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

// Na classe Service cria todos os metodos CRUD
@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ){}

    async findAll(): Promise<Postagem[]>{
        return this.postagemRepository.find({
            relations: { //habilitando o relacionamento na consulta
                tema: true,
                usuario: true
            }
        }); //SELECT * FROM tb_postagens;
    }

    async findById(id: number): Promise<Postagem> {

        //dispara dentro do BD SELECT*FROM tb_postagens WHERE id = ?;
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: { 
                tema: true,
                usuario: true
            }
        });

        if(!postagem)
            throw new HttpException('Postagem não encontrada' , HttpStatus.NOT_FOUND)

        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]>{
        return this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`) //ILike = case insensitive
            },
            relations: { 
                tema: true,
                usuario: true
            }
        });
    }

    async create(postagem: Postagem): Promise<Postagem>{

        await this.temaService.findById(postagem.tema.id)
        
        // INSERT INTO tb_postagens(titulo, texto) VALUES(?, ?)
        return await this.postagemRepository.save(postagem);

    }

    async update(postagem: Postagem): Promise<Postagem>{

        if(!postagem.id || postagem.id <= 0)
            throw new HttpException("Postagem inválida", HttpStatus.BAD_REQUEST)


        await this.findById(postagem.id)

        await this.temaService.findById(postagem.tema.id)
        //UPDATE tb_postagens SET titulo = postagem.titulo, 
        //texto = postagem.texto, data = CURRENT_TIMESTAMP()
        //WHERE id = postagem.id
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)

        //DELETE tb_postagens WHERE id = ?;
        return await this.postagemRepository.delete(id);
    }
    


}