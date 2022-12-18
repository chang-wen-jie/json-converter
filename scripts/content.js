let fileInput = document.querySelector('#file-input');
let table = document.createElement('table');
let button = document.createElement('button');
let csv = [];

fileInput.addEventListener('change', (e) => {
    const file = e['target']['files'][0]
    const reader = new FileReader();

    table.innerHTML = '';
    button.innerHTML = 'Downloaden';
    csv = [];

    reader.addEventListener('load', (e) => {
        const json = e['target']['result'];
        const obj = JSON.parse(json);

        Object.keys(obj).forEach((k) => {
            let row = table.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            cell1.innerHTML = k;
            cell2.innerHTML = obj[k];
            csv.push(k, obj[k]);
        });
    });

    document.body.appendChild(table);
    document.body.appendChild(button);
    reader.readAsText(file);
});

button.addEventListener('click', (e) => {
    const csvBlob = new Blob([csv.join('\n')], {type: 'text/csv'});
    window.open(URL.createObjectURL(csvBlob));
});

const csvR = "name,age,country\nJohn,30,USA\nMike,40,Canada\n";
console.log(csvToJson(csvR));

function csvToJson(csvR) {
    const lines = csvR.split("\n");
    const result = [];
    const headers = lines[0].split(",");
  
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(",");
  
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
  
      result.push(obj);
    }
  
    return JSON.stringify(result);
  }