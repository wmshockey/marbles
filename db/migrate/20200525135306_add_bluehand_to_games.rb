class AddBluehandToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :bluehand, :text
  end
end
