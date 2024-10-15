
const loadManageAppUser = ()=>{
    const token = localStorage.getItem('token')

    if(token){
        fetch("https://softs-venture.onrender.com/api/manage_appuser/",{
            method : 'GET',
            headers : {
                'Authorization' : `Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            displayManageAppUser(data)
        })
    }
    else{
        window.location.href = 'login.html'
    }
}

const displayManageAppUser = (appuser) =>{
    appuser.forEach(element => {
        
        const parent = document.getElementById('AppUser')
        const tr = document.createElement("tr")

        tr.innerHTML = `
        <td>${element.id}</td>
        <td>${element.username}</td>
        <td>${element.password.slice(0,2)}********</td>
        <td>
        <div class="d-flex flex-wrap gap-3">
        <a href="edit_app_user_info.html?app_user_id=${element.id}"><button class="btn btn-primary">Edit</button></a>
        <button class="btn btn-danger" onclick="openAppUserModel(${element.id})" >Delete</button>
        </div>
        </td>
        `
        parent.appendChild(tr)
    });
}

// ******************* New app user add korar jonno ****************
const AddAppUser =(event)=>{
    event.preventDefault()
    username = document.getElementById('app_user_username').value 
    password = document.getElementById('app_user_password').value

    console.log(username,password)

    const token = localStorage.getItem('token')
    
    fetch('https://softs-venture.onrender.com/api/manage_appuser/',{
        method : 'POST',
        headers : {
            'Authorization' : `Token ${token}`,
            'Content-Type':'application/json',
        },
        body : JSON.stringify({
            username : username,
            password : password,
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        console.log(data.username.length)

        if (data.username && Array.isArray(data.username)) {
            
            document.getElementById('appuser_error').innerText = `A user with this username already exists`;
            document.getElementById('appuser_error').style.color = 'red';
        } 
        else if (data.id) {
            
            document.getElementById('appuser_error').innerText = `New app user added successfully`;
            document.getElementById('appuser_error').style.color = 'green';
            
            document.getElementById('app_user_username').value = '';
            document.getElementById('app_user_password').value = '';

            setTimeout(()=>{
                window.location.href = 'manage_app_user.html'
            },1000)
        } 
        else {
            
            document.getElementById('appuser_error').innerText = `Something went wrong. Please try again.`;
            document.getElementById('appuser_error').style.color = 'red';
        }
        
    })
}

// ************** App User er Data Update korar jonno *****************
const UpdateAppUser=()=>{
    const appUserId = new URLSearchParams(window.location.search).get('app_user_id')
    console.log(appUserId)
    
    const token = localStorage.getItem('token')
    if(token){
        fetch(`https://softs-venture.onrender.com/api/manage_appuser/${appUserId}/`,{
            method : 'GET',
            headers : {
                'Authorization' : `Token ${token}`,
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            document.getElementById('update_user_username').value = data.username
            document.getElementById('update_user_password').value = data.password
        }) 
    }
    else{
        window.location.href = 'login.html'
    }
}




// ************** App User er data update korar por save hobe *********************
const SaveUpdateForm=(event)=>{
    event.preventDefault()
    const appUserId = new URLSearchParams(window.location.search).get('app_user_id')
    const updateUsername =  document.getElementById('update_user_username').value 
    const updatePassword =  document.getElementById('update_user_password').value

    console.log(updateUsername,updatePassword)
    console.log("rakib")

    const token = localStorage.getItem('token')
    
    if(token){
        fetch(`https://softs-venture.onrender.com/api/manage_appuser/${appUserId}/`,{
            method : 'PUT',
            headers : {
                'Authorization' : `Token ${token}`,
                'Content-Type':'application/json',
            },
            body : JSON.stringify({
                username : updateUsername,
                password : updatePassword,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            document.getElementById('update_error').innerText=`Update successfully`
            document.getElementById('update_error').style.color = "green"
            
            setTimeout(()=>{
                window.location.href = "manage_app_user.html"
            },1000)
        })

    }
    else{
        window.location.href = 'login.html'
    }

}

const openAppUserModel=(appUserId)=>{
    document.getElementById('deleteAppuserbody').innerText = `Are you sure delete this user =  ${appUserId} ? `
    document.getElementById('deleteAppuserbody').style.color = 'red'
    const appuserDelete_modal = new bootstrap.Modal(document.getElementById('appuserDelete_modal'))
    appuserDelete_modal.show();
    
    document.getElementById('AppuserDelbtn').onclick=()=>deleteAppUser(appUserId)
}


// ****************** Delete App user ****************
const deleteAppUser=(appUserId)=>{
    const token = localStorage.getItem('token')
    
    if(token){
        fetch(`https://softs-venture.onrender.com/api/manage_appuser/${appUserId}/`,{
            method : 'DELETE',
            headers : {
                'Authorization': `Token ${token}`,
                'Content-Type':'application/json'
            },       
        })
        .then(res=>{
            console.log(res)
            if(res.status == 204){
                
                window.location.href = 'manage_app_user.html'
            }
        })
    }
    else{
        window.location.href = 'login.html'
    }
}



loadManageAppUser()
UpdateAppUser()


