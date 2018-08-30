let uploadForm = $("#upload-form"),
    sourceField = uploadForm.find("#source-field input"),
    sourceLabel = uploadForm.find("#source-field label");

sourceField.on('change', () => {
  sourceLabel.html(sourceField.val());
});
