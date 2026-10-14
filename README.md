# Controle de Consumo Residencial

Uma aplicação web progressiva (PWA) simples para calcular e gerenciar o consumo de energia elétrica de eletrodomésticos, ajudando a identificar os equipamentos que mais impactam na conta de luz.

## Funcionalidades

- **Cálculo Automático**: Descubra o consumo mensal (kWh) e o custo estimado em Reais (R$) de cada aparelho com base na sua potência e tempo de uso.
- **Tarifa Ajustável**: Atualize o valor da tarifa da sua distribuidora de energia em tempo real para refletir os custos reais da sua região.
- **Armazenamento Local**: Seus dados são salvos automaticamente no `localStorage` do navegador. Você não perde sua lista ao fechar a página.
- **Progressive Web App (PWA)**: Pode ser instalado na tela inicial do smartphone e funciona de maneira **100% offline** através do Service Worker.
- **Modo Escuro (Dark Mode)**: Alternância de tema claro/escuro com salvamento da preferência do usuário.
- **Análise Visual**: Barra de impacto percentual que indica graficamente quais aparelhos são os maiores "vilões" do consumo.
- **Ordenação Inteligente**: Botão para ordenar a lista do aparelho mais custoso para o mais econômico.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as tecnologias web base (sem a necessidade de frameworks complexos, com foco em leveza e velocidade):

- **HTML** (Estrutura do app)
- **CSS** (Estilização e variáveis para temas)
- **JavaScript (Vanilla)** (Lógica matemática, manipulação e `localStorage`)
- **Service Workers & Web App Manifest** (Suporte a PWA e Cache Offline)

## Como usar

1. Acesse a aplicação através do [Link do GitHub Pages](https://rennerrsouza.github.io/).
2. Se estiver no smartphone (Chrome, Mozilla), toque nas opções do navegador e selecione **"Adicionar à tela inicial"** para instalar o app.
3. Defina o valor do kWh cobrado pela sua distribuidora na parte superior da tela.
4. Adicione seus aparelhos informando o Cômodo, Nome, Potência (em Watts) e o tempo médio de uso por dia.
5. Utilize a ferramenta de ordenação para analisar seu consumo.
