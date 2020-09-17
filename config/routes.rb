Rails.application.routes.draw do
  get 'posts', to: 'posts#index'
  get 'posts/new', to: 'posts#new'
  post 'posts', to: 'posts#create'
end




# get:HTTPメゾット
# posts：URIパターン
# to:  に続く
# posts：コントローラー名
# index：アクション名