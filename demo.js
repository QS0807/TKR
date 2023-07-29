// The search function
async function search() {
    let insuredNameInput = document.getElementById('insuredName').value;
    let mailingAddressInput = document.getElementById('mailingAddress').value;

    const response = await getSearch({});

    

    console.log(response)

    console.log(insuredNameInput)
    
    // added on 7.26
    insuredNameInput = removePunctuation(insuredNameInput);
    mailingAddressInput = removePunctuation(mailingAddressInput);
    
    
    const result = prefixSearch(response, insuredNameInput);
    console.log(result);

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // clear the current results

    // Iterate over the results and add each one to the resultsDiv
    result.forEach(item => {
        // Create a new div for the item and set its textContent to the item
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item;
        itemDiv.classList.add('result-item');

        // Append the itemDiv to the resultsDiv
        resultsDiv.appendChild(itemDiv);
    });
    
    
    
    
    // const data1 = JSON.parse(response);

    // const insuredNames = [];
    // const mailingAddresses = [];

    // data1.records.forEach(record => {
    //     const insuredName = record.fields['Insured Names'];
    //     const mailingAddress = record.fields['Mailing Address'];

    //     insuredNames.push(insuredName);
    //     mailingAddresses.push(mailingAddress);
    // });

    // let results = [];

    // if (insuredNameInput) {
    //     insuredNames.forEach((name, i) => {
    //         if (name.includes(insuredNameInput)) {
    //             results.push({name, address: mailingAddresses[i]});
    //         }
    //     });
    // }

    // if (mailingAddressInput) {
    //     mailingAddresses.forEach((address, i) => {
    //         if (address.includes(mailingAddressInput)) {
    //             results.push({name: insuredNames[i], address});
    //         }
    //     });
    // }

    // const resultsDiv = document.getElementById('searchResults');
    // resultsDiv.innerHTML = '';
    // results.forEach(result => {
    //     const resultItem = document.createElement('div');
    //     resultItem.classList.add('result-item');
    //     resultItem.textContent = `Name: ${result.name}, Address: ${result.address}`;
    //     resultsDiv.appendChild(resultItem);
    // });
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
        businessName: "1",
        firstName: "1",
        middleName: "1",
        lastName: "1",
    };

    let correctCount = 0;
    Object.keys(data).forEach(key => {
        if (data[key] === correctData[key]) correctCount++;
    });

    const accuracy = (correctCount / Object.keys(data).length) * 100;
    console.log(`Accuracy: ${accuracy}%`);
}
function save() {
    var insuredInformation = {
        type: document.getElementById("type").value,
        businessName: document.getElementById("business-name").value,
        firstName: document.getElementById("first-name").value,
        middleName: document.getElementById("middle-name").value,
        lastName: document.getElementById("last-name").value,
        landApartmentAssociation: document.getElementById("land-apartment-association").value,
        taxId: document.getElementById("tax-id").value,
        dnb: document.getElementById("dnb").value,
        riskId: document.getElementById("risk-id").value,
        fein: document.getElementById("fein").value,
        ssn: document.getElementById("ssn").value,
        gender: document.getElementById("gender").value,
        dba: document.getElementById("dba").value,
        insuredNumber: document.getElementById("insured-number").value,
        carrierId: document.getElementById("carrier-id").value,
        status: document.getElementById("status").value,
        dob: document.getElementById("dob").value,
        statusChangeComment: document.getElementById("status-change-comment").value,
    };

    var locationInformation = {
        description: document.getElementById("description").value,
        country: document.getElementById("country").value,
        address1: document.getElementById("address1").value,
        address2: document.getElementById("address2").value,
        zip: document.getElementById("zip").value,
        zipExt: document.getElementById("zip-ext").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        fax: document.getElementById("fax").value,
        mobile: document.getElementById("mobile").value,
        website: document.getElementById("website").value,
        email: document.getElementById("email").value,
        delivery: document.getElementById("delivery").value,
        officeType: document.getElementById("office-type").value,
        added: document.getElementById("added").value,
        addedBy: document.getElementById("added-by").value,
    };

    var formData = {
        insuredInformation: insuredInformation,
        locationInformation: locationInformation,
    };

    console.log(JSON.stringify(formData));
    // This is where you'd send your form data. Replace console.log with your actual function.
}

async function getSearch({}) {
    try {
        const response = await fetch('https://api.airtable.com/v0/appyIGobg4qaEqWWP/Table%201?maxRecords=100&view=Grid%20view', {
            headers: {
                'Authorization': 'Bearer patUUnwciiSfpAtZJ.1fb2358125fd2c9cad4155fc7000d6af04d991c4c73e92261e3fd070865edf17'
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

//Search funciton
function prefixSearch(inputData, insuredNameQuery, mailingAddressQuery) {
    const matches = [];

    for (const record of inputData.records) {
        const insuredNames = record.fields["Insured Names"];
        const mailingAddresses = record.fields["Mailing Address"];

        // Check the conditions separately
        const insuredNameMatch = insuredNameQuery ? insuredNames.startsWith(insuredNameQuery) : true;
        const mailingAddressMatch = mailingAddressQuery ? mailingAddresses.startsWith(mailingAddressQuery) : true;

        // If both conditions are true, then we have a match
        if (insuredNameMatch && mailingAddressMatch) {
            matches.push(insuredNames);
        }
    }
    return matches;
}

// added on 7.26
function removePunctuation(input) {
  // Regular expression to match any punctuation character
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g;
  
  // Replace all punctuation characters with an empty string
  return input.replace(punctuationRegex, '');
}

// the judge function 
// function isEqual(arr1, arr2) {
//   // Check if both arrays have the same length
//   if (arr1.length !== arr2.length) {
//     return false;
//   }

//   // Compare each element of the arrays
//   for (let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) {
//       return false;
//     }
//   }

//   return true;
// }


// added on 7.29

// retrieve answer from airtable
async function getSearch({}) {
    try {
        const response = await fetch('https://api.airtable.com/v0/appMxnw2oAkk2GESD/Table%201?maxRecords=100&view=Grid%20view', {
            headers: {
                'Authorization': 'Bearer patUUnwciiSfpAtZJ.1fb2358125fd2c9cad4155fc7000d6af04d991c4c73e92261e3fd070865edf17'
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


// judge function: will return the score and wrong answer
// input will be userAnswers: array from user input
// answerTemplate: record retrived from airtable: answer template
function calculateScoreWithWrongAnswers(userAnswers, answerTemplate) {
    const records = answerTemplate.records;
    let score = 0;
    const wrongAnswers = [];
    
    for (const record of records) {
        const question = record.fields["Question"];
        const correctAnswer = record.fields["answer"];
        const userAnswerObj = userAnswers.find((ansObj) => ansObj.question === question);
    
        if (userAnswerObj) {
            const userAnswer = userAnswerObj.answer;
            
            // Comparing the user's answer to the correct answer (case-insensitive)
            if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
                score++;
            } else {
                wrongAnswers.push({
                    question,
                    userAnswer,
                    correctAnswer
                });
            }
        }
    }

  return { score, wrongAnswers };
}

