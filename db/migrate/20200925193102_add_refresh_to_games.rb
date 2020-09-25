class AddRefreshToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :refresh, :integer
  end
end
