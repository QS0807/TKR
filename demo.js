// The search function
async function search() {
    const insuredNameInput = document.getElementById('insuredName').value;
    const mailingAddressInput = document.getElementById('mailingAddress').value;

    const response = await getSearch({});
    const data1 = JSON.parse(response);

    const insuredNames = [];
    const mailingAddresses = [];

    data1.records.forEach(record => {
        const insuredName = record.fields['Insured Names'];
        const mailingAddress = record.fields['Mailing Address'];

        insuredNames.push(insuredName);
        mailingAddresses.push(mailingAddress);
    });

    let results = [];

    if (insuredNameInput) {
        insuredNames.forEach((name, i) => {
            if (name.includes(insuredNameInput)) {
                results.push({name, address: mailingAddresses[i]});
            }
        });
    }

    if (mailingAddressInput) {
        mailingAddresses.forEach((address, i) => {
            if (address.includes(mailingAddressInput)) {
                results.push({name: insuredNames[i], address});
            }
        });
    }

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.textContent = `Name: ${result.name}, Address: ${result.address}`;
        resultsDiv.appendChild(resultItem);
    });
}

// The storage function
function storeInfo() {
    const businessName = document.getElementById('businessName').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const lastName = document.getElementById('lastName').value;

    const data = {
        businessName,
        firstName,
        middleName,
        lastName,
    };

    localStorage.setItem('userInfo', JSON.stringify(data));

    const correctData = {
        businessName: "Correct Business",
        firstName: "Correct First",
        middleName: "Correct Middle",
        lastName: "Correct Last",
    };

    let correctCount = 0;
    Object.keys(data).forEach(key => {
        if (data[key] === correctData[key]) correctCount++;
    });

    const accuracy = (correctCount / Object.keys(data).length) * 100;
    console.log(`Accuracy: ${accuracy}%`);
}


async function getSearch({}) {
    try {
        const response = await fetch('https://api.airtable.com/v0/appyIGobg4qaEqWWP/Table%201?maxRecords=3&view=Grid%20view', {
            headers: {
                'Authorization': 'Bearer patGGwOeEzzWK3izh'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            return await response.json();
        }
    } catch(error) {
        console.log(`Fetch Error: ${error}`);
    }
}

