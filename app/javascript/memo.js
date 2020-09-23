function memo() {
  const submit = document.getElementById("submit");
  // index.html.erbのid:submitから「投稿する」情報取得する」コード
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    // XHLHttpRequestを定義する。非同期通信を実装するためのオブジェクトの作成
    XHR.open("POST", "/posts", true);
    // openでリクエストを初期化する。
    XHR.responseType = "json";
    // 返却するデータをJSONに指定する
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      // レスポンスとして返却されたメモのレコードデータを取得する
      const list = document.getElementById("list");
       // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得している。
      const formText = document.getElementById("content");
      // formTextの取得する理由としてメモの入力フォームをリセットするため。
      // 処理終了時に入力フォームの文字は入力されたままになってしまうため、リセットの必要がある。リセット対象の要素であるcontent要素を取得する。
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // 「メモとして描画する部分のHTML」を定義している。
      list.insertAdjacentHTML("afterend", HTML);
      // list要素に対して、insertAdjacentHTMLでHTMLを追加する。第一引数にafterendを指定することで、要素listに挿入可能。
      formText.value = "";
      // 「メモの入力フォームに入力フォームに入力されたままの文字」はリセットされる。空の文字列に上書きされる仕組み。
    };
    e.preventDefault();
    // 「投稿する」をクリックした時の、イベントを中止している。
  });
 }
 window.addEventListener("load", memo);