class AddYrteamToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :gbteam, :string
  end
end
