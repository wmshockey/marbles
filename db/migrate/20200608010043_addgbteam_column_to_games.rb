class AddgbteamColumnToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :ryteam, :string
  end
end
