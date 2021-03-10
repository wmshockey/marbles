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
    render plain: "KsMFTs7WyL1Qp0fWMM6ngIPQw0P796gDPmUHecmBYqY.Q0_MeqZMHofUrqQw5JM1lIwytsur7x2iEgCzcPGJQ50"
  end
    
  def letsencrypt2
    render plain: "UKlc744p08tlNn1lquxybh3fruOSue9T5qEN1eVY3Qo.Q0_MeqZMHofUrqQw5JM1lIwytsur7x2iEgCzcPGJQ50"
  end
  
  def letsencrypt3
    render plain: "ZK5b5WgrDWKe_aKth25wXy1k_ebCR0PAqmYB0ARZ2H0.Q0_MeqZMHofUrqQw5JM1lIwytsur7x2iEgCzcPGJQ50"
  end
    
end
