class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[rules help]
  
  def index
    @user_name = current_user.name;
    @users = User.all;
    @games = Game.all;
  end
  
  def show
  end
  
  def rules
  end
  
  def help
  end
  
end
