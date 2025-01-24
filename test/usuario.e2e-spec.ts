import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Modulos usuarios e Auth (e2e)', () => {
  let token: any;
  let usuarioId: any;

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
        dropSchema: true
      }),        
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("01 - Deve cadastrar novo usuario", async() => {
    const resposta = await request(app.getHttpServer())
    .post("/usuarios/cadastrar")
    .send({
      nome: "Vinissolas",
      usuario: "vinissolas@email.com",
      senha: "vinicius123",
      foto: "foto top.png"
    })
    .expect(201)

    usuarioId = resposta.body.id;
  })

  it("02 - Não deve cadastrar um usuario duplicado", async() => {
    return await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: "Vinissolas",
      usuario: "vinissolas@email.com",
      senha: "vinicius123",
      foto: "foto top.png"
    })
    .expect(400)
  })

  it('03 - Deve autenticar um usuario (login)', async() =>{
    const resposta = await request(app.getHttpServer())
    .post("/usuarios/logar")
    .send({
      usuario: "vinissolas@email.com",
      senha: "vinicius123"
    })
    .expect(200)
    token = resposta.body.token
  })

  it('04 - Deve listar todos os usuarios', async() => {
    return await request(app.getHttpServer())
    .get("/usuarios/all")
    .set("Authorization", `${token}`)
    .expect(200)
  })


  it("05 - deve atualizar o usuario", async() => {
    return await request (app.getHttpServer())
    .put("/usuarios/atualizar")
    .set("Authorization", `${token}`)
    .send({
      id: usuarioId,
      nome: "Vinissolas atualizado",
      usuario: "vinissolas@email.com",
      senha: "vinicius123",
      foto: "foto topissima.png"
    })
    .expect(200)
    .then(resposta => {
      expect ("Vinissolas atualizado").toEqual(resposta.body.nome);
    })
  })

  it("06 - deve procurar usuario por ID", async() => {
    return await request(app.getHttpServer())
    .get(`/usuarios/${usuarioId}`)
    .set("Authorization", `${token}`)
    .expect(200)
    
  })
  


});
