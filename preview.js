var viewData = JSON.parse(localStorage.getItem("viewData"));
var temporary = [];

const recomend_show = (arr)=>{
    document.getElementById("recomend").innerHTML="";
    arr.map((obj)=>{
        var div = document.createElement("div");
        div.addEventListener("click",function(){
            makearrY(obj);
          });
        var imgdiv = document.createElement("div");
        imgdiv.id="img";
        var titlediv = document.createElement("div");
        titlediv.id = "title";

        var thumb = document.createElement("img");
        thumb.src = obj.snippet.thumbnails.medium.url;
        thumb.id = "thumb";

        var title = document.createElement("h6");
        title.textContent =obj.snippet.title;

        var channel = document.createElement("span");
        channel.textContent = obj.snippet.channelTitle;

        imgdiv.append(thumb);
        titlediv.append(title,channel);
        div.append(imgdiv,titlediv);
        document.getElementById("recomend").append(div);

    })
}

const recomend_search = async (se)=>{
    var key = "AIzaSyA3LTSJMoPaTQS4EGiGsPAwNJxOVSSZofo";
    var input = se;
    try{
        var res3 = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${input}&type=video&key=${key}`);
        var data3 = await res3.json();
        var dtaarray3 = data3.items;
        recomend_show(dtaarray3);
    }
    catch(err){
        console.log(err)
    }
}



const viewvideo = (arr)=>{
    arr.map((obj)=>{
        const {id:{videoId},} = obj;
        var vide = document.getElementById("ifrem");
        vide.src = `https://www.youtube.com/embed/${videoId}`;

        var title = document.createElement("h6");
        title.textContent =obj.snippet.title;
        var channel = document.createElement("p");
        channel.textContent = obj.snippet.channelTitle;
        var des = document.createElement("p");
        des.textContent = obj.snippet.description;

        document.getElementById("videodiv").append(title,channel,des)

        recomend_search(obj.snippet.channelTitle);
    })
}

viewvideo(viewData);





const makearrY =(obj)=>{
    temporary.push(obj);
    localStorage.setItem("viewData",JSON.stringify(temporary));
    window.location.href = "view.html";

}