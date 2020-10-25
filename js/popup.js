const timeHr = document.getElementById('timeHr');
const hrsArr = [...Array(24).keys()].map((i,val)=>{return `<option value='${i+1}'>${i+1}</option>`}).reduce((tot,val)=>{return tot+val});
timeHr.innerHTML = hrsArr;
const timeMin = document.getElementById('timeMin');
const githubLink = document.getElementById('github-link');
const hrsMin = [...Array(60).keys()].map((i,val)=>{return `<option value='${i}'>${i}</option>`}).reduce((tot,val)=>{return tot+val});
timeMin.innerHTML = hrsMin;
const dayDiv = document.getElementById('Days');
const dayArr = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
const days = dayArr.map((val)=>{return `<input type="checkbox" id=${val} name=${val} value=${val}>
<label for=${val}> ${val} </label>`}).reduce((tot,val)=>{return tot+val});
dayDiv.innerHTML = days;

function checkUrl(Url){
    if(Url.indexOf('https://meet.google.com/')!==-1){
        return true
    }else{
        return false
    }
}

const Submit = document.getElementById('submitButton');
githubLink.addEventListener('click',()=>{
    window.open('https://github.com/esakki-selvaraj/meet-meeting-joiner','_blank');
})
Submit.addEventListener('click',()=>{
    const meetUrl = document.getElementById('meetUrl');
    const hrs = document.getElementById('timeHr');
    const mins = document.getElementById('timeMin');
    const dayInputCheckBoxes = dayArr.map((val)=>{return document.getElementById(val)});
    const meetUrlInput = meetUrl.value;
    const hrsVal = hrs.value;
    const minVal = mins.value;
    const dayValues = dayInputCheckBoxes.map((objVal)=>{return objVal.checked});
    meetUrl.value='';dayInputCheckBoxes.map((objVal)=>{objVal.checked=false});
    const valueToStore = {url:meetUrlInput,hrs:hrsVal,mins:minVal,days:dayValues};
    console.log(valueToStore);
    if(checkUrl(meetUrlInput)){
        chrome.storage.local.get(['meetUrls'],(result)=>{
            if(result.meetUrls==undefined){
                result = [];
            }
            else if(result.meetUrls.constructor === Array){
                result = [...result.meetUrls];
                if(result[0]===null){
                    result = [];
                }
            }
            else{
                result = [];
            }
            result.push(valueToStore);
            console.log(result);
            chrome.storage.local.set({meetUrls: result }, function() {
                console.log('set '+valueToStore);
              }); 
        })
        
    }
});