function Login() {
    this.accountData = [
      { userId: 1 ,username: 'admin', password: 'admin123' },
      { userId: 2 ,username: 'tunguyen123', password: '123123' },
    ];

    this.usernameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');
    this.loginButton = document.getElementById('login');
  
    this.loginButton.addEventListener('click', this.login.bind(this));
    this.checkLogin();
  };
  
  Login.prototype.checkLogin = function () {
    const storedUser = sessionStorage.getItem('loggedInUser');
    // const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      if (storedUser.userId !== null) {
        window.location.href = './views/todoList.html';
      }
    }
  };
  Login.prototype.login = function () {

    localStorage.setItem('accountData',JSON.stringify(this.accountData));

    const username = this.usernameInput.value
    const password = this.passwordInput.value
    const user = this.accountData.find(account => account.username === username);
    if (user === undefined) {
        alert('Account does not exist');
        console.log("Account does not exist")
    }
    else {
        if (user.password == password) {
            
            //Lưu dữ liệu thông tin người dùng trên loggedInUser
            // localStorage.setItem('loggedInUser', JSON.stringify(user));
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            // Chuyển màn hình
            window.location.href = '../todoList/index.html';
        } else {
            alert('Wrong password');
            console.log("Wrong password")
        }
    }

  };
  
  
  const app = new Login();