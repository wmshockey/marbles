class AddRedhandToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :redhand, :text
  end
end
