class DropTablePlayer < ActiveRecord::Migration[5.2]
  def change
    drop_table :players
  end
end
