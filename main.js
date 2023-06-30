let div = document.body.querySelector(".root");
function getFilms(){
    let dataLink = "https://ajax.test-danit.com/api/swapi/films";
    let request = new XMLHttpRequest();
    request.open('GET', dataLink);

    let loader = document.querySelector("#loader")

    return new Promise(function(resolve, reject)
    {
        request.onload = () => {
            let json = JSON.parse(request.responseText);
            json.forEach(element => {
                let p = document.createElement('p');
                p.classList.add('mainP');

                p.textContent = element.name +"/" + element.episodeId + "/"+element.openingCrawl;
                div.append(p)
                let characters = element.characters
                characters.forEach(item => {
                    $.ajax({
                            method: "GET",
                            url: item,
                            async:false //<-------спасибо ему
                        }).done(function(msgf){
                            let p = document.createElement('p');
                            p.textContent = msgf.id+": "+msgf.name;
                            div.append(p)
                        })
                })
                loader.remove();
            });

            resolve(json)
        }
        request.send();
    })
}

let promReq = getFilms();
promReq.then(data => console.log(data));


//вот что получается если не синхронно
// fetch("https://ajax.test-danit.com/api/swapi/films")
//     .then(response => response.json())
//         .then((data) => 
//         {
//             console.log(data)
//             data.forEach(element => {
//                 console.log(element.name)
//                 element.characters.forEach(item =>{
//                     fetch(item)
//                     .then(response => response.json())
//                     .then((data2) =>{
//                         console.log(data2.name);
//                     })
//                 })
                
//             });
//         })