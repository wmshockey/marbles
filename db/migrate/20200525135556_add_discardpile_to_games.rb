class AddDiscardpileToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :discardpile, :text
  end
end
