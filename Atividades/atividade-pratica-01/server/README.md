# README

Este projeto é uma aplicação .NET projetada usando a abordagem de APIs minimais do ASP.NET Core. O principal propósito desta aplicação é gerenciar dados relacionados à doação de sangue.

## Componentes Chave

A aplicação consiste em vários componentes, incluindo os seguintes:

- **Cidade:** Representa as cidades.
- **Estado:** Representa os estados.
- **TipoSanguíneo:** Representa os tipos de sangue.
- **Pessoa:** Representa as pessoas.
- **Local:** Representa os locais de coleta.
- **Doação:** Representa as doações.

## Características

Para cada componente, existem várias APIs disponíveis para realizar operações padrão de CRUD:

- **GET:** Recupera uma lista de itens ou um único item se um ID for fornecido.
- **POST:** Cria um novo item.
- **PUT:** Atualiza um item existente.
- **DELETE:** Exclui um item.

## Banco de Dados

A aplicação usa SQLite como seu banco de dados, com o Entity Framework Core servindo como o ORM.

## Mapeamento de Objeto para Objeto

A biblioteca AutoMapper é usada na aplicação. AutoMapper é uma pequena biblioteca simples construída para resolver um problema enganosamente complexo - eliminar o código que mapeava um objeto para outro.

## Swagger

O Swagger é usado nesta aplicação, que é uma Linguagem de Descrição de Interface para descrever APIs RESTful expressas usando JSON. Swagger é usado juntamente com um conjunto de ferramentas de software de código aberto para projetar, construir, documentar e usar serviços da web RESTful.

## Ponto de Entrada da Aplicação

O ponto de entrada da aplicação é o objeto builder, uma instância de WebApplication. Este é um framework para construir APIs web e aplicações. Os serviços específicos da aplicação, como AutoMapper, Swagger e DbContext são configurados com a ajuda deste objeto builder.
Após todas as configurações, a aplicação é construída e iniciada pela chamada do método Run().
```
var builder = WebApplication.CreateBuilder(args);
//...outros códigos...
app.Run();
```

## Executando a Aplicação

Para executar a aplicação localmente, você precisará instalar o SDK .NET. Depois de instalado, execute `dotnet run` no diretório raiz do projeto onde o arquivo do projeto está localizado. Após executar este comando, você pode abrir a aplicação em seu navegador web usando a URL localhost fornecida.

## Materiais de Referencia

https://learn.microsoft.com/en-us/training/modules/build-web-api-minimal-database/

https://docs.automapper.org/en/stable/Getting-started.html

