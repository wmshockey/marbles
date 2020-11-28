class AddMessageToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :message, :string
  end
end
