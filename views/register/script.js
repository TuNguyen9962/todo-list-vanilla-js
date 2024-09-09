function Register() {
  this.usernameInput = document.getElementById('username');
  this.passwordInput = document.getElementById('password');
  this.repeatPasswordInput = document.getElementById('repeatPassword');

  this.registerButton = document.getElementById('register');
  this.registerButton.addEventListener('click', this.register.bind(this));
  this.checkLogin()
}

Register.prototype.checkLogin = function () {
  const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      if (storedUser.userId !== null) {
        window.location.href = '../todoList/index.html';
        sessionStorage.removeItem('loggedInUser')
      }
    }
};

function checkUserOnRegister(username, password, repeatPassword) {
  const url = 'http://localhost:8080/api/users';
  const method = 'POST';

  if (password !== repeatPassword) {
    alert('Passwords do not match');
    console.log('Passwords do not match');
  } else {
    const newUser = {
      username,
      password,
      userId: generateUID()
    };

    let accountData = localStorage.getItem('accountData');
    if (accountData && accountData.length) {
      accountData = JSON.parse(accountData);
    } else {
      accountData = [];
    }
    accountData.push(newUser);
    let httpData = JSON.stringify(accountData);
    localStorage.setItem('accountData', httpData);

    // Create a new XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Set up the request
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Handle the response
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 201) {
        alert('Registration successful! You can now log in.');
        console.log('Registration successful');
        window.location.href = '../../index.html';

        this.usernameInput.value = '';
        this.passwordInput.value = '';
        this.repeatPasswordInput.value = '';
      } else {
        console.error('Error:', xhr.status, xhr.responseText);
      }
    };

    // Handle network errors
    xhr.onerror = function () {
      console.error('Network Error');
    };

    // Send the request with the user data
    xhr.send(JSON.stringify(newUser));
  }
}

// Usage example

Register.prototype.register = function () { 
  const username = this.usernameInput.value
  const password = this.passwordInput.value
  const repeatPassword = this.repeatPasswordInput.value

  if (validateEmail(username)) {
    checkUserOnRegister(username, password, repeatPassword)
  } else {
    alert('Invalid email address')
    console.log('Invalid email address')
  }
}

  const app = new Register();