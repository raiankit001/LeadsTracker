let myLead = [];

const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById("tab-btn");
let ulEl = document.getElementById('ul-el');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){  //if leadsfromlocalstorage is truthy value
    myLead = leadsFromLocalStorage;
    render(myLead);
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLead) )
        render(myLead)
    })
})





//render the leads in the unordered list
function render(arr) {
    let listItem = ""; //emptying the list data
    for (let i = 0; i < arr.length; i++) {
        listItem += `       
            <li>
                <a target="_blank" href='${arr[i]}'>
                    ${arr[i]}
                </a>
            </li>
        `           // templetLitterals ---- refling the list items
    }
    ulEl.innerHTML = listItem;
}



inputBtn.addEventListener("click", function () {
    // if (inputEl.value !== "") {
        myLead.push(inputEl.value);
        inputEl.value = "";
        
        localStorage.setItem("myLeads",JSON.stringify(myLead));
    // }
    render(myLead);
})




deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLead = [];
    render(myLead);
})