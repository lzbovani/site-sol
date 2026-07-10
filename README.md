# Neko no Ma — café entre silêncios

Site demonstrativo completo para uma cafeteria fictícia com atmosfera japonesa contemporânea e convivência respeitosa com gatos. O projeto foi criado do zero, com identidade visual, conteúdo em português, imagens originais e interações funcionais.

Site publicado: https://lzbovani.github.io/site-sol/

## Executar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite (normalmente `http://localhost:5173`).

Para validar a versão de produção:

```bash
npm run lint
npm run test
npm run build
npm run preview
```

Todo push na branch `main` executa o workflow `.github/workflows/deploy-pages.yml`, compila a aplicação e publica exclusivamente o conteúdo de `dist/` no GitHub Pages.

## Tecnologias

- React e TypeScript para componentes, estado e tipagem.
- Vite para desenvolvimento e build rápidos.
- CSS autoral para identidade, responsividade, animações e `prefers-reduced-motion`.
- Vitest e Testing Library para os principais fluxos de interface.
- SVG original para logotipo e favicon.
- Imagens WebP originais geradas para o projeto e mantidas localmente.

## Funcionalidades

- Navegação responsiva, menu móvel, retorno ao topo e links internos.
- Cardápio com 18 itens, busca, categorias, favoritos e ordenação.
- Carrinho persistido em `localStorage`, quantidades, remoção, totais e cupom.
- Checkout explicitamente demonstrativo, sem pagamento real.
- Reserva local com validação, horários simulados e confirmação visual.
- Perfis interativos dos gatos e orientações de bem-estar.
- Galeria, avaliações fictícias identificadas, FAQ acessível e mapa ilustrativo.
- Foco visível, semântica, textos alternativos, navegação por teclado e movimento reduzido.

## Dados de demonstração

- Cupom: `RONROM10` (10% de desconto demonstrativo).
- Endereço, telefone, e-mail, avaliações, disponibilidade e perfis são fictícios.
- Nenhum formulário envia dados para serviços externos.

## Limitações

- Não há backend, autenticação, pagamento, estoque ou agenda real.
- O carrinho e os favoritos permanecem apenas no navegador do visitante.
- O mapa é uma composição ilustrativa; o link externo usa apenas Vila Mariana como referência.

Os prompts usados para criar as imagens estão documentados em [`docs/image-prompts.md`](docs/image-prompts.md).
