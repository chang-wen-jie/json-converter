var fileInput = document.querySelector('#file-input');
var table = document.createElement('table');
var button = document.createElement('button');

fileInput.addEventListener('change', (e) => {
    const file = e['target']['files'][0]
    const reader = new FileReader();

    table.innerHTML = '';
    button.innerHTML = 'Downloaden';

    reader.addEventListener('load', (e) => {
        const json = e['target']['result'];
        const obj = JSON.parse(json);
        let rows = [];

        Object.keys(obj).forEach((k) => {
            rows.push(k, obj[k]);

            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = k;
            cell2.innerHTML = obj[k];
        });
        const csvString = rows.join('\n');
        const csvBlob = new Blob([csvString], {type: 'text/csv'});

        button.addEventListener('click', (e) => {
            console.log('clicked', e);
            window.open(URL.createObjectURL(csvBlob), '_blank');
        });
    });

    document.body.appendChild(table);
    document.body.appendChild(button);
    reader.readAsText(file);
});
