

// Get all form steps and progress steps
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const inputForm = document.querySelectorAll('input');

// Get buttons for navigation
const nextBtns = document.querySelectorAll('.btn-next');
const prevBtns = document.querySelectorAll('.btn-previous');

// Initialize the current step
let currentStep = 0;

// Function to update the form step visibility and progress bar
function updateForm() {
   
    formSteps.forEach((step, index) => {
        if (index === currentStep) {
            step.classList.add('form-step-active');
            progressSteps[index].classList.add('progress-step-active');
        } else {
            step.classList.remove('form-step-active');
            progressSteps[index].classList.remove('progress-step-active');
        }
    });

    // Update progress bar width based on current step
    const progress = ((currentStep + 1) / formSteps.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}







// Function to handle the next button click
function nextStep() {
    if (currentStep < formSteps.length - 1) {
        currentStep++;
        updateForm();
        inputForm();
        
    }
}

// Function to handle the previous button click
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateForm();
    }
}
//***************************************** */

// Summary of data

function handdleSubmit () {
    const name = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const middlename = document.getElementById('middlename').value;
    const course = document.getElementById('course').value;
    const gender = document.getElementById('gender').value;
    const year = document.getElementById('year').value;
    const semester = document.getElementById('semester').value;
    const student = document.getElementById('student').value;
    const date = document.getElementById('date').value;
    const pbirth = document.getElementById('birthplace').value;
    const status = document.getElementById('status').value;
    const nationality = document.getElementById('nationality').value;
    const religion = document.getElementById('religion').value;
    const tel = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;
    const parent = document.getElementById('parent').value;
    const occupation = document.getElementById('occupation').value;
    const provincial = document.getElementById('province').value;
    const current = document.getElementById('address').value;
    const tel2 = document.getElementById('telephone2').value;
    

  
    document.getElementById("title").innerHTML = "Summary";
    

    document.getElementById('result-lastname').innerHTML = lastname;
    document.getElementById('result-name').innerHTML = name;
    document.getElementById('result-mi').innerHTML = middlename;
    document.getElementById('result-course').innerHTML = course;
    document.getElementById('result-year').innerHTML = year;
    document.getElementById('result-semester').innerHTML = semester;
    document.getElementById('result-sex').innerHTML = gender;
    document.getElementById('result-student').innerHTML = student;
    document.getElementById('result-date').innerHTML = date;
    document.getElementById('result-pbirth').innerHTML = pbirth;
    document.getElementById('result-status').innerHTML = status;
    document.getElementById('result-nationality').innerHTML = nationality;
    document.getElementById('result-religion').innerHTML = religion;
    document.getElementById('result-telno').innerHTML = tel;
    document.getElementById('result-email').innerHTML = email;
    document.getElementById('result-parent').innerHTML = parent;
    document.getElementById('result-occupation').innerHTML = occupation;
    document.getElementById('result-provincial').innerHTML = provincial;
    document.getElementById('result-current').innerHTML = current;
    document.getElementById('result-guardianNumber').innerHTML = tel2;

    localStorage.setItem("NAME", name);
    localStorage.setItem("LASTNAME", lastname);
    localStorage.setItem("MIDDLEINITIAL", middlename);

    return;
   
}



// Add event listeners to buttons
nextBtns.forEach(btn => btn.addEventListener('click', nextStep));
prevBtns.forEach(btn => btn.addEventListener('click', prevStep));




// Initialize the form
updateForm();