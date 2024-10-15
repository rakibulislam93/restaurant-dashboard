const sidebarToggle = document.querySelector("#sidebar-toggle");
sidebarToggle.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
});

document.querySelector(".theme-toggle").addEventListener("click",() => {
    toggleLocalStorage();
    toggleRootClass();
});

function toggleRootClass(){
    const current = document.documentElement.getAttribute('data-bs-theme');
    const inverted = current == 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme',inverted);
}

function toggleLocalStorage(){
    if(isLight()){
        localStorage.removeItem("light");
    }else{
        localStorage.setItem("light","set");
    }
}

function isLight(){
    return localStorage.getItem("light");
}

if(isLight()){
    toggleRootClass();
}




const loadAllSellData=()=>{
    // document.getElementById("dashboard_sell_date").innerHTML = ""
    const token = localStorage.getItem('token')

    if(token){
        fetch("https://softs-venture.onrender.com/api/products/sell",{
            method : 'GET',
            headers : {
                'Authorization': `Token ${token}`,
                'Content-Type' : 'application/json',
            },
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            console.log(data.sells)
            displayAllSellData(data.sells)
            document.getElementById("today_sell").innerText = `$ ${data.today_total}`
            document.getElementById("yesterday_sell").innerText = `$ ${data.yesterday_total}`
            document.getElementById("this_month_sell").innerText = `$ ${data.monthly_total}`
            
            document.getElementById('parcentage').innerText = `${((data.today_total / data.yesterday_total) * 100).toFixed(2)}%`
            document.getElementById('yes_parcentage').innerText = `${(((data.yesterday_total - data.today_total) / data.today_total) * 100).toFixed(2)}%`;
            document.getElementById('month_parcentage').innerText = `${((data.monthly_total / 15000.00 ) * 100).toFixed(2)}%`

        })
    }
    else{
        window.location.href = 'login.html'
    }
}

const displayAllSellData=(sell)=>{
    
    sell.forEach(element => {
        const parent = document.getElementById("dashboard_sell_date")
        const tr = document.createElement("tr")
        tr.innerHTML=`
        <th scope="row">${element.product.name}</th>
        <td>$ ${element.product.price}</td>
        <td>$ ${element.price_at_sell}</td>
        <td>${element.quantity}</td>
        <td>$ ${element.total_price}</td>
        <td>${element.sell_date}</td>
        `
        parent.appendChild(tr)
    });
}

loadAllSellData()



// ************** Dashboard a kokhon kun page a ase tar link ta active hobe **********


// Current page er URL ta niye ashbe....
var currentPage = window.location.href;

// Sidebar link gulo select koro
var sidebarLinks = document.querySelectorAll('.sidebar-link');

// Prottek link er upor loop chalabo
sidebarLinks.forEach(function(link) {
    // Jodi link er href er sathe current page er URL mile, tahole active class add koro
    if (link.href === currentPage) {
        link.classList.add('active-link');
    }
});

