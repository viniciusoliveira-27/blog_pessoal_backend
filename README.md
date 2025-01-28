# Projeto BlogPessoal

![BlogPessoal Logo](https://i.imgur.com/icgjsRQ.png)

## 1. Descrição

O projeto consiste em um **Blog Pessoal**, desenvolvido em TypeScript e utilizando o NestJS como framework back-end.  
O principal objetivo é fornecer uma plataforma para os usuários criarem postagens pessoais e organizá-las em temas, proporcionando um ambiente intuitivo para expressão pessoal e compartilhamento de conteúdo.

------

## 2. Sobre esta API

A API **BlogPessoal** foi desenvolvida para permitir a criação e organização de postagens pessoais. Ela oferece funcionalidades que incluem o cadastro de usuários, gerenciamento de postagens e temas, bem como autenticação e acesso seguro aos dados dos usuários.

### 2.1. Principais Funcionalidades

1. **Cadastro de usuários**  
   A API permite que novos usuários sejam registrados no sistema, com informações como:  
   - Nome  
   - Data de nascimento  
   - Usuário (e-mail)  
   - Senha  
   - Foto de perfil  

2. **Consulta de temas de postagem**  
   É possível buscar e visualizar temas registrados, com atributos como:  
   - Descrição  

3. **Gerenciamento de postagens**  
   A API permite criar, atualizar e excluir postagens, com os seguintes atributos:  
   - Título da postagem  
   - Texto da postagem  
   - Data  

4. **Login de usuários**  
   Usuários podem se autenticar para acessar suas postagens e funcionalidades exclusivas.

------

## 3. Diagrama de Classes

<img src="./src/imgs/diagrama.png"/>

------

## 4. Diagrama Entidade-Relacionamento (DER)

<img src="./src/imgs/der.png"/>

------

## 5. Tecnologias utilizadas

| Item                          | Descrição  |
| ----------------------------- | ---------- |
| **Servidor**                  | Node.js    |
| **Linguagem de programação**  | TypeScript |
| **Framework**                 | NestJS     |
| **ORM**                       | TypeORM    |
| **Banco de dados Relacional** | MySQL      |

------

## 6. Configuração e Execução

1. Clone o repositório.  
2. Instale as dependências: `npm install`.  
3. Configure as variáveis de ambiente criando um arquivo `.env`.  
4. Execute a aplicação: `npm run start:dev`.  

---

