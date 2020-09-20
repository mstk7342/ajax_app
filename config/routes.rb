Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#checked'
  # pathパラメーターでメモidを取得できるように、ルーティング設定
end




# get:HTTPメゾット
# posts：URIパターン
# to:  に続く
# posts：コントローラー名
# index：アクション名