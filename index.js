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
