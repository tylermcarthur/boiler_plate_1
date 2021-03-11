const btn = document.querySelector('#btn1')
$(document).ready(function(){
    $("#btn1").on("click", function(){
        $.get('http://localhost:8000/api/public',function (data,status){
            data.forEach(elem => {
                $(`<div>${elem.name}</div>`).appendTo("body")
            });
        })
    });
  $("#btn2").click(function(){
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify({"name": $("#name").val(),"password":$("#password").val(),"email":$("#email").val()}),
        dataType: 'json',
        type: 'POST',
        url: 'http://localhost:8000/api/public' 
    })  
  })  
  $("#btn3").click(function(){
      console.log($("#deleteUser").val())
      $.ajax({
        contentType: 'application/json',
        data: JSON.stringify({"name": $("#deleteUser").val()}),
        dataType: 'json',
        type: 'DELETE',
        url: 'http://localhost:8000/api/public'   
      })
  })
  $("#btn4").click(function(){
      let dataToSend = {"id":$("#updateid").val()}
      if($("#updatename").val() !== ""){
          dataToSend["name"] = $("#updatename").val()
      }
      if($("#updatepassword").val() !== ""){
        dataToSend["password"] = $("#updatename").val()
      }
      if($("#updateemail").val() !== ""){
        dataToSend["email"] = $("#updateemail").val()
      }
    $.ajax({
    contentType: 'application/json',
    data: JSON.stringify(dataToSend),
    dataType: 'json',
    type: 'PATCH',
    url: 'http://localhost:8000/api/public'   
  })
  })






})