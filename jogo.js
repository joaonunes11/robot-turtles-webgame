"use strict"
var dimensaoTabuleiro;
var tabuleiro;
var jogadoresArray;
var nParedes;
var numJogadas;

function main(){
    let registoNovo = document.getElementById("registar");
    registoNovo.onclick = function () {
        localStorage.setItem(document.getElementById("nome").value,JSON.stringify([document.getElementById("passwordRegist").value,document.getElementById("email").value]))

    }

    let loginNovo = document.getElementById("login");
    loginNovo.onclick = function () {
        let loginUsername= document.getElementById("username").value //username inserido no login
        let loginPassword=document.getElementById("password").value //password inserido no login
        let buscaListas=JSON.parse(localStorage.getItem(loginUsername))
        if (buscaListas!=null && loginPassword == buscaListas[0]) {
          tabuleiro = [];
          var dimensaoTabuleiroPrevious = document.getElementById("tamTabuleiro")
          var dimensaoTabuleiro = dimensaoTabuleiroPrevious.value
          jogadoresArray = [];
          numJogadas = 0 -1;
          if (tabuleiro.length !== 0){
             tabuleiro.splice(0,tabuleiro.length)
          }
          criarTabuleiro(dimensaoTabuleiro);
          let jogadores = document.getElementById("nJogadores");
          var nJog = jogadores.value
          nParedes = Math.random()*(6) + 2;
          let meio = tabuleiro.length / 2;
          colocarPecas(meio, meio, tabuleiro, 'J');
          colocarPecas(meio, meio - 1, tabuleiro, 'J');
          colocarPecas(meio - 1, meio, tabuleiro, 'J');
          colocarPecas(meio - 1, meio - 1, tabuleiro, 'J');
          inserirJogadores(nJog, tabuleiro,jogadoresArray);
          paredesPedra(nParedes);
          printTabuleiro(tabuleiro);
        }
        else {
            passErrada()
        }
    }

    let esquerda = document.getElementById("esquerda");
    esquerda.onclick = function () {
        document.getElementById("bug").disabled = false;
        numJogadas += 1;
        let jogador = jogadoresArray[jogadas(jogadoresArray, numJogadas)];
        jogador.antDirecao = jogador.direcao;
        if (jogador["direcao"] === "c") {
            jogador["direcao"] = "e"
        }
        else if (jogador["direcao"] === "e") {
            jogador["direcao"] = "b"
        }
        else if (jogador["direcao"] === "b") {
            jogador["direcao"] = "d"
        }
        else if (jogador["direcao"] === "d") {
            jogador["direcao"] = "c"
        }
        colocarPecas(jogador["linha"],jogador["coluna"],tabuleiro,jogador);
        printTabuleiro(tabuleiro);
    }

    let direita = document.getElementById("direita");
    direita.onclick = function () {
        document.getElementById("bug").disabled = false;
        numJogadas += 1;
        let jogador = jogadoresArray[jogadas(jogadoresArray, numJogadas)];
        jogador.antDirecao = jogador.direcao;
        if (jogador["direcao"] === "c") {
            jogador["direcao"] = "d"
        }
        else if (jogador["direcao"] === "d") {
            jogador["direcao"] = "b"
        }
        else if (jogador["direcao"] === "b") {
            jogador["direcao"] = "e"
        }
        else if (jogador["direcao"] === "e") {
            jogador["direcao"] = "c"
        }
        let bug = document.getElementById("bug");
        bug.disabled = false;
        colocarPecas(jogador["linha"], jogador["coluna"], tabuleiro, jogador)
        printTabuleiro(tabuleiro);
    }

    let andar = document.getElementById("andar");
    andar.onclick = function(){
        document.getElementById("bug").disabled = false;
        numJogadas += 1;
        let jogador = jogadoresArray[jogadas(jogadoresArray, numJogadas)];
        jogador.antLinha = jogador.linha;
        jogador.antColuna = jogador.coluna;
        jogador.antDirecao = jogador.direcao;
        if (jogador["direcao"] === "c") {
            if (jogador.linha - 1 < 0) {
                numJogadas -= 1;
                document.getElementById("jogo").innerHTML = "<embed src='erro.mp3' loop='1' hidden='true' autostart='true'></embed>";
                aviso();
            }
            else {
                if (tabuleiro[jogador.linha - 1][jogador.coluna] != 0 &&
                    tabuleiro[jogador.linha - 1][jogador.coluna] !== "J") {
                    numJogadas -= 1;
                    document.getElementById("jogo").innerHTML = "<embed src='erro.mp3' loop='1' hidden='true' autostart='true'></embed>";
                    aviso();
                }
                else if (tabuleiro[jogador.linha - 1][jogador.coluna] === "J") {
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, 0);
                    jogador.linha -= 1;
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, jogador);
                    jogadoresArray.splice(jogadoresArray.indexOf(jogador), 1);
                    ganhar()
                }
                else {
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, 0);
                    jogador.linha -= 1;
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, jogador);
                }
            }
        }
        else if (jogador["direcao"] === "b") {
            if (jogador.linha + 1 > tabuleiro.length - 1) {
                numJogadas -= 1;
                document.getElementById("jogo").innerHTML = "<embed src='erro.mp3' loop='1' hidden='true' autostart='true'></embed>";
                aviso();
            }
            else {
                if (tabuleiro[jogador.linha + 1][jogador.coluna] != 0 &&
                    tabuleiro[jogador.linha + 1][jogador.coluna] !== "J") {
                    numJogadas -= 1;
                    document.getElementById("jogo").innerHTML = "<embed src='erro.mp3' loop='1' hidden='true' autostart='true'></embed>";
                    aviso();
                }
                else if (tabuleiro[jogador.linha + 1][jogador.coluna] === "J") {
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, 0);
                    jogador.linha += 1;
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, jogador);
                    jogadoresArray.splice(jogadoresArray.indexOf(jogador), 1);
                    ganhar()
                }
                else {
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, 0);
                    jogador.linha += 1;
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, jogador);
                }
            }
        }
        else if (jogador["direcao"] === "e") {
            if (jogador.coluna - 1 < 0) {
                numJogadas -= 1;
                document.getElementById("jogo").innerHTML = "<embed src='erro.mp3' loop='1' hidden='true' autostart='true'></embed>";
                aviso();
            }
            else {
                if (tabuleiro[jogador.linha][jogador.coluna - 1] != 0 &&
                    tabuleiro[jogador.linha][jogador.coluna - 1] !== "J") {
                    numJogadas -= 1;
                    document.getElementById("jogo").innerHTML = "<embed src='erro.mp3' loop='1' hidden='true' autostart='true'></embed>";
                    aviso();
                }
                else if (tabuleiro[jogador.linha][jogador.coluna - 1] === "J") {
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, 0);
                    jogador.coluna -= 1;
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, jogador);
                    jogadoresArray.splice(jogadoresArray.indexOf(jogador), 1);
                    ganhar()
                }
                else {
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, 0);
                    jogador.coluna -= 1;
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, jogador);
                }
            }
        }
        else if (jogador["direcao"] === "d") {
            if (jogador.coluna + 1 > tabuleiro.length - 1) {
                numJogadas -= 1;
                document.getElementById("jogo").innerHTML = "<embed src='erro.mp3' loop='1' hidden='true' autostart='true'></embed>";
                aviso();
            }
            else {
                if (tabuleiro[jogador.linha][jogador.coluna + 1] != 0 &&
                    tabuleiro[jogador.linha][jogador.coluna + 1] !== "J") {
                    numJogadas -= 1;
                    document.getElementById("jogo").innerHTML="<embed src='erro.mp3' loop='1' hidden='true' autostart='true'></embed>";
                    aviso();
                }
                else if (tabuleiro[jogador.linha][jogador.coluna + 1] === "J") {
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, 0);
                    jogador.coluna += 1;
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, jogador);
                    jogadoresArray.splice(jogadoresArray.indexOf(jogador), 1);
                    ganhar()
                }
                else {
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, 0);
                    jogador.coluna += 1;
                    colocarPecas(jogador.linha, jogador.coluna, tabuleiro, jogador);
                }
            }
        }
        printTabuleiro(tabuleiro);
    }

    let bug = document.getElementById("bug");
    bug.onclick = function () {
        let jogador = jogadoresArray[jogadas(jogadoresArray, numJogadas)];
        if (jogador.linha !== jogador.antLinha || jogador.coluna !== jogador.antColuna) {
            if(jogador.direcao==jogador.antDirecao){
                colocarPecas(jogador.linha, jogador.coluna, tabuleiro, 0);
                jogador.linha = jogador.antLinha;
                jogador.coluna = jogador.antColuna;
                colocarPecas(jogador.linha, jogador.coluna, tabuleiro, jogador); 
                
            }
            else {
                jogador.antLinha = jogador.linha;
                jogador.antColuna = jogador.coluna;
                jogador.direcao = jogador.antDirecao;
            }
        }
        else{
            jogador.direcao = jogador.antDirecao;
        }
        bug.disabled = true;    
        numJogadas -=1;
        printTabuleiro(tabuleiro);
    }

}



function colocarPecas(x, y, tabuleiro, peca) {
    tabuleiro[x][y] = peca;
}

function criarTabuleiro(dimensaoTabuleiro){
    for (var i = 0; i < dimensaoTabuleiro; i++) { //linhas
        tabuleiro.push([]);
        for (var j = 0; j < dimensaoTabuleiro; j++) { //colunas
            tabuleiro[i].push(0);
        }
    }
}


function paredesPedra(nParedes) {
    for (let index = 0; index < nParedes; index++) {
        let x = Math.floor((Math.random() * tabuleiro.length));
        let y = Math.floor((Math.random() * tabuleiro.length));
        while (tabuleiro[x][y] !== 0) {
            x = Math.floor((Math.random() * tabuleiro.length));
            y = Math.floor((Math.random() * tabuleiro.length));
        }
        colocarPecas(x, y, tabuleiro, 'P')
  }
}

function printTabuleiro(tabuleiro){
    let jogo = document.getElementById("jogo")
    if (jogo.value=="1") {
        let jogo = document.getElementById("jogo")
        let table = document.createElement("table");
        let tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
        for (let i = 0; i < tabuleiro.length; i++) {
            let tr = document.createElement("tr");
            tableBody.appendChild(tr);

            for (let j = 0; j < tabuleiro.length; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                td.id = i.toString() + j.toString();
                if (tabuleiro[i][j] === 0) {
                    let tab = document.createElement("img");
                    tab.style.width = "100%";
                    tab.src = "Imagens/tabuleiro.jpg";
                    td.appendChild(tab);
                }
                else if (tabuleiro[i][j].numeroJogador === "J1") {
                    let jog1Img = document.createElement("img");
                    jog1Img.style.width = "100%";
                    jog1Img.src = "Imagens/jog1.png";
                    switch (tabuleiro[i][j].direcao) {
                        case "b":
                            td.appendChild(jog1Img);
                            break;

                        case "d":
                            jog1Img.style.transform = "rotate(90deg)";
                            td.appendChild(jog1Img);
                            break;

                        case "e":
                            jog1Img.style.transform = "rotate(270deg)";
                            td.appendChild(jog1Img);
                            break;

                        case "c":
                            jog1Img.style.transform = "rotate(180deg)";
                            td.appendChild(jog1Img);
                            break;
                    }
                }
                else if (tabuleiro[i][j].numeroJogador === "J2") {
                    let jog2Img = document.createElement("img");
                    jog2Img.style.width = "100%";
                    jog2Img.src = "Imagens/jog2.png";
                    switch (tabuleiro[i][j].direcao) {
                        case "c":
                            td.appendChild(jog2Img);
                            break;

                        case "d":
                            jog2Img.style.transform = "rotate(90deg)";
                            td.appendChild(jog2Img);
                            break;

                        case "e":
                            jog2Img.style.transform = "rotate(270deg)";
                            td.appendChild(jog2Img);
                            break;

                        case "b":
                            jog2Img.style.transform = "rotate(180deg)";
                            td.appendChild(jog2Img);
                            break;
                    }
                }
                else if (tabuleiro[i][j].numeroJogador === "J3") {
                    let jog3Img = document.createElement("img");
                    jog3Img.style.width = "100%";
                    jog3Img.src = "Imagens/jog3.png";
                    switch (tabuleiro[i][j].direcao) {
                        case "b":
                            td.appendChild(jog3Img);
                            break;

                        case "d":
                            jog3Img.style.transform = "rotate(90deg)";
                            td.appendChild(jog3Img);
                            break;

                        case "e":
                            jog3Img.style.transform = "rotate(270deg)";
                            td.appendChild(jog3Img);
                            break;

                        case "c":
                            jog3Img.style.transform = "rotate(180deg)";
                            td.appendChild(jog3Img);
                            break;
                    }
                }
                else if (tabuleiro[i][j].numeroJogador === "J4") {
                    let jog4Img = document.createElement("img");
                    jog4Img.style.width = "100%";
                    jog4Img.src = "Imagens/jog4.png";
                    switch (tabuleiro[i][j].direcao) {
                        case "c":
                            td.appendChild(jog4Img);
                            break;

                        case "d":
                            jog4Img.style.transform = "rotate(90deg)";
                            td.appendChild(jog4Img);
                            break;

                        case "e":
                            jog4Img.style.transform = "rotate(270deg)";
                            td.appendChild(jog4Img);
                            break;

                        case "b":
                            jog4Img.style.transform = "rotate(180deg)";
                            td.appendChild(jog4Img);
                            break;
                    }
                }
                else if (tabuleiro[i][j]==="J"){
                    let joias = document.createElement("img");
                    joias.style.width = "100%";
                    joias.src = "Imagens/joia.png";
                    td.appendChild(joias);
                }
                else if (tabuleiro[i][j] === "P"){
                    let pPedra = document.createElement("img");
                    pPedra.style.width = "100%";
                    pPedra.src = "Imagens/pedra.png";
                    td.appendChild(pPedra);
                }

            }
        }
        table.style.maxWidth ="60%"
        table.classList.add("w3-responsive");
        jogo.appendChild(table);
        jogo.value="2"
    }
    else{

        jogo.removeChild(jogo.childNodes[0])
        let jogo2 = document.getElementById("jogo")
        let table2 = document.createElement("table");
        let tableBody2 = document.createElement("tbody");
        table2.appendChild(tableBody2);
        for (let i = 0; i < tabuleiro.length; i++) {
            let tr2 = document.createElement("tr");
            tableBody2.appendChild(tr2);

            for (let j = 0; j < tabuleiro.length; j++) {
                let td = document.createElement("td");
                tr2.appendChild(td);
                td.id = i.toString() + j.toString();
                if (tabuleiro[i][j] === 0) {
                    let tab = document.createElement("img");
                    tab.style.width = "100%";
                    tab.src = "Imagens/tabuleiro.jpg";
                    td.appendChild(tab);
                }
                else if (tabuleiro[i][j].numeroJogador === "J1") {
                    let jog1Img = document.createElement("img");
                    jog1Img.style.width = "100%";
                    jog1Img.src = "Imagens/jog1.png";
                    switch (tabuleiro[i][j].direcao) {
                        case "b":
                            td.appendChild(jog1Img);
                            break;

                        case "d":
                            jog1Img.style.transform = "rotate(270deg)";
                            td.appendChild(jog1Img);
                            break;

                        case "e":
                            jog1Img.style.transform = "rotate(90deg)";
                            td.appendChild(jog1Img);
                            break;

                        case "c":
                            jog1Img.style.transform = "rotate(180deg)";
                            td.appendChild(jog1Img);
                            break;
                    }
                }
                else if (tabuleiro[i][j].numeroJogador === "J2") {
                    let jog2Img = document.createElement("img");
                    jog2Img.style.width = "100%";
                    jog2Img.src = "Imagens/jog2.png";
                    switch (tabuleiro[i][j].direcao) {
                        case "c":
                            td.appendChild(jog2Img);
                            break;

                        case "d":
                            jog2Img.style.transform = "rotate(90deg)";
                            td.appendChild(jog2Img);
                            break;

                        case "e":
                            jog2Img.style.transform = "rotate(270deg)";
                            td.appendChild(jog2Img);
                            break;

                        case "b":
                            jog2Img.style.transform = "rotate(180deg)";
                            td.appendChild(jog2Img);
                            break;
                    }
                }
                else if (tabuleiro[i][j].numeroJogador === "J3") {
                    let jog3Img = document.createElement("img");
                    jog3Img.style.width = "100%";
                    jog3Img.src = "Imagens/jog3.png";
                    switch (tabuleiro[i][j].direcao) {
                        case "b":
                            td.appendChild(jog3Img);
                            break;

                        case "d":
                            jog3Img.style.transform = "rotate(270deg)";
                            td.appendChild(jog3Img);
                            break;

                        case "e":
                            jog3Img.style.transform = "rotate(90deg)";
                            td.appendChild(jog3Img);
                            break;

                        case "c":
                            jog3Img.style.transform = "rotate(180deg)";
                            td.appendChild(jog3Img);
                            break;
                    }
                }
                else if (tabuleiro[i][j].numeroJogador === "J4") {
                    let jog4Img = document.createElement("img");
                    jog4Img.style.width = "100%";
                    jog4Img.src = "Imagens/jog4.png";
                    switch (tabuleiro[i][j].direcao) {
                        case "c":
                            td.appendChild(jog4Img);
                            break;

                        case "d":
                            jog4Img.style.transform = "rotate(90deg)";
                            td.appendChild(jog4Img);
                            break;

                        case "e":
                            jog4Img.style.transform = "rotate(270deg)";
                            td.appendChild(jog4Img);
                            break;

                        case "b":
                            jog4Img.style.transform = "rotate(180deg)";
                            td.appendChild(jog4Img);
                            break;
                    }
                }
                else if (tabuleiro[i][j] === "J") {
                    let joias = document.createElement("img");
                    joias.style.width = "100%";
                    joias.src = "Imagens/joia.png";
                    td.appendChild(joias);
                }
                else if (tabuleiro[i][j] === "P") {
                    let pPedra = document.createElement("img");
                    pPedra.style.width = "100%";
                    pPedra.src = "Imagens/pedra.png";
                    td.appendChild(pPedra);
                }
            }
        }
        table2.style.maxWidth="60%"
        table2.classList.add("w3-responsive")
        jogo2.appendChild(table2);
    }
}



function inserirJogadores(nJogadores, tabuleiro,jogadoresArray) {
    if (nJogadores === '1') {
        var J1 = {
            numeroJogador: "J1",
            direcao: "b",
            linha: 0,
            coluna: 0,
            antDirecao: "b",
            antLinha: 0,
            antColuna: 0
        }
        colocarPecas(J1.linha, J1.coluna, tabuleiro, J1); //Alterar para J1
        jogadoresArray.push(J1);
    }
    else if (nJogadores === '2') {
        var J1 = {
            numeroJogador: "J1",
            direcao: "b",
            linha: 0,
            coluna: 0,
            antDirecao: "b",
            antLinha: 0,
            antColuna: 0

        }
        var J2 = {
            numeroJogador: "J2",
            direcao: "c",
            linha: tabuleiro.length - 1,
            coluna: tabuleiro.length - 1,
            antDirecao: "c",
            antLinha: tabuleiro.length - 1,
            antColuna: tabuleiro.length - 1
        }
        colocarPecas(0, 0, tabuleiro, J1);
        colocarPecas(J2.linha, J2.coluna, tabuleiro, J2);
        jogadoresArray.push(J1);
        jogadoresArray.push(J2);
    }
    else if (nJogadores === '3') {
        var J1 = {
            numeroJogador: "J1",
            direcao: "b",
            linha: 0,
            coluna: 0,
            antDirecao: "b",
            antLinha: 0,
            antColuna: 0
        }
        var J2 = {
            numeroJogador: "J2",
            direcao: "c",
            linha: tabuleiro.length - 1,
            coluna: tabuleiro.length - 1,
            antDirecao: "c",
            antLinha: tabuleiro.length - 1,
            antColuna: tabuleiro.length - 1
        }
        var J3 = {
            numeroJogador: "J3",
            direcao: "b",
            linha: 0,
            coluna: tabuleiro.length - 1,
            antDirecao: "b",
            antLinha: 0,
            antColuna: tabuleiro.length - 1
        }
        colocarPecas(0, 0, tabuleiro, J1);
        colocarPecas(J2.linha, J2.coluna, tabuleiro, J2);
        colocarPecas(J3.linha, J3.coluna, tabuleiro, J3);
        jogadoresArray.push(J1);
        jogadoresArray.push(J3);
        jogadoresArray.push(J2);
    }
    else if (nJogadores === '4') {
        var J1 = {
            numeroJogador: "J1",
            direcao: "b",
            linha: 0,
            coluna: 0,
            antDirecao: "b",
            antLinha: 0,
            antColuna: 0
        }
        var J2 = {
            numeroJogador: "J2",
            direcao: "c",
            linha: tabuleiro.length - 1,
            coluna: tabuleiro.length - 1,
            antDirecao: "c",
            antLinha: tabuleiro.length - 1,
            antColuna: tabuleiro.length - 1
        }
        var J3 = {
            numeroJogador: "J3",
            direcao: "b",
            linha: 0,
            coluna: tabuleiro.length - 1,
            antDirecao: "b",
            antLinha: 0,
            antColuna: tabuleiro.length - 1
        }
        var J4 = {
            numeroJogador: "J4",
            direcao: "c",
            linha: tabuleiro.length - 1,
            coluna: 0,
            antDirecao: "c",
            antLinha: tabuleiro.length - 1,
            antColuna: 0
        }
        colocarPecas(0, 0, tabuleiro, J1);
        colocarPecas(J2.linha, J2.coluna, tabuleiro, J2);
        colocarPecas(J3.linha, J3.coluna, tabuleiro, J3);
        colocarPecas(J4.linha, J4.coluna, tabuleiro, J4);
        jogadoresArray.push(J1);
        jogadoresArray.push(J3);
        jogadoresArray.push(J2);
        jogadoresArray.push(J4);
    }
}


function jogadas(jogadoresArray,jogadas) {
    let numJogadores = jogadoresArray.length;
    let jogador = jogadas % numJogadores;
    return jogador
}

function aviso(){
    let cartas = document.getElementById("cartas");
    let h3Aviso = document.createElement("h3");
    h3Aviso.textContent = "Jogada Inválida";
    h3Aviso.classList.add("w3-red");
    h3Aviso.classList.add("w3-padding");
    h3Aviso.setAttribute("id","aviso");
    cartas.appendChild(h3Aviso);
    $("#aviso").delay(2000).fadeOut();
    let audio = document.createElement("audio");
    audio.src = "erro.mp3";
    audio.play();

}

function passErrada(){
    let erroPass = document.getElementById("erroPasswords");
    let h6Aviso = document.createElement("h6");
    h6Aviso.textContent = "Username ou password errados";
    h6Aviso.classList.add("w3-red");
    h6Aviso.classList.add("w3-padding");
    h6Aviso.setAttribute("id","avisoErro");
    erroPass.appendChild(h6Aviso);
    $("#avisoErro").delay(2000).fadeOut();
}

function ganhar(){
    let avisoGanhou = document.getElementById("ganhou");
    let h3Aviso = document.createElement("h3");
    h3Aviso.textContent = "Parabéns! Apanhas-te a jóia!";
    h3Aviso.classList.add("w3-green");
    h3Aviso.classList.add("w3-padding");
    h3Aviso.setAttribute("id","avisoGanhar");
    avisoGanhou.appendChild(h3Aviso);
    $("#avisoGanhar").delay(2000).fadeOut();
    let audio = document.createElement("audio");
    audio.src = "ganhar.mp3";
    audio.play();
}

document.addEventListener("DOMContentLoaded", function (event) { main() });
