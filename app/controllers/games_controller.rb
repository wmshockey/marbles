class GamesController < ApplicationController
  before_action :set_game, only: [:show, :edit, :update, :debug, :play, :query, :query2, :destroy, :copy]
  before_action :get_teams, only: [:new, :create, :edit, :update, :debug, :play]
  
  # GET /games
  # GET /games.json
  def index
    @user_name = current_user.name
    @user_id = current_user.id
    @recs = Game.all.where("yplayer='#{@user_name}' or rplayer='#{@user_name}' or gplayer='#{@user_name}' or bplayer='#{@user_name}'").order(created_at: :desc)
    @pagy, @records = pagy( @recs.order(created_at: :desc) )
  end

  # GET /games/1
  # GET /games/1.json
  def show
  end

  # GET /games/1/query
  # GET /games/1.json
  def query
    render json: @game
  end

  # GET /games/1/query2
  # GET /games/1.json  
  def query2
    render json: @game
  end

  # GET /games/new
  def new
    @game = Game.new
    @users = User.all
    @user_name = current_user.name
    @user_id = current_user.id
    @games = Game.all.where("yplayer='#{@user_name}' or rplayer='#{@user_name}' or gplayer='#{@user_name}' or bplayer='#{@user_name}'")
  end

  # GET /games/1/play
  def play
    @users = User.all
  end

  # GET /games/1/edit
  def edit
    @users = User.all
  end

  # Get /game/1/debug
  def debug
    @users = User.all
  end  

  # GET /games/1/copy
  def copy
    @game = Game.find(params[:id])
    respond_to do |format|
      game_copy = @game.copy(@game)
      if game_copy
        format.html { redirect_to welcome_admin_url, notice: "Game #{@game.name} was successfully copied to: #{game_copy.name}." }
        format.json { head :no_content }
      else
        flash[:error] = "Game copy failed."
        format.html { render :show, notice: 'Game copy failed.' }
        format.json { render json: game_copy.errors, status: :unprocessable_entity }
      end
    end
  end


  # POST /games
  # POST /games.json
  def create
    @users = User.all
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
        if params[:commit]=="End Turn"
          format.html { redirect_to @game }
        else
          format.html { redirect_to games_url, notice: '** Game was successfully updated. **'}
        end
      else
        format.html { render :edit }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1
  # DELETE /games/1.json
  def destroy    
      @game.destroy
      respond_to do |format|
        format.html { redirect_to games_url, notice: '** Game was successfully destroyed. **' }
        format.json { head :no_content }
      end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @users = User.all
      @game = Game.find(params[:id])
      @user_name = current_user.name
      @user_email = current_user.email
      turn = @game.turn.to_i
      get_plist
      if (@plist.include?(@user_name) || @user_email == "wmshockey@gmail.com")
        @player = @plist[turn]
      else
        respond_to do |format|
          format.html { redirect_to games_url, alert: '** You are not a player in this game. **' }
          format.json { head :no_content }
        end
      end
    end

    def get_teams
      @games = Game.all
    	ryteams = @games.map {|g| g.ryteam+": ("+g.yplayer+","+g.rplayer+")"}.uniq
    	gbteams = @games.map {|g| g.gbteam+": ("+g.gplayer+","+g.bplayer+")"}.uniq
    	@teams = ryteams.concat(gbteams).uniq.sort!
      @teams = @teams.select {|t| t[0]!=":"}
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
      params.require(:game).permit(:name, :id, :start_date, :status, :yplayer, :gplayer, :rplayer, :bplayer, :ryteam, :gbteam, :turn, :comment, :board, :deck, :discardpile, :greenhand, :redhand, :bluehand, :yellowhand, :screen, :winner, :refresh, :moved, :plays, :updated_at, :firstturn, :message)
    end
end
