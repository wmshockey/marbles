Rails.application.routes.draw do
  resources :games do 
    member do 
      get 'play'
      get 'debug'
      get 'query'
      get 'query2'
      get 'copy'
    end
  end
  
  devise_for :users
  get 'welcome/index'
  get 'welcome/rules' => "welcome#rules"
  get 'welcome/help' => "welcome#help"
  get 'welcome/admin' => "welcome#admin"
  get '/.well-known/acme-challenge/oJ8NnQdu5K6hIriSh3vZXlwrJbdt78geYn2eoEp1QpA' => "welcome#letsencrypt1"
  get '/.well-known/acme-challenge/e8WMI9bNCYys_GMCuwiJh8rjjBvcWwN-9wA6BKfaehA' => "welcome#letsencrypt2"
  get '/.well-known/acme-challenge/lxzQ72EkbDCTM9VpU5LZ9VJCyRgaYroz0rItOfIeQ5o' => "welcome#letsencrypt3"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  
end
