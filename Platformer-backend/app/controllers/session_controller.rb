class SessionController < ApplicationController

    def new
    end
    
    def create
        user = User.find_by(:name => params[:name])
        if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        redirect_to user_path(user)
        else
        render :new
        end
    end

    # logs the user out 
    def destroy
        if current_user
        session.delete :user_id
        redirect_to root_url
        end
    end
end