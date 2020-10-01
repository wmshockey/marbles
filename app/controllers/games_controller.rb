class GamesController < ApplicationController
  before_action :set_game, only: [:show, :edit, :update, :debug, :play, :destroy]

  # GET /games
  # GET /games.json
  def index
    @user_name = current_user.name
    @user_email = current_user.email
    @games = Game.all
  end

  # GET /games/1
  # GET /games/1.json
  def show
    @user_name = current_user.name
    turn = @game.turn.to_i
    get_plist
    if (@plist.include?(@user_name))
      @player = @plist[turn]
    else
      respond_to do |format|
        format.html { redirect_to games_url, notice: '** You are not a player in this game. **' }
        format.json { head :no_content }
      end
    end
  end

  # GET /games/new
  def new
    @game = Game.new
    @users = User.all
  end

  # GET /games/1/play
  def play
    @user_name = current_user.name
    turn = @game.turn.to_i
    get_plist
    if (@plist.include?(@user_name))
      @player = @plist[turn]
    else
      respond_to do |format|
        format.html { redirect_to games_url, notice: '** You are not a player in this game. **' }
        format.json { head :no_content }
      end
    end
  end

  # GET /games/1/edit
  def edit
    @user_name = current_user.name
    turn = @game.turn.to_i
    get_plist
    if (@plist.include?(@user_name))
      @player = @plist[turn]
    else
      respond_to do |format|
        format.html { redirect_to games_url, notice: '** You are not a player in this game. **' }
        format.json { head :no_content }
      end
    end
  end

  # Get /game/1/debug
  def debug
    @user_name = current_user.name
    turn = @game.turn.to_i
    get_plist
    @player = @plist[turn]
  end  


  # POST /games
  # POST /games.json
  def create
    @game = Game.new(game_params)

    @game.start_date = DateTime.now.strftime('%Y-%m-%dT%H:%M')
    respond_to do |format|
      if @game.save
        format.html { redirect_to @game, notice: '** Game was successfully created. **' }
        format.json { render :show, status: :created, location: @game }
      else
        format.html { render :new }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /games/1
  # PATCH/PUT /games/1.json
  def update
    respond_to do |format|
      if @game.update(game_params)
        format.html { redirect_to @game, notice: '** Game was successfully updated. **' }
        format.json { render :show, status: :ok, location: @game }
      else
        format.html { render :edit }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1
  # DELETE /games/1.json
  def destroy    
    @user_name = current_user.name
    get_plist
    if (@plist.include?(@user_name))
      @game.destroy
      respond_to do |format|
        format.html { redirect_to games_url, notice: '** Game was successfully destroyed. **' }
        format.json { head :no_content }
      end
    else
      respond_to do |format|
        format.html { redirect_to games_url, notice: '** Cannot delete.  You are not a player in this game. **' }
        format.json { head :no_content }
      end
    end 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end
 
    def get_plist 
      @plist = []
      if (@game.yplayer!="")
        @plist.push(@game.yplayer)
      end
      if (@game.gplayer!="") 
        @plist.push(@game.gplayer)
      end
      if (@game.rplayer!="")
        @plist.push(@game.rplayer)
      end
      if (@game.bplayer!="")
        @plist.push(@game.bplayer)
      end
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:name, :start_date, :status, :yplayer, :gplayer, :rplayer, :bplayer, :ryteam, :gbteam, :turn, :comment, :board, :deck, :discardpile, :greenhand, :redhand, :bluehand, :yellowhand, :screen, :winner, :refresh, :moved)
    end
end
