import generateUID from '../../helpers/utils'

function Register() {
  this.usernameInput = document.getElementById('username');
  this.passwordInput = document.getElementById('password');
  this.repeatPasswordInput = document.getElementById('repeatPassword');

  this.registerButton = document.getElementById('register');
  this.registerButton.addEventListener('click', this.register.bind(this));
}

Register.prototype.register = function () { 
  const username = this.usernameInput.value
  const password = this.passwordInput.value
  const repeatPassword = this.repeatPasswordInput.value

  if (password !== repeatPassword) {
    alert('Passwords do not match')
    console.log('Passwords do not match')
  } else {
    const newUser = {
      username,
      password,
      userId: generateUID()
    }

    const accountData = localStorage.getItem('accountData');
    if (accountData) {
      accountData = JSON.parse(accountData);
    } else {
      accountData = [];
    }
    accountData.push(newUser);
    localStorage.setItem('accountData', JSON.stringify(accountData));

    alert('Registration successful! You can now log in.')
    console.log('Registration successful')
  
    this.usernameInput.value = '';
    this.passwordInput.value = '';
    this.repeatPasswordInput.value = '';

    window.location.href = '../todoList/index.html';
  }
}

