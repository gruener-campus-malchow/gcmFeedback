function initiateRegistration(){
    let main = document.getElementById('main');
    main.innerHTML='';

    let intro = document.createElement('div');
    intro.innerHTML='Bitte fülle das folgende Formular aus.';
    intro.classList.add("feedback");

    let formContainer = document.createElement('div');
    formContainer.id = "formContainer";

    main.appendChild(intro);
    main.appendChild(formContainer);

    createBasicDataForm();


    /*
     *   Vorname
     *   Nachname
     *   Telefonnummer
     *   E-Mail
     *   Geburtsjahr
     */

    /*
     *       Verantwortliche
     *   Rolle
     *       Sportverein
     *   Anwesenheitspflicht
     */

}

function initiateReports(){
    document.getElementById('main').innerHTML='Here comes a list of possible reports!';

}

function createBasicDataForm() {
    // Create a form element
    const form = document.createElement("div");
    //form.setAttribute("method", "post");
    //form.setAttribute("action", "api/testpost/");

    // Create input fields
    const prename = document.createElement("input");
    prename.setAttribute("type", "text");
    prename.setAttribute("name", "prename");
    prename.setAttribute("placeholder", "Vorname");
    prename.id = "prename";

    const surname = document.createElement("input");
    surname.setAttribute("type", "text");
    surname.setAttribute("name", "surname");
    surname.setAttribute("placeholder", "Nachname");
    surname.id = "surname";

    const phone = document.createElement("input");
    phone.setAttribute("type", "text");
    phone.setAttribute("name", "phone");
    phone.setAttribute("placeholder", "Deine Telefonnummer");
    phone.id = "phone";

    const mail = document.createElement("input");
    mail.setAttribute("type", "text");
    mail.setAttribute("name", "mail");
    mail.setAttribute("placeholder", "Deine E-Mailadresse");
    mail.id = "mail";

    const year = document.createElement("input");
    year.setAttribute("type", "number");
    year.setAttribute("name", "year");
    year.setAttribute("placeholder", "Dein Geburtsjahr");
    year.id = "year";

    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.id = "evaluate";
    submitButton.innerHTML = "Überprüfen";
    submitButton.addEventListener('click', checkForm);

    // Append all elements to the form
    const formElementsList = document.createElement("ul");

    formElementsList.appendChild(addInputField(prename));
    formElementsList.appendChild(addInputField(surname));
    formElementsList.appendChild(addInputField(year));
    formElementsList.appendChild(addInputField(phone));
    formElementsList.appendChild(addInputField(mail));

    form.appendChild(formElementsList);
    form.appendChild(submitButton);

    // Append the form to the container
    const container = document.getElementById("formContainer");
    container.appendChild(form);
}

function addInputField(field){
    const listElement = document.createElement("li");
    listElement.appendChild(field);
    return listElement
}

function checkForm(){

    overlayOn();

    let content = document.getElementById("overlay-content");

    content.innerHTML = "Hallo "
    + document.getElementById("prename").value + " "
    + document.getElementById("surname").value + ", <br><br>Du bist im Jahr  "
    + document.getElementById("year").value + " geboren. <br><br>Wir erreichen Dich unter der Telefonnummer: "
    + document.getElementById("phone").value + ". <br> <br>Bitte gib hier den Zahlen-Code ein, den wir an Deine E-Mailadresse ("
    + document.getElementById("mail").value
    +") gesendet haben.<br>";

    const evaluationcode = document.createElement("input");
    evaluationcode.setAttribute("type", "number");
    evaluationcode.setAttribute("name", "evaluationcode");
    evaluationcode.setAttribute("placeholder", "Bestätigungscode");
    evaluationcode.id = "evaluationcode";

    content.appendChild(evaluationcode);


}
