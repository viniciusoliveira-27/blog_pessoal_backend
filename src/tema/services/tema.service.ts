import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    async findAll(): Promise<Tema[]> {
        return this.temaRepository.find(); //SELECT * FROM tb_postagens;
    }

    async findById(id: number): Promise<Tema> {

        //dispara dentro do BD SELECT*FROM tb_postagens WHERE id = ?;
        const tema = await this.temaRepository.findOne({
            where: {
                id
            }
        });

        if (!tema)
            throw new HttpException('Tema não encontrada', HttpStatus.NOT_FOUND)

        return tema;
    }

    async findByDescricao(descricao: string): Promise<Tema[]> {
        return this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`) //ILike = case insensitive
            }
        });
    }

    async create(tema: Tema): Promise<Tema>{
        return await this.temaRepository.save(tema)
    }

    async update(tema: Tema): Promise<Tema>{

        await this.findById(tema.id)

        return await this.temaRepository.save(tema)
    }

    async delete(id: number): Promise<DeleteResult>{

        await this.findById(id)

        return await this.temaRepository.delete(id)
    }


}