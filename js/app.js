// listeners
listeners()

function listeners() {
          document.querySelector('#submitBtn').addEventListener('click', search)
}

// Function

function search(e) {
          e.preventDefault()
          const newsName = document.querySelector('#news-name').value
          const sort = document.querySelector('#sort').value
          const country = document.querySelector('#country').value
          const category = document.querySelector('#category').value 
          const agency = document.querySelector('#News-agency').value

          if (newsName !== '' || sort !== '' || country !== '' || category !== '' || agency!== '') {
                    newsAPI.queryAPI(newsName, sort, country, category, agency)
                    .then(news => {
                            const newsArray = news.news.articles
                            
                            if (newsArray.length > 0) {
                             ui.showNews(newsArray)
                                     } else {
                                         ui.printMessage('there is no news', 'alert ')
                                     }
                              })
          } else {
                    ui.printMessage('Please, Fill in at least one of the fields', 'alert ')
          }
}


// Class


class UI {

    constructor(){
        this.result = document.querySelector('#result');
    }

          // show any message in HTML
          printMessage(message, className) {
                    // craete  div element
                    const div = document.createElement('div')
                    // append text message to the div tag
                    div.appendChild(document.createTextNode(message))
                    div.className = className


                    // show to message into the HTML
                    document.querySelector('#message').appendChild(div)

                    setTimeout(() => {
                              this.removeMessage()
                              this.backColor()
                    }, 3000);
          }

          // remove message 

          removeMessage() {
                    const alert = document.querySelector('.alert')
                    if (alert) {
                              alert.remove()
                    }
          }

          backColor(){
              const btnsbt = document.querySelector('#submitBtn');
              btnsbt.style.backgroundColor = "#413e3e";
              btnsbt.style.color = "azure";
          }

          showNews(news){
              console.log(news);
        
            news.forEach(newsInfo => {
                this.result.innerHTML += `
                <div class="col-md-8 mb-4 ml-2 ">
                <div class="card card-top">
                <img class="card-img-top" src="${newsInfo.urlToImage}" alt="Card image cap">
                    <div class="card-body">
                        <h2 class="card-title text-center">${newsInfo.title.split('-',1)}</h2>
                        <p class="card-text  " id="card-text-p">${newsInfo.description}</p>
                        <span class="badge badge-Warning badge-block">source: ${newsInfo.source.name}</span><br>
                        <span class="badge badge-Warning  badge-block card-span">Date & time: ${newsInfo.publishedAt}</span><br>
                        <span class="badge badge-Warning  badge-block card-span">Author: ${newsInfo.author}</span><br>
                        <br>
                        <a href="${newsInfo.url}" target="_blank" class="btn  btn-block card-sbm">Complete News</a>
                    </div>
                </div>
            </div>

                `
            });
        }
}

const ui = new UI;


class News {

          APIkey = 'aec60656af464915b379748127c9a9d8'

          async queryAPI(newsName, sort, country, category, agency) {
                    let url = 'https://newsapi.org/v2/'

                    if (country === '' && category === '') {
                              url += 'everything?'
                
                            } else {
                              url += 'top-headlines?'
                    }

                    if (newsName !== '') {
                              url += `q=${newsName}&`
                    }

                    if (sort !== '') {
                              url += `sortBy=${sort}&`
                    }

                    if (country !== '') {
                              url += `country=${country}&`
                    }

                    if (category !== '') {
                              url += `category=${category}&`
                    }

                    if (agency !== '') {
                              url += `domains=${agency}&`
                    }

                    url += `apiKey=${this.APIkey}`

                    console.log(url);

                    const newsResponse = await fetch(url)
                    const news = await newsResponse.json()

                    return{
                        news
                    }
          }
}

const newsAPI = new News;