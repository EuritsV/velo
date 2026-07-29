# Documento de Casos de Teste - Velô Sprint

Este documento contém os casos de teste para o sistema Velô Sprint - Configurador de Veículo Elétrico, focados em testes funcionais (blackbox) para os módulos descritos.

---

### CT01 - Acesso e Navegação na Landing Page

#### Objetivo
Garantir que o usuário consegue acessar a Landing Page e ser redirecionado corretamente para o configurador.

#### Pré-Condições
- O sistema deve estar no ar e acessível via navegador.
- O usuário não possui sessão ativa ou configuração prévia salva.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a URL base do sistema (Landing Page) | A página inicial é carregada apresentando o veículo e o botão de "Configurar" ou similar. |
| 2  | Clicar no botão para iniciar a configuração do veículo | O usuário é redirecionado para a página do Configurador (`/configure`). |

#### Resultados Esperados
- A página inicial carrega sem erros visuais.
- O botão de ação principal leva o usuário para a rota correta do Configurador.

#### Critérios de Aceitação
- Navegação entre rotas deve funcionar perfeitamente sem recarregar a página (comportamento de SPA).

---

### CT02 - Configuração Básica do Veículo (Fluxo Feliz)

#### Objetivo
Validar se o valor base do veículo é mantido e a seleção de atributos básicos não altera o preço incorretamente.

#### Pré-Condições
- O usuário está na página do Configurador (`/configure`).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Visualizar o preço base exibido no painel | O preço exibido é de R$ 40.000. |
| 2  | Selecionar a Cor Exterior (ex: Glacier Blue ou Lunar White) | O modelo 3D/imagem do carro reflete a cor selecionada. O preço não sofre alteração. |
| 3  | Selecionar a Cor Interior | O sistema registra a escolha sem alterar o preço total. |
| 4  | Manter selecionada as rodas padrão ("Aero") | O preço total permanece em R$ 40.000. |

#### Resultados Esperados
- O preço final exibido ao usuário deve ser exatamente R$ 40.000.
- A imagem do veículo deve corresponder às características selecionadas.

#### Critérios de Aceitação
- Nenhuma seleção básica (cor exterior, interior, rodas aero) deve aumentar o valor base.

---

### CT03 - Adição de Opcionais e Atualização Dinâmica de Preço

#### Objetivo
Verificar se o preço do veículo é recalculado dinamicamente de acordo com as regras de negócio de itens opcionais.

#### Pré-Condições
- O usuário está na página do Configurador (`/configure`).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Alterar o tipo de roda para "Sport" | O preço total é atualizado para R$ 42.000 (+R$ 2.000). A imagem das rodas é atualizada. |
| 2  | Marcar o opcional "Precision Park" | O preço total é atualizado para R$ 47.500 (+R$ 5.500). |
| 3  | Marcar o opcional "Flux Capacitor" | O preço total é atualizado para R$ 52.500 (+R$ 5.000). |
| 4  | Desmarcar o opcional "Precision Park" | O preço total retorna para R$ 47.000 (-R$ 5.500). |

#### Resultados Esperados
- O sistema calcula e exibe em tempo real o preço total do veículo a cada interação.
- A adição ou remoção de opcionais reflete precisamente os valores estipulados na regra de negócio.

#### Critérios de Aceitação
- Roda Sport: +R$ 2.000
- Precision Park: +R$ 5.500
- Flux Capacitor: +R$ 5.000
- O valor final não pode ter divergências.

---

### CT04 - Validação de Campos Obrigatórios no Checkout

#### Objetivo
Garantir que o usuário não consiga avançar no pedido sem preencher os dados pessoais e aceitar os termos obrigatórios.

#### Pré-Condições
- O usuário finalizou a configuração e avançou para a página de Checkout/Pedido (`/order`).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Deixar todos os campos em branco e não marcar o aceite de termos | O sistema mantém os campos vazios. |
| 2  | Clicar no botão "Confirmar Pedido" | O sistema impede o envio e exibe mensagens de erro abaixo de cada campo obrigatório (Nome, Sobrenome, Email, Telefone, CPF, Loja e Termos). |

#### Resultados Esperados
- O pedido não é criado.
- Feedbacks visuais e textuais (ex: mensagens em vermelho) informam o usuário sobre a obrigatoriedade dos campos.

#### Critérios de Aceitação
- Nenhum pedido pode ser gerado com dados ausentes.
- A validação deve ocorrer no frontend antes de tentar qualquer integração.

---

### CT05 - Validação de Dados Inválidos no Checkout

#### Objetivo
Garantir que formatos inválidos de Email, CPF e Telefone sejam rejeitados pelo formulário.

#### Pré-Condições
- O usuário está na página de Checkout/Pedido (`/order`).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher "Nome" e "Sobrenome" com "A" (apenas 1 caractere) | - |
| 2  | Inserir um email em formato incorreto (ex: `usuario@.com`) | - |
| 3  | Inserir um CPF incompleto ou com máscara não preenchida totalmente | - |
| 4  | Inserir um Telefone incompleto | - |
| 5  | Preencher a loja e aceitar os termos | - |
| 6  | Clicar no botão "Confirmar Pedido" | O sistema exibe erros indicando "Email inválido", "CPF inválido", "Telefone inválido" e exige mínimo de caracteres para nome e sobrenome. |

#### Resultados Esperados
- O envio do formulário é bloqueado.
- As mensagens de erro refletem especificamente o formato inválido detectado em cada campo.

#### Critérios de Aceitação
- Email deve possuir formato válido (com `@` e domínio).
- CPF deve ter a quantidade correta de dígitos.
- Nome e sobrenome devem ter no mínimo 2 caracteres.

---

### CT06 - Checkout com Pagamento à Vista (Fluxo Feliz)

#### Objetivo
Validar a criação de um pedido com sucesso utilizando o método de pagamento à vista.

#### Pré-Condições
- O usuário está na página de Checkout/Pedido (`/order`) com o veículo configurado no valor de R$ 40.000 (configuração básica).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher todos os dados pessoais corretamente (Nome, CPF válido, etc) | Os campos não apresentam erros de validação. |
| 2  | Selecionar a loja de retirada | A loja é definida. |
| 3  | Selecionar a opção de pagamento "À Vista" | A interface destaca a opção "À Vista" exibindo o preço de R$ 40.000. Nenhuma análise de crédito é exigida. |
| 4  | Marcar o checkbox de "Termos e Política de Privacidade" | O aceite é registrado. |
| 5  | Clicar em "Confirmar Pedido" | O sistema processa o pedido com sucesso e redireciona para a tela de Confirmação (`/success`). |

#### Resultados Esperados
- O pedido é registrado no sistema com status "APROVADO".
- O redirecionamento ocorre perfeitamente, exibindo o resumo do pedido na nova tela.

#### Critérios de Aceitação
- Compras "À Vista" não passam pelo fluxo da API de análise de crédito e devem ser criadas diretamente.

---

### CT07 - Análise de Crédito: Financiamento Aprovado (Score > 700)

#### Objetivo
Validar a aprovação automática do financiamento quando o CPF do cliente retorna um Score de crédito maior que 700.

#### Pré-Condições
- O usuário está na página de Checkout/Pedido.
- O sistema mock ou a API de crédito está configurado para retornar um Score de 750 para o CPF utilizado.
- Valor total do carro é R$ 40.000 e valor da entrada inserida é R$ 0.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário com dados válidos e um CPF que possua Score > 700 | Dados validados corretamente. |
| 2  | Selecionar a opção de pagamento "Financiamento" | O sistema exibe os campos de simulação de financiamento (Entrada e parcelas). |
| 3  | Confirmar o envio do pedido | O sistema aciona a integração de análise de crédito. |
| 4  | Aguardar a resposta da API | A API retorna Score 750. O pedido é classificado como "APROVADO". O usuário é redirecionado para a tela de sucesso. |

#### Resultados Esperados
- O sistema processa corretamente a resposta da API.
- O status interno (e exibido posteriormente) é "APROVADO".

#### Critérios de Aceitação
- Regra de negócio respeitada: Score > 700 resulta em aprovação.

---

### CT08 - Análise de Crédito: Financiamento Em Análise (Score 501 a 700)

#### Objetivo
Verificar o comportamento do sistema quando o score de crédito cai na faixa intermediária (501 a 700), necessitando análise manual.

#### Pré-Condições
- O usuário está no Checkout.
- A API de crédito retorna um Score de 600 para o CPF.
- Entrada menor que 50% do valor do carro.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados válidos (CPF com Score 600) e selecionar "Financiamento" | Formulário preenchido sem erros. |
| 2  | Inserir R$ 10.000 de entrada (25% do valor total de R$ 40.000) | O sistema calcula o valor financiado e as 12 parcelas com 2% de juros ao mês sobre os R$ 30.000 restantes. |
| 3  | Confirmar Pedido | A API de crédito é consultada, retornando Score 600. |

#### Resultados Esperados
- O pedido é gerado com sucesso, mas com o status "EM_ANALISE".
- O usuário é redirecionado para a página de sucesso, informando que o pedido está sob análise.

#### Critérios de Aceitação
- Regra respeitada: Score 501 a 700 resulta no status EM_ANALISE (quando entrada < 50%).
- O cálculo da parcela deve refletir: `((Total - Entrada) / 12) * 1.02`.

---

### CT09 - Análise de Crédito: Financiamento Reprovado (Score <= 500)

#### Objetivo
Garantir que financiamentos para clientes com score muito baixo sejam reprovados automaticamente.

#### Pré-Condições
- O usuário está no Checkout.
- A API de crédito retorna um Score de 400 para o CPF.
- Entrada menor que 50% do valor do carro.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados válidos (CPF com Score 400) e selecionar "Financiamento" | Formulário preenchido sem erros. |
| 2  | Inserir R$ 0 de entrada e confirmar o pedido | O sistema envia a requisição para a análise de crédito. |
| 3  | Aguardar o processamento | A API retorna Score 400. O sistema gera o pedido com status "REPROVADO". |

#### Resultados Esperados
- O pedido é registrado no sistema, porém classificado como "REPROVADO".
- O usuário é informado do status e a jornada de compra não é prosseguida como venda concluída.

#### Critérios de Aceitação
- Regra respeitada: Score <= 500 resulta em status REPROVADO.

---

### CT10 - Análise de Crédito: Exceção de Aprovação por Entrada >= 50%

#### Objetivo
Validar a exceção à regra de crédito: se o cliente der entrada de 50% ou mais, o pedido é aprovado mesmo se o score for baixo.

#### Pré-Condições
- O usuário está no Checkout. O valor total configurado do carro é R$ 40.000.
- A API de crédito retorna Score 400 (que normalmente seria reprovado).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário (CPF com Score 400) e selecionar "Financiamento" | Campos válidos preenchidos. |
| 2  | Preencher o campo "Valor da Entrada" com R$ 20.000 (exatamente 50% de R$ 40.000) | Os cálculos de parcelamento são atualizados. |
| 3  | Confirmar o pedido | A API de crédito é consultada e retorna 400, mas a regra de exceção é ativada. |

#### Resultados Esperados
- O pedido é criado com status "APROVADO", ignorando o score baixo.
- O redirecionamento para a página de Sucesso ocorre normalmente.

#### Critérios de Aceitação
- Regra de negócio "Entrada >= 50% aprova automaticamente" deve sobressair às regras de Score < 700.

---

### CT11 - Consulta de Pedido com Número Válido

#### Objetivo
Validar se o usuário consegue consultar o status e detalhes de um pedido existente informando o número gerado.

#### Pré-Condições
- Um pedido válido foi criado e o usuário possui o código (ex: `VLO-ABCD10`).
- O usuário está na página de Consulta de Pedidos (`/lookup` ou similar).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página de Consultar Pedido | A interface exibe um campo para inserir o número do pedido. |
| 2  | Inserir o código do pedido válido e clicar em "Buscar Pedido" | O sistema realiza a busca no banco de dados. |
| 3  | Visualizar a interface após a busca | O sistema exibe um card com os detalhes do carro, valor total, status (Aprovado/Reprovado/Análise) e dados do cliente. |

#### Resultados Esperados
- Os dados exibidos batem exatamente com as configurações e informações fornecidas durante o Checkout.

#### Critérios de Aceitação
- O sistema não deve listar pedidos de outros usuários ou expor dados sem o número exato do pedido (Segurança de Dados).

---

### CT12 - Consulta de Pedido com Número Inválido ou Inexistente

#### Objetivo
Garantir que a busca com código incorreto exiba a devida mensagem de feedback e não quebre a interface.

#### Pré-Condições
- O usuário está na página de Consulta de Pedidos.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Inserir um código de pedido que não existe (ex: `VLO-INEXISTENTE`) | O campo aceita a entrada. |
| 2  | Clicar em "Buscar Pedido" | O sistema processa a requisição e retorna um erro de não encontrado. |
| 3  | Visualizar feedback na tela | Um aviso de "Pedido não encontrado" é exibido. Nenhum dado sensível é revelado. |

#### Resultados Esperados
- O sistema lida com o estado de erro graciosamente.

#### Critérios de Aceitação
- Respeitar a privacidade dos dados, informando apenas que o pedido correspondente ao código digitado não foi localizado.

---

### CT13 - Acesso não Autorizado / Botão Desabilitado na Consulta

#### Objetivo
Verificar se a busca é bloqueada quando o usuário não fornece nenhum número de pedido.

#### Pré-Condições
- O usuário está na página de Consulta de Pedidos.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Manter o campo de "Número do Pedido" totalmente vazio ou contendo apenas espaços | - |
| 2  | Tentar clicar no botão "Buscar Pedido" | O botão está desabilitado, impedindo a requisição vazia. |

#### Resultados Esperados
- O sistema impede interações nulas com a API.

#### Critérios de Aceitação
- O estado de ativação do botão deve depender de o campo de input possuir texto (trim() > 0).
