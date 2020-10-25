
function DataLoad()
{
    const tableDetailDiv = document.getElementById('tableDetails');
    chrome.storage.local.get(['meetUrls'],(result)=>{
    if(result.meetUrls!=undefined && result.meetUrls.constructor === Array && result.meetUrls !== []){
        result = [...result.meetUrls];
        console.log(result);
        if(result[0]===null||result.length===0){
            tableDetailDiv.innerHTML = `<h3>No Data Avaliable</h3>`;
            return;
        }
    }
    else{
        tableDetailDiv.innerHTML = `<h3>No Data Avaliable</h3>`;
        return;
    }
    
    var LinkDatas

    if(result===[]||result===null){
        tableDetailDiv.innerHTML = `<h3>No Data Avaliable</h3>`;
        return;
    }
    LinkDatas = 
     result.map((val,ind)=>{
        return `<tr>
        <td>
            ${val.url}
        </td>
        <td>
            ${val.hrs}:${val.mins}
        </td>
        <td>
            ${val.days.map((val,i)=>{if(val){return i}else{return 'no'}}).filter((num)=>{
                if(Number.isInteger(num)||num===0){
                    return num+''
                }
            }).map((value=>{
                return ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'][value];
            }))}
        </td>
        <td>
            <button id='Data-${ind}' class='removeButton' style="font-weight: bold;">Remove</button>
        </td>
        </tr>`
    })
    .reduce((total,val)=>{return total+val}) 
    + '</table>';
    LinkDatas = `<table style="width:96%">
    <tr>
        <th>Link</th>
        <th>Time</th>
        <th>Days</th>
        <th>RemoveButton</th>
    </tr>` + LinkDatas + '</table>'
    tableDetailDiv.innerHTML = LinkDatas;
    })
}
DataLoad();

$(document).ready(function(){
    $("button").click(function(event){
      const elementToRemove = event.target.id.split('-')[1];
      console.log(elementToRemove);
      chrome.storage.local.get(['meetUrls'],(result)=>{
        if(result.meetUrls.constructor === Array){
            result = [...result.meetUrls];
        }
        else{
            result = [];
        }
        const updatedResult = result.map((val,ind)=>{
            console.log(ind,elementToRemove);
            if(ind!=elementToRemove){
                return val
            }
        }).filter((val)=>{if(val!=null){return val}});
        chrome.storage.local.set({meetUrls: updatedResult }, function() {
          }); 
          DataLoad();
    })
    
    });

  });