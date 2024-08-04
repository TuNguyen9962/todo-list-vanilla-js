function Login() {
    this.accountData = [
      { useId: 1 ,username: 'admin', password: 'admin123' },
      { useId: 2 ,username: 'tunguyen123', password: '123123' },
    ];
   
    this.useNameInput = document.getElementById('useName');
    this.passWordInput = document.getElementById('passWord');
    this.loginButton = document.getElementById('login');
  
    this.loginButton.addEventListener('click', this.login.bind(this));
    this.checkLogin();
  };
  
  Login.prototype.checkLogin = function () {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
        window.location.href = './views/todoList.html';
    }
  };
  Login.prototype.login = function () {

    localStorage.setItem('accountData',JSON.stringify(this.accountData));

    const useName = this.useNameInput.value
    const passWord = this.passWordInput.value
    const user = this.accountData.find(account => account.username === useName);
    if (user === undefined) {
        alert('Account does not exist');
        console.log("Account does not exist")
    }
    else {
        if (user.password == passWord) {
            
            //Lưu dữ liệu thông tin người dùng trên loggedInUser
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Chuyển màn hình
            window.location.href = './views/todoList.html';
        } else {
            alert('Wrong password');
            console.log("Wrong password")
        }
    }

  };
  
  
  const app = new Login();