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
  get '/.well-known/acme-challenge/KsMFTs7WyL1Qp0fWMM6ngIPQw0P796gDPmUHecmBYqY' => "welcome#letsencrypt1"
  get '/.well-known/acme-challenge/UKlc744p08tlNn1lquxybh3fruOSue9T5qEN1eVY3Qo' => "welcome#letsencrypt2"
  get '/.well-known/acme-challenge/ZK5b5WgrDWKe_aKth25wXy1k_ebCR0PAqmYB0ARZ2H0' => "welcome#letsencrypt3"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  
end
