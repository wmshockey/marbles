class AddYellowhandToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :yellowhand, :text
  end
end
