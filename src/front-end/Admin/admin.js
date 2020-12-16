const hospedagemAdmin = new Hospedagens();

const createHospedagem = () => {
    try {

        let name = document.querySelector('#inputName').value;
        let description = document.querySelector('#inputDescription').value;
        let unitValue = document.querySelector('#inputValue').value;

        hospedagemAdmin.createhospedagem(name, description, unitValue);
        showHospedagem();

    } catch (e) {
        if (e) console.log(e);
        throw Error('An error occurred in createHospedagem');
    }
};

const showHospedagem = () => {
    let show = document.querySelector('.showHospedagens');

    if (!show) return;

    let allItems = JSON.parse(localStorage.getItem('hospedagens'));

    let falseTable = show.querySelector('table');

    let table = document.createElement('table');

    let header = document.createElement("tr");
    let header1 = document.createElement("th");
    let header2 = document.createElement("th");
    let header3 = document.createElement("th");
    let header4 = document.createElement("th");

    let nameHeader = document.createTextNode("Nome");
    let descriptionHeader = document.createTextNode("Descrição");
    let valueHeader = document.createTextNode("Valor");
    let configHeader = document.createTextNode("Config.");

    header1.appendChild(nameHeader);
    header2.appendChild(descriptionHeader);
    header3.appendChild(valueHeader);
    header4.appendChild(configHeader);

    header.appendChild(header1);
    header.appendChild(header2);
    header.appendChild(header3);
    header.appendChild(header4);

    table.appendChild(header);

    if (falseTable) show.removeChild(falseTable);

    allItems.map( (item, index, array) => {

        let tableRow = document.createElement("tr");
        let tableName = document.createElement("td");
        let tableDescription = document.createElement("td");
        let tableValue = document.createElement("td");
        let tableConfig = document.createElement("td");


        let name = document.createTextNode(item.name);
        let description = document.createTextNode(item.description);
        let value = document.createTextNode(Number(item.unitValue).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));

        tableName.appendChild(name);
        tableDescription.appendChild(description);
        tableValue.appendChild(value);

        let updateButton = document.createElement("button");
        let updateText = document.createTextNode("Atualizar");
        updateButton.appendChild(updateText);
        updateButton.className = "updateButton";
        updateButton.id = `${item.id}`;
        updateButton.onclick = (e) => {
            updateButton.removeChild(updateText);
            updateText = document.createTextNode("Confirmar");
            updateButton.appendChild(updateText);

            let updateNameInput = document.createElement("input");
            updateNameInput.type = "text";
            updateNameInput.value = item.name;
            tableName.removeChild(name);
            tableName.appendChild(updateNameInput);
            let updateDescriptionInput = document.createElement("input");
            updateDescriptionInput.type = "text";
            updateDescriptionInput.value = item.description;
            tableDescription.removeChild(description);
            tableDescription.appendChild(updateDescriptionInput);
            let updateValueInput = document.createElement("input");
            updateValueInput.type = "text";
            updateValueInput.value = item.unitValue;
            tableValue.removeChild(value);
            tableValue.appendChild(updateValueInput);

            updateButton.onclick = (e) => {
                console.log('confirmou');
                let nameUpdated = updateNameInput.value;
                let descriptionUpdated = updateDescriptionInput.value;
                let valueUpdated = updateValueInput.value;
                hospedagemAdmin.updatehospedagem(e.target.id, {
                    name: nameUpdated,
                    description: descriptionUpdated,
                    unitValue: Number(valueUpdated)
                });
                showHospedagem();

            };
        };

        let deleteButton = document.createElement("button");
        let deleteText = document.createTextNode("Deletar");
        deleteButton.appendChild(deleteText);
        deleteButton.className = "deleteButton";
        deleteButton.id = `${item.id}`;
        deleteButton.onclick = (e) => {
            hospedagemAdmin.deletehospedagem(e.target.id);
            showHospedagem();
        };

        let configDiv = document.createElement("div");
        configDiv.className = "configDiv";
        configDiv.appendChild(updateButton);
        configDiv.appendChild(deleteButton);

        tableConfig.appendChild(configDiv);
        tableRow.appendChild(tableName);
        tableRow.appendChild(tableDescription);
        tableRow.appendChild(tableValue);
        tableRow.appendChild(tableConfig);
        table.appendChild(tableRow);
    });

    show.appendChild(table);
};