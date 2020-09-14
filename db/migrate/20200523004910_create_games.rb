class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :name
      t.date :start_date
      t.string :status
      t.string :players
      t.string :turn
      t.text :comment
      t.text :board
      t.text :deck

      t.timestamps
    end
  end
end
