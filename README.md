# MoneyFlow - Frontend (Angular) 💻

> 🚧 **Estado do Projeto: Em Desenvolvimento (Work in Progress)** 🚧

> *Esta aplicação está atualmente a ser construída. O layout, a integração com a API e as funcionalidades base estão em fase de implementação e evolução contínua.*

O **MoneyFlow Frontend** é uma Single Page Application (SPA) moderna, pensada para consumir a API RESTful do sistema MoneyFlow. O objetivo deste projeto é criar uma interface intuitiva para a gestão de finanças pessoais, estruturada com rigorosas regras de desenvolvimento e boas práticas do ecossistema Angular.

## 🚀 Tecnologias e Ferramentas

* **Framework:** Angular 21.2.3 (arquitetura *Standalone Components*)
* **Linguagem:** TypeScript
* **Estilização:** SCSS (focado em modularidade por componente)
* **Comunicação HTTP:** `HttpClient` nativo do Angular

## 🏗️ Arquitetura e Boas Práticas (Em implementação)

O projeto está a ser construído respeitando convenções que demonstram domínio de front-end corporativo:

* **Standalone Components:** Uso integral do novo padrão do Angular, reduzindo a complexidade.
* **Organização Feature-Based:** O código está a ser agrupado por funcionalidades (ex: categorias, transações).
* **Forte Tipagem (DTOs e ViewModels):** Preocupação em não usar `any`, garantindo que todas as respostas de rede partilham modelos bem definidos.

## 📁 Estrutura Planeada
```text
src/app/
├── core/              # Guards, Interceptors (em breve)
├── features/          # Módulos isolados por contexto de negócio (Categorias, Transações)
├── Services/          # Serviços Angular para chamadas HTTP
└── shared/            # Componentes visuais reutilizáveis
