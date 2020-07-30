
import axios from 'axios'

const api_host = 'http://192.168.6.19/blog_server/public/api/'


function httpRequest(url,method = 'get',params,charset,callback){
  const apiUrl = api_host + url

  if(method === 'get'){
      axios.get(apiUrl, {
        params: params
      })
      .then(function (response) {
        console.log(response);
        callback(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}


export default function getArticleList(url,method = "get",params,callback,charset="utf-8"){
    return httpRequest(url,method,params,charset,callback)
}