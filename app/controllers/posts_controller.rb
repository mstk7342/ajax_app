class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
    # 降順で表示する設定
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    # レスポンスの設定。メモ作成時に未読の情報を保存する
    render json:{ post: post }
    # レスポンスをJSONに変更
  end

  def checked
    # 「既読」の操作を行った時に実行されるアクション
    post = Post.find(params[:id])
    # routes.rbのURLパラメーターから、既読したメモのidが渡れるように設定するために、そのidを使用して該当するレコードの取得
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    # if文でpost.checkedという既読であるか否かを判定するプロパティを指定し、
    # 既読であれば「既読を解除するためにfalseへ変更」し、既読でなければ「既読にするためtrueへ変更」します。
    # updateはActiveRecordメソッドを使用して更新している。

    item = Post.find(params[:id])
    # 更新したレコードの取得し直しのコード
    render json: { post: item }
    # JSON形式（データ）として、checked.jsに返却している
  end
end
