$("input[name='username']").on("focusout", () => {
  let input = $("input[name='username']").val();
  validateField(input, "username");
});

$("input[name='name']").on("focusout", () => {

});

$("input[name='email']").on("focusout", () => {
  let input = $("input[name='email']").val();
  validateField(input, "email");
});

$("input[name='password']").on("focusout", () => {

});

function validateField(fieldInput, key) {
  // $.post(`/signup/validate/${key}`, {input: fieldInput}, (res) => {
  //   console.log(res);
  // });
}
