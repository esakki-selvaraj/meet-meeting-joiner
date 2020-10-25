chrome.runtime.onMessage.addListener((request,sender,response)=>{
    if(request.url){
        window.open(request.url);
    }
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    response({status:"received"});
    return true
})