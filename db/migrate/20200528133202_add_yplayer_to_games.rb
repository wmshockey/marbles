class AddYplayerToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :yplayer, :string
  end
end
