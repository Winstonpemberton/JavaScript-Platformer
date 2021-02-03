Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    get '/test', to: 'application#test'
    
    root "session#new"

    resources :users, only: [:show, :new, :create, :edit, :update]

end
