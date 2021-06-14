//chrome://extensions/
//variable that storage all the urls
let myLeads = []
//Getting the DOM of the buttons
let inputUrl = document.querySelector('.input-url')
let saveUrl = document.querySelector('.save-url')
let saveTab = document.querySelector('.save-tab')
let deleteAll = document.querySelector('.delete-all')
let urlList = document.querySelector('.url-list')
let localStorageData = JSON.parse(window.localStorage.getItem('myLeads'))

//Charge the localStorage data. Getting the string leads and transforming then into array again
if(localStorageData){
  myLeads = localStorageData
  render(myLeads)
}


//Save Tab
saveTab.addEventListener("click",function(){
  //function to use chrome API to get the current tab
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url)
    window.localStorage.setItem('myLeads',JSON.stringify(myLeads))
    render(myLeads)
  })
})


//Save url manually
saveUrl.addEventListener("click", function(){
  myLeads.push(inputUrl.value)
  inputUrl.value = ""
  // transforming array into string to store the leads in the localStorage
  window.localStorage.setItem('myLeads',JSON.stringify(myLeads))
  render(myLeads)
})

//detele function
deleteAll.addEventListener("dblclick", function(){
  //delete input
  inputUrl.value = ""
  //delete localStorage
  localStorage.clear()
  //delete DOM
  myLeads = []
  render(myLeads)
})

//printing function
function render(list){
  let listItems = ""
  for (let i = 0; i<list.length;i++){
    listItems += `
    <li class='items'>
      <a href='${list[i]}' target='_blank'>
        ${list[i]}
      </a>
    </li>`
  }
  urlList.innerHTML = listItems
}

