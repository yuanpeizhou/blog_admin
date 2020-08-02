
import axios from 'axios'

const api_host_local = 'http://127.0.0.1/book_spider/public/'


function httpRequest(url,method = 'get',params,charset,callback){
  const apiUrl = api_host_local + url

  if(method === 'get'){
      axios.get(apiUrl, {
        params: params
      })
      .then(function (response) {
        console.log(response);
        callback(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}


export default function getArticleList(url,method = "get",params,callback,charset="utf-8"){
    return httpRequest(url,method,params,charset,callback)
}