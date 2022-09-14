const content = document.querySelector('.content');

//function to fetch data in url
let fetchURL = (url) => {
    fetch(url, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response.data.children.length);
            for(let i=0; i<response.data.children.length; i++){
                if (response.data.children[i].data.url.includes('gfycat')){
                    displayGfycatURL(response, i);
                } else {
                    displayImage(response, i);
                }
            }
        }).catch(function (reject) {
            console.log(reject);
        });
}

Promise.all([
    fetchURL('https://www.reddit.com/r/IRLgirls/new.json?limit=100'),
    fetchURL('https://www.reddit.com/r/PrettyGirls/new.json?limit=100'),
    fetchURL('https://www.reddit.com/r/BeautifulFemales/new.json?limit=100')
])

//function to display GFYCAT url
let displayGfycatURL = (response, index) => {
    //get gfycat url from json data
    gfycat_url = response.data.children[index].data.url;
    //get the id from url
    gif_id = gfycat_url.split('/').pop();
    //use gfycat api plus the id to locate gif
    fetch('https://api.gfycat.com/v1/gfycats/' + gif_id, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            const video = document.createElement('video');
            content.appendChild(video);
            video.src = response.gfyItem.webmUrl;
            video.width = 400;
            video.setAttribute("controls","controls");
        })
        .catch(function (reject) {
            console.log(reject);
        });
}

//function to create and display image
let displayImage = (response, index) => {
    const img = document.createElement('img');
    content.appendChild(img);
    img.src = response.data.children[index].data.url;
    img.width = 400;
}