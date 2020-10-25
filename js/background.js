var data=[];
var time;
var day;
function setData(result){
    if(result===[]||result==null){
        data = [];
        return;
    }
    console.log(result);
    data = [ ...result.meetUrls ]
}
function getData(){
    return data
}
async function repeat()
{
    setTimeout(()=>{
        repeat();
    },10000);
    chrome.storage.local.get(['meetUrls'],(result)=>{
        setData(result);
    })
    if(data==[]||data==null||data[0]==null){
        return;
    }
    var today = new Date();
    var dayNow =today.getDay(),
    timeHrNow = today.getHours(),
    timeMinNow = today.getMinutes();
    data.map((val)=>{ 
        if(val.days[dayNow]&&val.hrs==timeHrNow&&val.mins==timeMinNow){
            chrome.tabs.query({},(tabs)=>{
                isAnotherTabWithThisLink=false
                tabs.forEach(element => {
                    if(element.url===val.url){
                        isAnotherTabWithThisLink = true;
                    }
                });
                if(!isAnotherTabWithThisLink){
                    window.open(val.url,'_blank');
                    }
            });
        }
    });
}
repeat();