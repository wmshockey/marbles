class AddGreenhandToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :greenhand, :text
  end
end
