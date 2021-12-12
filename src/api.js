
import axios from 'axios'

// const api_host_local = 'http://127.0.0.1/book_spider/public/'
// const api_host_company = 'http://192.168.6.98/book_spider/public/'
const api_host = 'http://23.105.214.24/blog/'



function httpRequest(url, method = 'get', params, charset, callback) {
  var apiUrl = ''
  if (url.indexOf('http') !== -1) {
    apiUrl = url
  } else {
    apiUrl = api_host + url
  }
  if (method === 'get') {
    axios.get(apiUrl, {
      params: params
    })
      .then(function (response) {
        callback(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axios.post(apiUrl, params)
      .then(function (response) {
        callback(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}


export function getArticleList(params, callback, charset = "utf-8") {
  return httpRequest('articles', 'get', params, charset, callback)
}

export function getArticleInfo($id, callback, charset = "utf-8") {
  return httpRequest('articles/' + $id, 'get', null, charset, callback)
}

export function getWordList(url, method = "get", params, callback, charset = "utf-8") {
  return httpRequest(url, method, params, charset, callback)
}

export function wordUpdate(url, method = "post", params, callback, charset = "utf-8") {
  return httpRequest(url, method, params, charset, callback)
}

/**处理章节数据 */
export function handleChapter(url, method = "post", params, callback, charset = "utf-8") {
  return httpRequest(url, method, params, charset, callback)
}

/**处理书籍数据 */
export function handleBook(url, method = "post", params, callback, charset = "utf-8") {
  return httpRequest(url, method, params, charset, callback)
}

/**处理书籍数据 */
export function handleBookExport(url, method = "get", params, callback, charset = "utf-8") {
  return httpRequest(url, method, params, charset, callback)
}

/**章节数据爬取 */
export function handleChapterSpider(url, method = "get", params, callback, charset = "utf-8") {
  return httpRequest(url, method, params, charset, callback)
}

/**获取直播推流 */
export function getVideoList(params, callback, charset = "utf-8") {
  return httpRequest('http://192.168.6.19/video/Video.php', 'get', params, charset, callback)
}


/**获取套图列表 */
export function getImgsList(url, method = "get", params, callback, charset = "utf-8") {
  return httpRequest(url, method, params, charset, callback)
}

/**获取套图详情 */
export function getImgsInfo(url, method = "get", params, callback, charset = "utf-8") {
  return httpRequest(url, method, params, charset, callback)
}


/**获取网站列表 */
export function getWebsiteList(url, method = "get", params, callback, charset = "utf-8") {
  return httpRequest(url, method, params, charset, callback)
}

/**获取书籍列表 */
export function getBookList(params, callback) {
  return httpRequest('admin/book/list', 'get', params, 'utf-8', callback)
}

export function getSpiderCommond(params, callback) {
  return httpRequest('admin/book/getSpiderCommond', 'get', params, 'utf-8', callback)
}