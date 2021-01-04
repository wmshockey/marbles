class GameValidator < ActiveModel::Validator
  def validate(record)
    if record.name==""
      record.errors[:base] << 'A Game Name is required.'
    end
  	if record.ryteam!="" && (record.rplayer=="" || record.yplayer=="")
  		record.errors[:base] << 'Need two players to form a team, otherwise leave the team field blank.'
    end
  	if record.gbteam!="" && (record.gplayer=="" || record.bplayer=="")
  		record.errors[:base] << 'Need two players to form a team, otherwise leave the team field blank.'
  	end  
    if (record.yplayer=="" && record.rplayer=="" && record.gplayer=="" && record.bplayer=="")
      record.errors[:base] << 'Need to have at least one player to create a game.'    
    end
    @games = Game.all
    team_name_conflict = ""
    @games.each do |n|
      if (n.ryteam==record.ryteam)
        pnames = [n.rplayer, n.yplayer]
        if (!pnames.include?(record.rplayer) || !pnames.include?(record.yplayer) )
          team_name_conflict = record.ryteam
        end
      end
      if(n.gbteam==record.ryteam)
        pnames = [n.gplayer, n.bplayer]
        if (!pnames.include?(record.rplayer) || !pnames.include?(record.yplayer) )
          team_name_conflict = record.ryteam
        end
      end
    end
    if team_name_conflict != ""
      record.errors.add(:base, 'Team name ' + team_name_conflict + " is already taken.  Please choose a different team name.")
    end
    team_name_conflict = ""
    @games.each do |n|  
      if (n.ryteam==record.gbteam)
        pnames = [n.rplayer, n.yplayer]
        if (!pnames.include?(record.gplayer) || !pnames.include?(record.bplayer) )
          team_name_conflict = record.gbteam
        end 
      end
      if (n.gbteam==record.gbteam)
        pnames = [n.gplayer, n.bplayer]
        if (!pnames.include?(record.gplayer) || !pnames.include?(record.bplayer) )
          team_name_conflict = record.gbteam
        end
      end
    end
    if team_name_conflict != ""
      record.errors.add(:base, 'Team name ' + team_name_conflict + " is already taken.  Please choose a different team name.")
    end
  end
end

class Game < ApplicationRecord
  include ActiveModel::Validations
  validates :name, :presence => true
  validates_uniqueness_of :name, :message => ' - %{value} game name has already been taken'
  validates_with GameValidator

  def copy(game)
    game_copy = game.dup
    new_name = game.name + "-copy"
    game_copy.name = new_name
    game_copy.save
    return game_copy
  end  

end



