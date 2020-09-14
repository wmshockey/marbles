class AddBplayerToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :bplayer, :string
  end
end
