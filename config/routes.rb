Rails.application.routes.draw do
  resources :games do 
    member do 
      get 'play'
      get 'debug'
      get 'query'
    end
  end
  
  devise_for :users
  get 'welcome/index'
  get 'welcome/rules'
  get 'welcome/help'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  
end
