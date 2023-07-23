// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let gender = document.getElementById('gender').value;

    // Create JSON object
    let userInformation = {
        firstName: firstName,
        lastName: lastName,
        gender: gender
    };

    console.log(userInformation)
    // Send JSON directly to the Cloudflare Worker
    fetch('', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInformation)
        }
    );
}

document.getElementById('userInfoForm').addEventListener('submit', handleFormSubmit);




//updated 7_22
async function getSearch({}){
    return fetch('https://api.airtable.com/v0/appyIGobg4qaEqWWP/Table%201?maxRecords=3&view=Grid%20view', {
        headers: {
            'Authorization': 'Bearer YOUR_SECRET_API_TOKEN'
        }
    });
}

let response = await getSearch({})
const data1 = JSON.parse(response);

const insuredNames = [];
const mailingAddresses = [];

data1.records.forEach(record => {
    const insuredName = record.fields['Insured Names'];
    const mailingAddress = record.fields['Mailing Address'];

    insuredNames.push(insuredName);
    mailingAddresses.push(mailingAddress);
});

// returned template
// Insured Names: [ 'Lego Land Apartment LLC', 'Disney Amusement Park', 'BBC Broadcasting Inc.' ]
// Mailing Addresses: [ '123 Martin Ave', '48-05 Main Street', '5690 Southwest Boulevard' ]


//implemt Search function here





//get answer from the template
async function getAnswer({}){
    // return fetch('https://api.airtable.com/v0/appyIGobg4qaEqWWP/Table%201?maxRecords=3&view=Grid%20view', {
    //   headers: {
    //     'Authorization': 'Bearer YOUR_SECRET_API_TOKEN'
    //   }
    // });
}

let response = await getAnswer({})
const data2 = JSON.parse(response);

const correct_Ans = new Object()

data2.records.forEach(record => {
    const question = record.fields['Question'];
    const answer = record.fields['answer'];
    correct_Ans[question] = answer
});

//the correct_Ans will be a dictionary with key-value pairs. key: question number, value: answer
//implement judge function here




