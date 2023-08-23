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

}
// async function judge(){
    
    
//     const answer_T = await getAnswerTemplate()
    
//     let result = calculateScoreWithWrongAnswers(user_Input, answer_T)

//     console.log(result)
    
// }
var grade;
// The save function
async function save() {
    var insuredInformation = {
        type: document.getElementById("type").value,
        businessName: document.getElementById("business-name").value,
        firstName: document.getElementById("first-name").value,
        middleName: document.getElementById("middle-name").value,
        lastName: document.getElementById("last-name").value,
        nameOnPolicy: document.getElementById("name-on-policy").value,
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
    // duplicate underwriter here
    var insuredProducers = {
        producerByLocation: document.getElementById("producer-by-location").value,
        producerByContact: document.getElementById("producer-by-contact").value,
        inHouseProducer: document.getElementById("in-house-producer").value,
        underwriter: document.getElementById("underwriter-submission").value,
        taCsr: document.getElementById("ta-csr").value,
        submitted: document.getElementById("submitted").value,
        producerCsr: document.getElementById("producer-csr").value
    };

    var quoteInformation = {
        quotingOffice: document.getElementById("quoting-office").value,
        line: document.getElementById("line").value,
        state: document.getElementById("quote-state").value,
        company: document.getElementById("company").value,
        billingType: document.getElementById("billing-type").value,
        issuingOffice: document.getElementById("issuing-office").value,
        underwriter: document.getElementById("underwriter-quote").value,
        policyType: document.getElementById("policy-type").value,
        effective: document.getElementById("effective").value,
        expiration: document.getElementById("expiration").value
    };

    var policyDetails = {
        costCenter: document.getElementById("cost-center").value,
        type: document.getElementById("policy-type-policy").value,
        businessName: document.getElementById("policy-business-name").value,
        first: document.getElementById("policy-first").value,
        middle: document.getElementById("policy-middle").value,
        last: document.getElementById("policy-last").value,
        dba: document.getElementById("policy-dba").value,
        nameOnPolicy: document.getElementById("policy-name-on-policy").value,
        email: document.getElementById("policy-email").value
    };

    var mailingInfoPolicy = {
        country: document.getElementById("mailing-country").value,
        address: document.getElementById("mailing-address").value,
        zip: document.getElementById("mailing-zip").value,
        ext: document.getElementById("mailing-ext").value,
        city: document.getElementById("mailing-city").value,
        state: document.getElementById("mailing-state").value,
        country2: document.getElementById("mailing-country2").value,  // You might want to remove or rename this
        phone: document.getElementById("mailing-phone").value,
        fax: document.getElementById("mailing-fax").value,
        mobile: document.getElementById("mailing-mobile").value
    };
    var addition = {
        labeling: document.getElementById("labeling").value
    };

    var userAnswers = [
        {question: 'Type', answer: insuredInformation.type},
        {question: 'Business Name', answer: insuredInformation.businessName},
        {question: 'First Name', answer: insuredInformation.firstName},
        {question: 'Middle Name', answer: insuredInformation.middleName},
        {question: 'Last Name', answer: insuredInformation.lastName},
        {question: 'Name on policy', answer: insuredInformation.nameOnPolicy},
        {question: 'Address1', answer: locationInformation.address1},
        {question: 'Address2', answer: locationInformation.address2},
        {question: 'Zip', answer: locationInformation.zip},
        {question: 'City', answer: locationInformation.city},
        {question: 'State', answer: locationInformation.state},
        {question: 'DBA', answer: insuredInformation.dba},
        {question: 'Producer By Contact', answer: insuredProducers.producerByContact},
        {question: 'In-House Producer', answer: insuredProducers.inHouseProducer},
        {question: 'Underwriter', answer: insuredProducers.underwriter},
        {question: 'Line', answer: quoteInformation.line},
        {question: 'State-Q', answer: quoteInformation.state},
        {question: 'Company', answer: quoteInformation.company},
        {question: 'Effective', answer: quoteInformation.effective},
        {question: 'Expiration', answer: quoteInformation.expiration},
        {question: 'Type-P', answer: policyDetails.type},
        {question: 'Business Name-P', answer: policyDetails.businessName},
        {question: 'First Name-P', answer: policyDetails.first},
        {question: 'Middle Name-P', answer: policyDetails.middle},
        {question: 'Last Name-P', answer: policyDetails.last},
        {question: 'DBA-P', answer: policyDetails.dba},
        {question: 'Name on Policy-P', answer: policyDetails.nameOnPolicy},
        {question: 'Address 1-P', answer: mailingInfoPolicy.address},
        {question: 'Zip-P', answer: mailingInfoPolicy.zip},
        {question: 'City-P', answer: mailingInfoPolicy.city},
        {question: 'State-P', answer: mailingInfoPolicy.state},
        {question: 'Labeling', answer: addition.labeling}
    ];
    const answerTemplate = await getAnswerTemplate({});
    console.log("test1")

    var result = calculateScoreWithWrongAnswers(userAnswers, answerTemplate);
    grade = calculateScoreWithWrongAnswers(userAnswers, answerTemplate);
    console.log(result);

    //added on 8_14


    // fetch('https://damp-bonus-34d1.hlzhong1130.workers.dev/submit', {
    //         method: 'POST',
    //         mode: 'no-cors',
    //         body: JSON.stringify(result)
    //     }
    // );
}

//email sending function
function submitForm(e) {

    const traineeNameValue = document.getElementById('traineeName').value;
    const answerIDValue = document.getElementById('answerID').value;
    let ebody = ''

    Email.send({
        SecureToken : "050e86ee-929e-4e27-b391-67ff6071ecc5",
        To : 'hlzhong1130@gmail.com',
        From : "tooooby0807@gmail.com",
        Subject : "Grade Report",
        Body : JSON.stringify(grade, null, 2)
    }).then(
        message => alert(message)
    );
}
async function saveAndSubmit(e) {
    await save();
    submitForm(e);
}
// AirTable API
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



//Search funciton(old version)
// function prefixSearch(inputData, insuredNameQuery, mailingAddressQuery) {
//     const matches = [];

//     for (const record of inputData.records) {
//         const insuredNames = record.fields["Insured Names"];
//         const mailingAddresses = record.fields["Mailing Address"];

//         // Check the conditions separately
//         const insuredNameMatch = insuredNameQuery ? insuredNames.startsWith(insuredNameQuery) : true;
//         const mailingAddressMatch = mailingAddressQuery ? mailingAddresses.startsWith(mailingAddressQuery) : true;

//         // If both conditions are true, then we have a match
//         if (insuredNameMatch && mailingAddressMatch) {
//             matches.push(insuredNames);
//         }
//     }
//     return matches;
// }

// added on 7.26
function removePunctuation(input) {
  // Regular expression to match any punctuation character
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g;
  
  // Replace all punctuation characters with an empty string
  return input.replace(punctuationRegex, '');
}




// added on 7.29

// retrieve answer from airtable
async function getAnswerTemplate({}) {
    try {
        const response = await fetch('https://api.airtable.com/v0/appMxnw2oAkk2GESD/Table%201?maxRecords=100&view=Grid%20view', {
            headers: {
                'Authorization': 'Bearer patFFDNWqjeLexsMw.d08186b943b933cbc2b9347e6d6cb97911ea622afcd623b55e335763914a85df'
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


//Search function 8_2

function normalizeString(str) {

    return str.replace(/[^\w\s]/g, '').toLowerCase();
}

function prefixSearch(data, query) {
    const normalizedQuery = normalizeString(query);

    const matchingItems = data.records.filter((record) => {
        const mailingAddress = record.fields["Mailing Address"];
        const normalizedMailingAddress = normalizeString(mailingAddress);

        const insuredName = record.fields["Insured Names"];
        const normalizedInsuredName = normalizeString(insuredName);

        return (
            normalizedMailingAddress.startsWith(normalizedQuery) ||
            normalizedInsuredName.startsWith(normalizedQuery)
        );
    });

    const matchingInsuredNames = matchingItems.map((item) => item.fields["Insured Names"]);
    return matchingInsuredNames;
}
