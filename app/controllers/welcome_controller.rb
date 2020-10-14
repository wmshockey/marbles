class WelcomeController < ApplicationController
  def index
    @user_name = current_user.name;
    @users = User.all;
    @games = Game.all;
  end
  
  def show
  end
  
end
