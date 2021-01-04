class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[rules help letsencrypt1 letsencrypt2 letsencrypt3]
  
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
  
  # For administrator only
  # GET /admin
  def admin
    @users = User.all;
    @user_name = current_user.name
    @user_id = current_user.id
    @recs = Game.all.order(created_at: :desc)
    @pagy, @records = pagy( @recs.order(created_at: :desc) )
  end
  
  def letsencrypt1
    render plain: "oJ8NnQdu5K6hIriSh3vZXlwrJbdt78geYn2eoEp1QpA.Q0_MeqZMHofUrqQw5JM1lIwytsur7x2iEgCzcPGJQ50"
  end
    
  def letsencrypt2
    render plain: "e8WMI9bNCYys_GMCuwiJh8rjjBvcWwN-9wA6BKfaehA.Q0_MeqZMHofUrqQw5JM1lIwytsur7x2iEgCzcPGJQ50"
  end
  
  def letsencrypt3
    render plain: "lxzQ72EkbDCTM9VpU5LZ9VJCyRgaYroz0rItOfIeQ5o.Q0_MeqZMHofUrqQw5JM1lIwytsur7x2iEgCzcPGJQ50"
  end
    
end
