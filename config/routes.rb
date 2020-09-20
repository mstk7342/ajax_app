Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
end




# get:HTTPメゾット
# posts：URIパターン
# to:  に続く
# posts：コントローラー名
# index：アクション名