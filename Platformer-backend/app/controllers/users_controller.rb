class UsersController < ApplicationController
    before_action :require_login, except: [:new, :create]
  
    # loads the user signup page 
    def new
      @user = User.new

    end
  
    # creates a new user object 
    def create
      user = User.create(user_params)
      if user.valid?
        session[:user_id] = user.id
        render json: user
        # redirect_to user_path(user)
      else
        render :new
      end
    end

    private
    def user_params
      params.require(:user).permit(:name, :password)
    end
end