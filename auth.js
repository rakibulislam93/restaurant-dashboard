

const UserLogin =(event)=>{
    console.log('rakib')
    event.preventDefault()
    username = document.getElementById('login-username').value 
    password = document.getElementById('login-password').value

    fetch('https://softs-venture.onrender.com/api/login/',{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({
            username : username,
            password : password,

        }),
    })
    .then(res=>res.json())
    .then(data=>{
        
        if(data.error){
            
            document.getElementById('login-error').innerText=`Invalid account`
            document.getElementById('login-error').style.color = 'red';
        }
        else{
            document.getElementById('login-error').innerText=`Login successfull`
            document.getElementById('login-error').style.color = 'green';
            console.log(data)

            localStorage.setItem('token',data.token)
            localStorage.setItem('user_id',data.user_id)
            

            setTimeout(()=>{
                window.location.href="index.html"
            },2000)
            
            
        }
    })
}

const UserLogout =()=>{
    const token = localStorage.getItem('token')

    if(!token){
        alert('No token found, User might not be logged in..')
        return
    }
    else{
        fetch("https://softs-venture.onrender.com/api/logout/",{
            method : 'GET',
            headers :{
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json',
            },
            
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            alert('Account Logout Successful...')
            setTimeout(()=>{
                window.location.href = 'login.html'
            },1000)
        })
        
    }
   
}


// ***************** Change password *******************

const PassChange =(event)=>{
    event.preventDefault()
    old_password = document.getElementById('old_password').value 
    new_password = document.getElementById('new_password').value 
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    
    fetch(`https://softs-venture.onrender.com/api/change_password/${user_id}/`,{
        method : 'PUT',
        headers : {
            'Authorization':`Token ${token}`,
            'Content-Type':'application/json',
            
        },
        body : JSON.stringify({
            'old_password': old_password,
            'new_password':new_password,
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.error){
            document.getElementById('pass-error').innerText = `${data.error}`
            document.getElementById('pass-error').style.color = "red"
        }
        else if(data.success){
            document.getElementById('pass-error').innerText = `${data.success}`
            document.getElementById('pass-error').style.color = "green"

            setTimeout(()=>{
                window.location.href="index.html"
            },2000)
        }
    })
}