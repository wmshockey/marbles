class AddRplayerToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :rplayer, :string
  end
end
