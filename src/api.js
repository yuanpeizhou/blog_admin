
import axios from 'axios'

const api_host_local = 'http://127.0.0.1/book_spider/public/'
const api_host_company = 'http://192.168.6.19/book_spider/public/'


function httpRequest(url,method = 'get',params,charset,callback){
  const apiUrl = api_host_company + url

  if(method === 'get'){
      axios.get(apiUrl, {
        params: params
      })
      .then(function (response) {
        callback(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }else{
    axios.post(apiUrl, params)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}


export function getArticleList(url,method = "get",params,callback,charset="utf-8"){
  return httpRequest(url,method,params,charset,callback)
}

export function getWordList(url,method = "get",params,callback,charset="utf-8"){
  return httpRequest(url,method,params,charset,callback)
}

export function wordUpdate(url,method = "post",params,callback,charset="utf-8"){
  return httpRequest(url,method,params,charset,callback)
}

/**处理章节数据 */
export function handleChapter(url,method = "post",params,callback,charset="utf-8"){
  return httpRequest(url,method,params,charset,callback)
}

/**处理书籍数据 */
export function handleBook(url,method = "post",params,callback,charset="utf-8"){
  return httpRequest(url,method,params,charset,callback)
}

/**处理书籍数据 */
export function handleBookExport(url,method = "get",params,callback,charset="utf-8"){
  return httpRequest(url,method,params,charset,callback)
}

/**章节数据爬取 */
export function handleChapterSpider(url,method = "get",params,callback,charset="utf-8"){
  return httpRequest(url,method,params,charset,callback)
}

/**获取直播推流 */
export function getVideoList(params,callback,charset="utf-8"){
  return httpRequest('api/video/list','get',params,charset,callback)
}