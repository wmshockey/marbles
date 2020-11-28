class AddFirstturnToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :firstturn, :string
  end
end
