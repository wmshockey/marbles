class AddPlaysToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :plays, :integer
  end
end
