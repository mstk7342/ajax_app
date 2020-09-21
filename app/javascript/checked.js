function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function(post){
    // 要素１つずつに対して、「クリック」した際に動作する処理を記述する。forEachの記述でそれぞれの要素への処理を記述する場所を作る。
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => { 
    // どのメモをクリックしたのか、カスタムデータを利用して取得している
    // addEventListenerメソッドで引数にclickの指定をする。
    // 「要素１つずつに対して、『クリック』した際に動作するイベントの駆動」の設定
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化する。XMLHttpRequestを使用できるための記述
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスタイプを指定する。XMLHttpRequestのリクエスト内容の指定するためのコード
      XHR.responseType = "json";
      // sendでリクエストを送信する。レスポンスの形式を指定するコード。
      XHR.send();
      // レスポンスを受け取った時の処理を記述する。リクエストを送信するためのコード。
      XHR.onload = () => {
        if (XHR.status != 200) {
          // エラーの設定。レスポンスのHTTPステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // ifはtrueとなり、アラートを表示する処理が行われる。XHR.statusTextによって、エラーが生じたオブジェクトに含まれるエラーメッセージが表示される。
          return null;
          // レスポンスされた変数itemに代入している。
          // return null;を定義しており、JavaScriptの処理から抜け出すことができる。
          // エラーが出た場合にそれ以降記述されている処理を行わないようにするのが目的。
        }
        const item = XHR.response.post;
        // XHR.responseでレスポンスされてきたJSONにアクセスできる
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
          // 既読であれば先ほどHTMLで定義した属性であるdata-check(index.html.erbの8行目)の属性値にtrueをセット。
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
          // 未読であれば、カスタムデータを削除する
        }
      };
    });
  });
}
// checkに関数を定義する。DOMの取得からエンドボンドへのリクエストなどは全てcheck関数へ記述することにする。
setInterval(check, 1000)
// window.addEventListener("load", check);
// window(ページ)をload(読み込み)した時に実行する。
