"use strict"
$(document).ready(function(){
  $("#formsNovos").hide()
  $("#esquerda").hide()
  $("#direita").hide()
  $("#andar").hide()
  $("#bug").hide()
  $("#tabelaPont").hide()
  //$("#nJogadores").hide()

  $("#novoJogo").click(function(){
    $("#formsNovos").show()
  //  $("#nJogadores").show()
  });

  $("#formButton2").click(function(){
    $("#afterClickLogin").toggle();

  });
  $("#registar").click(function(){
    $('#login-form').show()
    $("#register-form").hide()
    $("#registarFake").hide()
  })
  $("#login").click(function(){
    let loginUsername= document.getElementById("username").value //username inserido no login
    let loginPassword=document.getElementById("password").value //password inserido no login
    let buscaListas=JSON.parse(localStorage.getItem(loginUsername))
    if (buscaListas!=null && loginPassword == buscaListas[0]) {
    //  $("#nJogadores").hide()
      $("#formsNovos").hide()
      $("#esquerda").show()
      $("#direita").show()
      $("#andar").show()
      $("#bug").show()
      $("#tabelaPont").show()
    }
  });
});
