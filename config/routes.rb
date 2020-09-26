Rails.application.routes.draw do
  resources :games do 
    member do 
      get 'modify'
    end
  end
  
  devise_for :users
  get 'welcome/index'
  get 'welcome/rules' 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  
end
