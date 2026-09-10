let apiBaseUrl = 'https://drakionoil.com/api/niit-api-testing';

async function signUpHandle() {

    const fullName = document.getElementById("fullName").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const password = document.getElementById("password").value;

   if (!fullName) {
        alert("FULL NAME REQUIRED");
        return;
    }

    if (!emailAddress) {
        alert("EMAIL ADDRESS REQUIRED");
        return;
    }

    if (!emailAddress.includes("@") || !emailAddress.includes(".")) {
        alert("ENTER A VALID EMAIL");
        return;
    }

    if (!phoneNumber) {
        alert("PHONE NUMBER REQUIRED");
        return;
    }

    const phoneDigitsOnly = phoneNumber.startsWith("+") ? phoneNumber.slice(1) : phoneNumber;

    if (isNaN(phoneDigitsOnly) || phoneDigitsOnly.trim() === "") {
        alert("PHONE NUMBER MUST CONTAIN ONLY NUMBERS");
        return;
    }

    if (phoneNumber.length < 11 || phoneNumber.length > 14) {
        alert("INVALID PHONE NUMBER");
        return;
    }


    if (!password) {
        alert("PASSWORD REQUIRED");
        return;
    }

    if (password.length < 8) {
        alert("PASSWORD MUST NOT BE LESS THAN 8 CHARACTERS");
        return;
    }

    const submitBtn = document.getElementById('submitBtnId');
    submitBtn.innerHTML = 'Processing...';
    submitBtn.disabled = true;

    try {

        const response = await fetch(apiBaseUrl + '/auth/sign-up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName,
                emailAddress,
                phoneNumber,
                password
            })
        });

        const fetchData = await response.json();

        if (fetchData.success == true) {
            sessionStorage.setItem('userSignUpSession', JSON.stringify(fetchData));
            alert(fetchData.message );
            window.location.href = 'profile.html';
        } else {
            alert(fetchData.message);
        }


        submitBtn.innerHTML = 'Sign Up';
        submitBtn.disabled = false;

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}
// sign-in-js
async function signInHandle() {

    const emailAddress = document.getElementById("emailAddress").value.trim();
    const password = document.getElementById("password").value;

    if (!emailAddress) {
        alert("EMAIL ADDRESS REQUIRED");
        return;
    }

    if (!password) {
        alert("PASSWORD REQUIRED");
        return;
    }

    const submitBtn = document.getElementById('submitBtnId');
    submitBtn.innerHTML = 'Authenticating...';
    submitBtn.disabled = true;

    try {

        const response = await fetch(apiBaseUrl + '/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailAddress,
                password
            })
        });

        const fetchData = await response.json();

        if (fetchData.success == true) {
            alert(fetchData.message + ' Hi, ' + fetchData.data.emailAddress);
        } else {
            alert(fetchData.message);
        }

        submitBtn.innerHTML = 'Sign In';
        submitBtn.disabled = false;

    } catch (error) {
        console.error(error);
        alert(error.message);

        submitBtn.innerHTML = 'Sign In';
        submitBtn.disabled = false;
    }
}

// forgotpassword-js
async function forgotPasswordHandle() {
    const emailAddress = document.getElementById("emailAddress").value.trim();

    if (!emailAddress) {
        alert("EMAIL ADDRESS REQUIRED");
        return;
    }

    const submitBtn = document.getElementById('submitBtnId');
    submitBtn.innerHTML = 'Sending OTP...';
    submitBtn.disabled = true;

    try {

        const response = await fetch(apiBaseUrl + '/auth/forgot-password', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailAddress
            })
        });

        const fetchData = await response.json();

        if (fetchData.success == true) {
            alert(fetchData.message); 
            
            alert("Your OTP Code is: " + fetchData.data.otpCode);

            window.location.href = 'proceed-to-forgot-password.html';
        } else {
            alert(fetchData.message);
        }

        submitBtn.innerHTML = 'Proceed to Forgot Password';
        submitBtn.disabled = false;

    } catch (error) {
        console.error(error);
        alert(error.message);

        submitBtn.innerHTML = 'Proceed to Forgot Password';
        submitBtn.disabled = false;
    }
}
// resetpassword-js
async function resetPasswordHandle() {
    const otpCode = document.getElementById("otpCode").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!otpCode) {
        alert("OTP CODE REQUIRED");
        return;
    }

    if (!newPassword) {
        alert("NEW PASSWORD REQUIRED");
        return;
    }

    if (!confirmPassword) {
        alert("CONFIRM PASSWORD REQUIRED");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("PASSWORDS DO NOT MATCH");
        return;
    }

    const submitBtn = document.getElementById('submitBtnId');
    submitBtn.innerHTML = 'Resetting Password...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(apiBaseUrl + '/auth/reset-password', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otpCode: otpCode,
                password: newPassword,
                confirmedPassword: confirmPassword 
            })
        });

        const fetchData = await response.json();

        if (fetchData.success == true) {
            alert(fetchData.message);
            window.location.href = 'sign-in.html';
        } else {
            alert(fetchData.message);
        }

        submitBtn.innerHTML = 'Reset Password';
        submitBtn.disabled = false;

    } catch (error) {
        console.error(error);
        alert(error.message);

        submitBtn.innerHTML = 'Reset Password';
        submitBtn.disabled = false;
    }
}