$('form').change(() => {
    console.log($('input[name="employeeType"]:checked').val());
})
