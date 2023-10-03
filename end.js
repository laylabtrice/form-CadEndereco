'use strict'; //Modo "Restrito"
//Consumindo API de CEP, ViaCep
// https://viacep.com.br/

//Limpa o Form (do CEP pra baixo)
const limparFormulario = () =>{
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//Preenche os campos relacionados ao CEP
const preencherForumulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

//Verifica se o CEP é válido
const eNumero = (numero) => /^[0-9]+$/.test(numero); //Expressão Regular
// É possível testar e entender a RegEx em https://www.regexpal.com/
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
'use strict'; //Strict mode

//Consumindo API via CEP
const pesquisarCep = async() => {
    limparFormulario();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
    
    if(cepValido(cep.value)){
        const dados = await fetch(url); //await = esperar = fetch = promessa
        const addres = await dados.json(); // retorna no formato JSON
        
        // hasOwnProperty  retorna um booleano indicando se o objeto possui a propriedade especificada como uma propriedade definida no próprio objeto em questão
        if(addres.hasOwnProperty('erro')){ 
            // document.getElementById('rua').value = 'CEP não encontrado!';
            alert('CEP não encontrado!');
        }else {
            preencherForumulario(addres);
        }
    }else{
        // document.getElementById('rua').value = 'CEP incorreto!';
        alert('CEP incorreto!');
    } 
}

//Adicionando evento DOM, no input CEP
document.getElementById('cep').addEventListener('focusout', pesquisarCep);