class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :name
      t.string :playposn
      t.string :homeposn
      t.string :startposn

      t.timestamps
    end
  end
end
