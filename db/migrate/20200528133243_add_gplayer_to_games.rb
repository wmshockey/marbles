class AddGplayerToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :gplayer, :string
  end
end
