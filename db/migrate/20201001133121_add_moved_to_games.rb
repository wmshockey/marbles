class AddMovedToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :moved, :string
  end
end
