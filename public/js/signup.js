$("input[name='username']").on("focusout", () => {
  let input = $("input[name='username']").val();
  validateField(input, "username");
});

$("input[name='email']").on("focusout", () => {
  let input = $("input[name='email']").val();
  validateField(input, "email");
});

function validateField(fieldInput, key) {
 console.log(fieldInput);
 $.post({

 });
}
