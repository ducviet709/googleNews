let newsList = []
let currentPage = 1;

const loadMoreToggle = () => {
    currentPage += 1;
    callApi();
}

const callApi = async () => {
    let url = `
    https://newsapi.org/v2/top-headlines?country=us&apiKey=1b0ce20ffbab4953850adad597e85016&page=${currentPage}`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    currentPage++
    render(newsList)
}

const searchByCategory = async () => {
    let selectedCategory = document.getElementById("categories").value 
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=1b0ce20ffbab4953850adad597e85016`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    render(newsList)
}

const searchByKeyword = async () => {
    let keyword = document.getElementById("keywordArea").value
    console.log(keyword)
    let url = ` https://newsapi.org/v2/everything?q=${keyword}&apiKey=1b0ce20ffbab4953850adad597e85016`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    render(newsList)
}

const render = (list) => {
    let newsHTML = list.map(item => {
        return `<ul class="list-unstyled">
            <li class="media">
                <img src="${item.urlToImage}" class="align-self-center mr-3" style="display: inline-block; height: 30%; width: 40%;">
                <div class="media-body">
                    <h5 class="mt-0 mb-1"><a href =${item.url}>${item.title}</a></h5>
                    <p>${item.description}</p>
                    <h6 class="mt-0 mb-1" style="text-align:right;">${item.author}</h6>
                    <p class="mt-0 mb-1"style="text-align:right;">${item.source.name}</p>
                    <p class="font-italic" style="text-align:right;">${moment(item.publishedAt).fromNow()}</p>

                </div>
            </li>
         </ul>`

    })
    document.getElementById("newsListArea").innerHTML = newsHTML
}



callApi()