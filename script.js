function Login() {
  // this.accountData = [
  //   { userId: 1 ,username: 'admin', password: 'admin123' },
  //   { userId: 2 ,username: 'tunguyen123', password: '123123' },
  // ];

  this.usernameInput = document.getElementById('username');
  this.passwordInput = document.getElementById('password');
  this.loginButton = document.getElementById('login');

  this.loginButton.addEventListener('click', this.login.bind(this));
  this.checkLogin();
};

function checkAccountOnLogin(accountData, username, password) {
  if (accountData && accountData.length) {
    const user = accountData.find(account => account.username === username);
    if (user === undefined) {
        alert('Account does not exist');
        console.log("Account does not exist")
    } else {
      if (user.password == password) {
          sessionStorage.setItem('loggedInUser', JSON.stringify(user));
          window.location.href = './index.html';
      } else {
          alert('Wrong password');
          console.log("Wrong password")
      }
    }
  } else {
    alert('Account does not exist');
    console.log("Account does not exist")
  }
}
  
Login.prototype.checkLogin = function () {
  const storedUser = sessionStorage.getItem('loggedInUser');
  // const storedUser = localStorage.getItem('loggedInUser');
  if (storedUser) {
    if (storedUser.userId !== null) {
      window.location.href = './index.html';
    }
  }
};
Login.prototype.login = function () {
  // localStorage.setItem('accountData',JSON.stringify(this.accountData));
  const accountData = JSON.parse(localStorage.getItem('accountData'))
  const username = this.usernameInput.value
  const password = this.passwordInput.value

  if (validateEmail(username)) {
    checkAccountOnLogin(accountData, username, password)
    alert('Login successful')
  } else {
    alert('Invalid email format');
  }
};
  
const app = new Login();