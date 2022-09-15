const content = document.querySelector('.content');
const new_sort = document.querySelector('#new');
const hot_sort = document.querySelector('#hot');
const top_sort = document.querySelector('#top');
const title = document.querySelector('#title');

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
    fetchURL('https://www.reddit.com/r/IRLgirls/new.json'),
    fetchURL('https://www.reddit.com/r/PrettyGirls/new.json'),
    fetchURL('https://www.reddit.com/r/BeautifulFemales/new.json')
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
            video.setAttribute('width', '100%');
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
    img.setAttribute('width', '100%');
}

/*When bottom button group is clicked*/

new_sort.addEventListener('click', () => {
    //scroll the page to the top left
    window.scrollTo(0, 0);
    content.textContent = '';
    //change color of new btn to something dark blue
    new_sort.classList.replace('btn_inactive', 'btn_active');
    hot_sort.classList.replace('btn_active', 'btn_inactive');
    top_sort.classList.replace('btn_active', 'btn_inactive');
    //now the promise are called for new post
    Promise.all([
        fetchURL('https://www.reddit.com/r/IRLgirls/new.json'),
        fetchURL('https://www.reddit.com/r/PrettyGirls/new.json'),
        fetchURL('https://www.reddit.com/r/BeautifulFemales/new.json')
    ])
})

hot_sort.addEventListener('click', () => {
    //scroll the page to the top left
    window.scrollTo(0, 0);
    //removes all loaded data previously
    content.textContent = '';
    //change color of new btn to something light blue
    hot_sort.classList.replace('btn_inactive', 'btn_active');
    new_sort.classList.replace('btn_active', 'btn_inactive');
    top_sort.classList.replace('btn_active', 'btn_inactive');
    //now the promise are called for hot post
    Promise.all([
        fetchURL('https://www.reddit.com/r/IRLgirls/hot.json'),
        fetchURL('https://www.reddit.com/r/PrettyGirls/hot.json'),
        fetchURL('https://www.reddit.com/r/BeautifulFemales/hot.json')
    ])
})

top_sort.addEventListener('click', () => {
    //scroll the page to the top left
    window.scrollTo(0, 0);
    //removes all loaded data previously
    content.textContent = '';
    top_sort.classList.replace('btn_inactive', 'btn_active');
    new_sort.classList.replace('btn_active', 'btn_inactive');
    hot_sort.classList.replace('btn_active', 'btn_inactive');
    //now the promise are called for top post
    Promise.all([
        fetchURL('https://www.reddit.com/r/IRLgirls/top.json?t=week'),
        fetchURL('https://www.reddit.com/r/PrettyGirls/top.json?t=day'),
        fetchURL('https://www.reddit.com/r/BeautifulFemales/top.json?t=month')
    ])
})

//when title is clicked, do something!
title.addEventListener('click', () => {
    console.log('title is clicked!');
    //refresh page
    window.location.reload();
})