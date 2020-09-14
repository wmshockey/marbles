json.extract! game, :id, :name, :start_date, :status, :turn, :comment, :board, :deck, :created_at, :updated_at
json.url game_url(game, format: :json)
