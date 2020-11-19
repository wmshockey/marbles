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
  end
end

class Game < ApplicationRecord
  include ActiveModel::Validations
  validates :name, :presence => true
  validates_uniqueness_of :name, :message => ' - %{value} game name has already been taken'
  validates_with GameValidator
end

