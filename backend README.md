# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

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