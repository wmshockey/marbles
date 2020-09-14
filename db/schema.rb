# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_08_010043) do

  create_table "games", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.date "start_date"
    t.string "status"
    t.string "players"
    t.string "turn"
    t.text "comment"
    t.text "board"
    t.text "deck"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "greenhand"
    t.text "redhand"
    t.text "bluehand"
    t.text "yellowhand"
    t.text "discardpile"
    t.string "yplayer"
    t.string "rplayer"
    t.string "gplayer"
    t.string "bplayer"
    t.string "gbteam"
    t.string "ryteam"
  end

  create_table "players", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.string "handle"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
