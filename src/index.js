//Iniciei o código importando o módulo readline-sync, que permite a interação com o usuário por meio de perguntas e respostas no terminal.
const readline = require('readline-sync');


//Esta é a função principal nela eu, cumprimento o usuário e informo sobre os serviços disponíveis no restaurante.
function restauranteDeliciasExpress() {
    console.log("Bem-vindo ao Restaurante Delícias Express!");

    console.log('\n--------------------------------------------');


// solicita ao usuário que informe seu nome. Uma vez que o nome é fornecido, agradeço e informo que um atendente irá assisti-lo em breve.
function nomeCliente() {
    console.log('Como posso ajudá-lo hoje?!');
    const nome = readline.question('Por favor, informe seu nome: ');
    console.log(`Olá, ${nome}, um atendente irá lhe atender em breve.`);
    return nome;
}

    const cliente = nomeCliente();

    console.log('\n--------------------------------------------');

    console.log("O garçom João irá te atender hoje, agora.");

    console.log('\n--------------------------------------------');

//Pergunto ao usuário se ele gostaria de solicitar uma mesa. Se a resposta for afirmativa, questiono se o cliente possui uma reserva. 
//Dependendo da resposta */Se houver reserva, solicito o número da mesa reservada e confirmo a alocação.*/
//Se não houver reserva, busco uma mesa disponível, questionando quantas pessoas estão na mesa e verificando se o número não excede dez.
    let solicitarMesa = readline.question("Gostaria de solicitar uma mesa? (sim/nao): ").toLowerCase();

    if (solicitarMesa === 'sim') {
        let temReserva = readline.question("Voce tem uma reserva? (sim/nao): ").toLowerCase();
        
        if (temReserva === 'sim') {
            const numeroMesaReservada = readline.questionInt('Por favor, informe o numero da sua mesa reservada: ');
            console.log(`Perfeito, ${cliente}! Sua mesa é a número ${numeroMesaReservada}. Vamos acompanhá-lo.`);
        } else {
            console.log('Buscando uma mesa disponivel...');
            const numeroPessoas = readline.questionInt("Quantas pessoas estao na mesa? ");
            if (numeroPessoas > 10) {
                console.log("Desculpe, não podemos acomodar mais de 10 pessoas por mesa.");
                return;
            }
            console.log("Encontramos uma mesa disponível para você. Por favor, siga-me até a mesa.");
        }
//Pergunto se o cliente já fez seu pedido. Enquanto a resposta for negativa, incentivo-o a fazer o pedido. Uma vez que o pedido é realizado,
// informo que ele foi recebido e será preparado.
        let fezPedido = readline.question("Voce ja fez seu pedido? (sim/nao): ").toLowerCase();
        while (fezPedido !== 'sim') {
            console.log("Tudo bem, faça o pedido quando estiver pronto.");
            fezPedido = readline.question("Gostaria de solicitar seupedido agora? (sim/nao): ").toLowerCase();
        }

        console.log("Ótimo! Seu pedido foi recebido e será preparado.");

    }
    const numeroPessoas = quantidadePessoas();

    const totalConta = valorConta();

    calcularPagamento(totalConta, numeroPessoas);
}

//A função quantidadePessoas é responsável por validar a entrada do número de pessoas que estarão na mesa, 
//garantindo que o valor seja um número inteiro positivo.
function quantidadePessoas() {
    let numeroPessoas;
    while (true) {
        numeroPessoas = parseInt(readline.question('Digite o numero de pessoas que estao na mesa: '));
        if (!isNaN(numeroPessoas) && numeroPessoas > 0) {
            break;
        }

        console.log('Por favor, insira um numero valido de pessoas');
    }
    return numeroPessoas;
}


//A função valorConta permite ao usuário inserir o valor total da conta, realizando validações para garantir que o valor 
//seja um número válido e maior ou igual a zero.
function valorConta() {
    let totalConta;
    while (true) {
        totalConta = parseFloat(readline.question('Digite o valor total da conta: R$'));
        if (!isNaN(totalConta) && totalConta >= 0) {
            break;
        }
        console.log('Valor total não pode ser R$ 0,00 \nPor favor, insira um valor válido.');
    }
    return totalConta;
}


//A função calcularPagamento apresenta ao usuário quatro opções de método de pagamento: PIX, Dinheiro, Cartão à vista 
//e Cartão parcelado. Dependendo da escolha, o programa chama a função correspondente para calcular o valor total da conta 
//após aplicar os descontos ou taxas específicas.
function calcularPagamento(valorTotal, numeroPessoas) {
    console.log('Escolha o metodo de pagamento:');
    console.log('1. PIX');
    console.log('2. Dinheiro');
    console.log('3. Cartao a vista');
    console.log('4. Cartao parcelado');
    const metodoPagamento = readline.questionInt('Digite o numero correspondente ao metodo de pagamento: ');

    let valorFinal;

    if (metodoPagamento === 1) {
        valorFinal = valorPix(valorTotal, numeroPessoas);
    } else if (metodoPagamento === 2) {
        valorFinal = valorDinheiro(valorTotal, numeroPessoas);
    } else if (metodoPagamento === 3) {
        valorFinal = valorCartao(valorTotal, numeroPessoas);
    } else if (metodoPagamento === 4) {
        valorFinal = valorCartaoParcelado(valorTotal, numeroPessoas);
    } else {
        console.log("Método de pagamento inválido.");
        return;
    }

    console.log(`O valor total da conta é: R$ ${valorFinal.toFixed(2)}`);
    console.log(`Cada pessoa deve pagar: R$ ${(valorFinal / numeroPessoas).toFixed(2)}`);
}


//Cada função responsável pelo método de pagamento (valorPix, valorDinheiro, valorCartao, valorCartaoParcelado)
//calcula o valor total da conta com base no método escolhido, informando o valor final e a divisão desse valor
//pelo número de pessoas que estão na mesa.
function valorPix(totalConta, numeroPessoas) {
    const valor = totalConta * 0.9; // Aplicando o desconto
    console.log(`Pagamento em PIX: R$ ${valor.toFixed(2)}`);
    return valor;
}

function valorDinheiro(totalConta, numeroPessoas) {
    const valor = totalConta * 0.9; // Aplicando o desconto
    console.log(`Pagamento em dinheiro: R$ ${valor.toFixed(2)}`);
    return valor;
}

function valorCartao(totalConta, numeroPessoas) {
    const valor = totalConta * 0.98; // Aplicando o desconto
    console.log(`Pagamento em cartão: R$ ${valor.toFixed(2)}`);
    return valor;
}

function valorCartaoParcelado(totalConta, numeroPessoas) {
    let cartaoParcelado = readline.question("Você deseja pagar à vista ou parcelado? (vista/parcelado): ").toLowerCase();
    const valor = totalConta * 1.05; // Aplicando a taxa para parcelado
    console.log(`Pagamento em cartão parcelado: R$ ${valor.toFixed(2)}`);
    return valor;
}

restauranteDeliciasExpress();

//Após os cálculos, o programa apresenta o valor total da conta e o valor que cada pessoa deve pagar, proporcionando uma experiência
//interativa e informativa ao cliente do restaurante.





